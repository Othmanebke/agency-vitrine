// Vercel serverless function to send contact emails via SendGrid
// Expects environment variables: SENDGRID_API_KEY, SENDGRID_TO, SENDGRID_FROM (optional)

const sgMail = require('@sendgrid/mail')

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { name, email, phone, subject, message } = req.body || {}

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Missing fields' })
  }

  const apiKey = process.env.SENDGRID_API_KEY
  const to = process.env.SENDGRID_TO || 'othmane.bouakline.pro@gmail.com'
  const from = process.env.SENDGRID_FROM || to
  const siteUrl = process.env.SITE_URL || 'https://wexor.vercel.app'

  if (!apiKey) {
    console.error('SendGrid not configured. Missing SENDGRID_API_KEY')
    return res.status(500).json({ message: 'Email provider not configured' })
  }

  sgMail.setApiKey(apiKey)

  const ownerMsg = {
    to,
    from,
    replyTo: email,
    subject: `Nouveau message: ${subject || 'Demande de contact'} (${name})`,
    html: `
      <p><strong>Nom:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Téléphone:</strong> ${escapeHtml(phone || 'Non renseigné')}</p>
      <p><strong>Type de projet:</strong> ${escapeHtml(subject || 'Non renseigné')}</p>
      <p><strong>Message:</strong></p>
      <div>${escapeHtml(message).replace(/\n/g, '<br/>')}</div>
    `,
    text: `Nom: ${name}\nEmail: ${email}\nTelephone: ${phone || 'Non renseigne'}\nType de projet: ${subject || 'Non renseigne'}\n\nMessage:\n${message}`
  }

  const customerMsg = {
    to: email,
    from,
    replyTo: to,
    subject: 'Wexor - Bien recu, merci pour votre message',
    html: `
      <div style="margin:0;padding:0;background:#050510;font-family:Arial,Helvetica,sans-serif;color:#e5e7eb;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:24px 12px;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#0b0b1a;border:1px solid rgba(255,255,255,0.10);border-radius:16px;overflow:hidden;">
                <tr>
                  <td style="padding:28px 28px 18px 28px;background:linear-gradient(90deg,#6d28d9,#ec4899);">
                    <div style="font-size:28px;line-height:1;font-weight:800;color:#fff;">W.</div>
                    <div style="margin-top:8px;font-size:14px;color:#f5f3ff;letter-spacing:0.08em;text-transform:uppercase;">Wexor - Agence digitale</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:26px 28px 8px 28px;">
                    <h1 style="margin:0 0 12px 0;font-size:24px;line-height:1.25;color:#fff;">Bonjour ${escapeHtml(name)},</h1>
                    <p style="margin:0 0 14px 0;font-size:15px;line-height:1.7;color:#d4d4d8;">Merci pour votre message. Votre demande a bien ete recue et je reviens vers vous sous 48h maximum.</p>
                    <p style="margin:0 0 18px 0;font-size:15px;line-height:1.7;color:#d4d4d8;">Type de projet indique: <strong style="color:#fff;">${escapeHtml(subject || 'Demande de contact')}</strong></p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 28px 16px 28px;">
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="border-radius:999px;background:linear-gradient(90deg,#6d28d9,#ec4899);padding:12px 18px;">
                          <a href="${siteUrl}" style="color:#fff;text-decoration:none;font-size:14px;font-weight:700;">Voir le site Wexor</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 28px 24px 28px;">
                    <div style="border-top:1px solid rgba(255,255,255,0.12);padding-top:16px;font-size:13px;line-height:1.7;color:#a1a1aa;">
                      <div>Email: <a href="mailto:${to}" style="color:#c4b5fd;text-decoration:none;">${to}</a></div>
                      <div>Tel: <a href="tel:+33660805337" style="color:#c4b5fd;text-decoration:none;">06 60 80 53 37</a></div>
                      <div>Site officiel: <a href="${siteUrl}" style="color:#c4b5fd;text-decoration:none;">${siteUrl}</a></div>
                      <div style="margin-top:8px;">Cet email est envoye suite a votre demande sur le formulaire officiel Wexor.</div>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    `,
    text: `Bonjour ${name},\n\nMerci pour votre message. Votre demande a bien ete recue et je reviens vers vous sous 48h maximum.\n\nType de projet: ${subject || 'Demande de contact'}\n\nSite officiel: ${siteUrl}\nEmail: ${to}\nTel: 06 60 80 53 37\n\nWexor`
  }

  try {
    await sgMail.send(ownerMsg)
    await sgMail.send(customerMsg)
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('SendGrid error:', err)
    return res.status(500).json({ message: 'Error sending email' })
  }
}
