import { useRef, useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  ArrowUpRight,
  CheckCircle2,
  LockKeyhole,
  UserRound,
  MessageCircle,
} from "lucide-react";
import deco13 from "@/assets/deco/deco-13.webp";
import { Deco } from "./shared";
import { Button } from "@/components/ui/button";
import { submitConsultation } from "@/lib/consultation.functions";
import { getAttribution, track } from "@/lib/marketing";
import { useScrollReveal } from "@/lib/reveal";
import type { Copy } from "@/content/types";
export function Booking({ c, onLegal }: { c: Copy; onLegal: () => void }) {
  const submit = useServerFn(submitConsultation);
  const root = useRef<HTMLElement>(null);
  useScrollReveal(root, ".booking-copy > *", { y: 36, tilt: false, stagger: 0.08 });
  useScrollReveal(root, ".booking-form", { y: 56, tilt: false });
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [started, setStarted] = useState(false);
  async function send(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);
    const treatments = fd.getAll("treatment").map(String);
    if (treatments.length === 0) {
      setError(c.booking.treatmentError);
      return;
    }
    setBusy(true);
    try {
      await submit({
        data: {
          first_name: String(fd.get("first_name")),
          phone: String(fd.get("dial")) + String(fd.get("phone")),
          treatment: treatments.join(", "),
          preferred_month: String(fd.get("month")),
          language: c.language,
          consent: true,
          attribution: getAttribution(),
          website: String(fd.get("website") ?? ""),
        },
      });
      setSuccess(true);
      track("form_submit", { section: "reserver", lang: c.language });
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${window.location.search}#merci`,
      );
    } catch {
      setError(c.booking.error);
    } finally {
      setBusy(false);
    }
  }
  return (
    <section
      ref={root}
      id="reserver"
      aria-labelledby="booking-title"
      className="booking-section section-pad deco-host"
    >
      <Deco src={deco13} name="arch" w={1600} h={1104} />
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
          {success ? (
            <div className="form-success" role="status">
              <CheckCircle2 />
              <h3>{c.booking.success}</h3>
              <p>{c.booking.successDetail}</p>
              <Button asChild variant="brand">
                <a
                  href={`https://wa.me/212668686800?text=${encodeURIComponent(c.language === "fr" ? "Bonjour Medical Bay, je viens d’envoyer ma demande." : "Hello Medical Bay, I just sent my request.")}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle />
                  {c.whatsapp}
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
                      <select
                        name="dial"
                        aria-label={c.language === "fr" ? "Indicatif pays" : "Country dial code"}
                        defaultValue={c.language === "fr" ? "+33" : "+44"}
                      >
                        <option value="+33">FR +33</option>
                        <option value="+44">UK +44</option>
                        <option value="+212">MA +212</option>
                        <option value="+32">BE +32</option>
                        <option value="+41">CH +41</option>
                        <option value="+1">US +1</option>
                        <option value="+49">DE +49</option>
                        <option value="+34">ES +34</option>
                      </select>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel-national"
                        required
                        pattern="[0-9 \(\)\-]{7,18}"
                        placeholder="6 12 34 56 78"
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
                      type="date"
                      id="month"
                      name="month"
                      min={new Date().toISOString().slice(0, 10)}
                      suppressHydrationWarning
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
                <Button type="submit" variant="brand" disabled={busy}>
                  {busy ? c.booking.submitting : c.booking.submit}
                  <ArrowUpRight />
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
