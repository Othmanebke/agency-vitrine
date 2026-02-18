// Vercel serverless function to send contact emails via SendGrid
// Expects environment variables: SENDGRID_API_KEY, SENDGRID_TO, SENDGRID_FROM (optional)

const sgMail = require('@sendgrid/mail')

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { name, email, message } = req.body || {}

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Missing fields' })
  }

  const apiKey = process.env.SENDGRID_API_KEY
  const to = process.env.SENDGRID_TO
  const from = process.env.SENDGRID_FROM || `no-reply@${process.env.VERCEL_URL || 'example.com'}`

  if (!apiKey || !to) {
    console.error('SendGrid not configured. Missing SENDGRID_API_KEY or SENDGRID_TO')
    return res.status(500).json({ message: 'Email provider not configured' })
  }

  sgMail.setApiKey(apiKey)

  const msg = {
    to,
    from,
    subject: `Nouveau message de ${name} via le site`,
    html: `
      <p><strong>Nom:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <div>${message.replace(/\n/g, '<br/>')}</div>
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
