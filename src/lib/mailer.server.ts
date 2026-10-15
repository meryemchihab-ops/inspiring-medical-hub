import nodemailer from 'nodemailer';

type Consultation = {
  id: string;
  first_name: string;
  phone: string;
  message: string;
  treatment: string;
  preferred_month: string;
  language: 'fr' | 'en';
};

const escape = (v: string) =>
  v.replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]!);

// Notifies the coordination team of a new request over SMTP. Only the team inbox receives it.
export async function notifyNewConsultation(c: Consultation) {
  const host = process.env['SMTP_HOST'];
  const user = process.env['SMTP_USER'];
  const pass = process.env['SMTP_PASS'];
  const to = process.env['CONSULTATION_NOTIFY_TO'];
  if (!host || !user || !pass || !to) {
    console.warn('Consultation email skipped: SMTP is not configured');
    return;
  }
  const port = Number(process.env['SMTP_PORT'] ?? 465);
  const transport = nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } });
  const rows: [string, string][] = [
    ['Prénom', c.first_name],
    ['WhatsApp', c.phone],
    ['Soins', c.treatment],
    ['Disponible pour un appel', c.preferred_month ? c.preferred_month.replace('T', ' à ') : '—'],
    ['Message', c.message || '—'],
    ['Langue', c.language.toUpperCase()],
    ['Référence', c.id],
  ];
  await transport.sendMail({
    from: process.env['SMTP_FROM'] ?? `Medical Bay <${user}>`,
    to,
    subject: `Nouvelle demande de devis : ${c.first_name}`,
    text: rows.map(([k, v]) => `${k} : ${v}`).join('\n'),
    html: `<table cellpadding="6" style="font-family:sans-serif;font-size:14px">${rows
      .map(([k, v]) => `<tr><td style="color:#555">${k}</td><td><strong>${escape(v)}</strong></td></tr>`)
      .join('')}</table>`,
  });
}
