import { useRef, useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowUpRight, CheckCircle2, LockKeyhole, UserRound } from "lucide-react";
import logoMark from "@/assets/logo-mark.png";
import noPaymentBadge from "@/assets/badge-devis-gratuit.webp";
import { Deco, WHATSAPP, WhatsAppIcon } from "./shared";
import { Button } from "@/components/ui/button";
import { DialCodePicker } from "@/components/dial-code-picker";
import { PHONE_FORMAT } from "@/lib/countries";
import { submitConsultation } from "@/lib/consultation.functions";
import { getAttribution, track } from "@/lib/marketing";
import { useScrollReveal } from "@/lib/reveal";
import { gsap, useGSAP } from "@/lib/gsap";
import type { Copy } from "@/content/types";
export function Booking({ c, onLegal }: { c: Copy; onLegal: () => void }) {
  const submit = useServerFn(submitConsultation);
  const root = useRef<HTMLElement>(null);
  useScrollReveal(root, ".booking-copy > *", { y: 36, tilt: false, stagger: 0.08 });
  useScrollReveal(root, ".booking-form", { y: 56, tilt: false });
  // The "no payment" stamp drops onto the form once it is in view, then sways gently.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const badge = ".form-badge";
        if (!document.querySelector(badge)) return;
        gsap.set(badge, { autoAlpha: 0, scale: 1.8, rotation: -40 });
        gsap
          .timeline({ scrollTrigger: { trigger: ".booking-form", start: "top 70%", once: true } })
          .to(
            badge,
            { autoAlpha: 1, scale: 1, rotation: 8, duration: 0.7, ease: "back.out(1.8)" },
            0.5,
          )
          .to(badge, { scale: 0.92, duration: 0.08, yoyo: true, repeat: 1, ease: "power1.inOut" })
          .to(badge, {
            rotation: -2,
            y: -6,
            duration: 2.6,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
      });
      return () => mm.revert();
    },
    { scope: root },
  );
  const defaultIso = c.language === "fr" ? "FR" : "GB";
  const [dialIso, setDialIso] = useState(defaultIso);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [started, setStarted] = useState(false);
  const [waLink, setWaLink] = useState(WHATSAPP);
  function send(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);
    const treatments = fd.getAll("treatment").map(String);
    if (treatments.length === 0) {
      setError(c.booking.treatmentError);
      return;
    }
    const firstName = String(fd.get("first_name")).trim();
    // "06 12 34 56 78" with +33 becomes "+33612345678", the international form WhatsApp expects.
    const phone =
      String(fd.get("dial")) + String(fd.get("phone")).replace(/\D/g, "").replace(/^0+/, "");
    const month = String(fd.get("month"));
    const message = String(fd.get("message") ?? "").trim();
    const L = c.booking.waLabels;
    const sep = c.language === "fr" ? " : " : ": ";
    const date = month
      ? new Date(month).toLocaleString(c.language === "fr" ? "fr-FR" : "en-GB", {
          weekday: "long",
          day: "numeric",
          month: "long",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "";
    const text = [
      c.booking.waIntro,
      "",
      `${L.name}${sep}${firstName}`,
      `${L.phone}${sep}${phone}`,
      `${L.treatments}${sep}${treatments.join(", ")}`,
      ...(date ? [`${L.date}${sep}${date}`] : []),
      ...(message ? [`${L.message}${sep}${message}`] : []),
    ].join("\n");
    const link = `${WHATSAPP}?text=${encodeURIComponent(text)}`;
    // Opened inside the submit handler itself so browsers treat it as user-initiated and do not block it.
    window.open(link, "_blank", "noopener");
    setWaLink(link);
    setSuccess(true);
    track("form_submit", { section: "reserver", lang: c.language });
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${window.location.search}#merci`,
    );
    // Backup copy for the team (stored and emailed) in case the visitor never presses Send in WhatsApp.
    submit({
      data: {
        first_name: firstName,
        phone,
        message,
        treatment: treatments.join(", "),
        preferred_month: month,
        language: c.language,
        consent: true,
        attribution: getAttribution(),
        website: String(fd.get("website") ?? ""),
      },
    }).catch((err: unknown) => console.error("Consultation backup failed", err));
  }
  return (
    <section
      ref={root}
      id="reserver"
      aria-labelledby="booking-title"
      className="booking-section section-pad deco-host"
    >
      <Deco src={logoMark} name="mark" w={320} h={165} />
      <div className="container-wide booking-layout">
        <div className="booking-copy">
          <span className="eyebrow">{c.booking.label}</span>
          <h2 id="booking-title" className="section-heading">
            {c.booking.title}
            <br />
            <span className="serif">{c.booking.accent}</span>
          </h2>
          <p>{c.booking.intro}</p>
          <div className="coordinator-line">
            <UserRound />
            <div>
              {c.booking.coordinator}
              <div className="mt-2 flex items-center gap-2 text-[13px] text-teal-deep">
                <span className="live-dot" />
                {c.hero.response}
              </div>
            </div>
          </div>
          <ol>
            {c.booking.next.map((s, i) => (
              <li key={s}>
                <span>0{i + 1}</span>
                {s}
              </li>
            ))}
          </ol>
          <a
            href="tel:+212668686800"
            onClick={() => track("phone_click")}
            className="text-link mt-6"
          >
            +212 668 68 68 00 <ArrowUpRight size={15} />
          </a>
        </div>
        <div className="booking-form">
          {/* The stamp's lettering is French, so the English page relies on the footnote instead. */}
          {c.language === "fr" && (
            <img
              src={noPaymentBadge}
              alt=""
              aria-hidden="true"
              width={180}
              height={180}
              loading="lazy"
              className="form-badge"
            />
          )}
          {success ? (
            <div className="form-success" role="status">
              <CheckCircle2 />
              <h3>{c.booking.success}</h3>
              <p>{c.booking.successDetail}</p>
              <Button asChild variant="brand">
                <a href={waLink} target="_blank" rel="noreferrer">
                  <WhatsAppIcon />
                  {c.booking.waSend}
                </a>
              </Button>
            </div>
          ) : (
            <>
              <h3>{c.booking.formTitle}</h3>
              <p>{c.booking.formIntro}</p>
              <form
                onSubmit={send}
                onFocus={() => {
                  if (!started) {
                    setStarted(true);
                    track("form_start", { lang: c.language });
                  }
                }}
              >
                <div className="form-grid">
                  <div className="form-field">
                    <label htmlFor="first_name">{c.booking.name}</label>
                    <input
                      id="first_name"
                      name="first_name"
                      autoComplete="given-name"
                      required
                      minLength={2}
                      maxLength={80}
                      placeholder={c.language === "fr" ? "Votre prénom" : "First name"}
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="phone">{c.booking.phone}</label>
                    <div className="phone-input">
                      <DialCodePicker
                        name="dial"
                        language={c.language}
                        defaultIso={defaultIso}
                        labels={c.booking.dialPicker}
                        onSelect={setDialIso}
                      />
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel-national"
                        required
                        pattern="[0-9 \(\)\-]{7,18}"
                        placeholder={PHONE_FORMAT[dialIso] ?? "612 345 678"}
                      />
                    </div>
                  </div>
                  <fieldset className="form-field full">
                    <legend>
                      {c.booking.treatment} <small>{c.booking.select}</small>
                    </legend>
                    <div className="treatment-options">
                      {c.treatments.items.map((t) => (
                        <label key={t.name} className="treatment-option">
                          <input type="checkbox" name="treatment" value={t.name} />
                          <span>{t.name}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <div className="form-field full">
                    <label htmlFor="month">{c.booking.month}</label>
                    <input
                      type="datetime-local"
                      id="month"
                      name="month"
                      aria-describedby="month-hint"
                      min={`${new Date().toISOString().slice(0, 10)}T00:00`}
                      suppressHydrationWarning
                    />
                    <small id="month-hint" className="form-hint">
                      {c.booking.callHint}
                    </small>
                  </div>
                  <div className="form-field full">
                    <label htmlFor="message">
                      {c.booking.message} <small>({c.booking.optional})</small>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      maxLength={1000}
                      placeholder={c.booking.messagePlaceholder}
                    />
                  </div>
                </div>
                <div className="hidden" aria-hidden="true">
                  <label>
                    Website
                    <input name="website" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>
                <label className="consent-label">
                  <input type="checkbox" required name="consent" />
                  <span>
                    {c.booking.consent}{" "}
                    <Button
                      type="button"
                      variant="link"
                      onClick={onLegal}
                      className="h-auto p-0 text-[13px]"
                    >
                      {c.footer.legal[1]}
                    </Button>
                  </span>
                </label>
                {error && (
                  <p className="form-error" role="alert">
                    {error}
                  </p>
                )}
                <Button type="submit" variant="brand">
                  <WhatsAppIcon />
                  {c.booking.submit}
                </Button>
                <div className="form-footnote">
                  <LockKeyhole />
                  {c.booking.secure}
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
