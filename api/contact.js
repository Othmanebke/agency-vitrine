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

  if (!apiKey) {
    console.error('SendGrid not configured. Missing SENDGRID_API_KEY')
    return res.status(500).json({ message: 'Email provider not configured' })
  }

  sgMail.setApiKey(apiKey)

  const msg = {
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
    `
  }

  try {
    await sgMail.send(msg)
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('SendGrid error:', err)
    return res.status(500).json({ message: 'Error sending email' })
  }
}
