/// <reference types="node" />

type ContactRequest = {
  fullName?: string
  email?: string
  phone?: string
  company?: string
  projectType?: string
  budget?: string
  description?: string
  timeline?: string
  source?: string
}

type VercelRequest = {
  method?: string
  body?: ContactRequest
}

type VercelResponse = {
  status: (code: number) => VercelResponse
  json: (body: Record<string, string>) => void
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed.' })
  }

  const form = request.body ?? {}
  const fullName = form.fullName?.trim() ?? ''
  const email = form.email?.trim() ?? ''
  const company = form.company?.trim() ?? ''
  const description = form.description?.trim() ?? ''

  if (!fullName || !emailPattern.test(email) || !company || !description) {
    return response.status(400).json({ error: 'Please complete all required fields.' })
  }

  const apiKey = process.env.RESEND_API_KEY
  const recipient = process.env.CONTACT_EMAIL
  const sender = process.env.CONTACT_FROM_EMAIL ?? 'onboarding@resend.dev'

  if (!apiKey || !recipient) {
    return response.status(500).json({ error: 'Email service is not configured.' })
  }

  const message = [
    `Name: ${fullName}`,
    `Email: ${email}`,
    `Phone: ${form.phone?.trim() || 'Not provided'}`,
    `Company: ${company}`,
    `Project type: ${form.projectType || 'Not provided'}`,
    `Budget: ${form.budget || 'Not provided'}`,
    `Timeline: ${form.timeline || 'Not provided'}`,
    `Source: ${form.source || 'Not provided'}`,
    '',
    'Project description:',
    description,
  ].join('\n')

  try {
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `CodeMind website <${sender}>`,
        to: [recipient],
        reply_to: email,
        subject: `New project inquiry from ${fullName}`,
        text: message,
      }),
    })

    if (!resendResponse.ok) {
      return response.status(502).json({ error: 'The email service could not accept the message.' })
    }

    return response.status(200).json({ message: 'Your inquiry has been sent.' })
  } catch {
    return response.status(502).json({ error: 'Unable to send your inquiry right now.' })
  }
}