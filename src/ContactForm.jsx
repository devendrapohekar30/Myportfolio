import { useEffect, useRef, useState } from 'react'

const initialForm = { name: '', email: '', company: '', message: '' }
const contactEndpoint = import.meta.env.VITE_GOOGLE_SHEETS_WEB_APP_URL

export function ContactForm() {
  const [formData, setFormData] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const dismissTimer = useRef(null)
  const handleChange = ({ target: { name, value } }) => setFormData((current) => ({ ...current, [name]: value }))
  const dismissSuccess = () => {
    window.clearTimeout(dismissTimer.current)
    setSubmitted(false)
  }

  useEffect(() => () => window.clearTimeout(dismissTimer.current), [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return setError('Please complete your name, email, and project details.')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return setError('Please enter a valid email address.')
    if (!contactEndpoint) return setError('Contact form is not configured yet. Please email me directly instead.')

    setLoading(true); setError(''); setSubmitted(false)
    try {
      await fetch(contactEndpoint, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ ...formData, email: formData.email.trim().toLowerCase(), company: formData.company.trim() || 'N/A' }),
      })
      setSubmitted(true); setFormData(initialForm)
      dismissTimer.current = window.setTimeout(() => setSubmitted(false), 6000)
    } catch { setError('Something went wrong. Please email me directly instead.') } finally { setLoading(false) }
  }

  return <>
  <form className="contact-form" onSubmit={handleSubmit}>
    <div className="contact-form-heading"><span>Drop a line</span><p>Tell me about the system you want to build.</p></div>
    {submitted && <div className="form-status success">Thanks — your message has been sent.</div>}
    {error && <div className="form-status error">{error}</div>}
    <div className="form-row">
      <div className="form-group"><label htmlFor="name">Your name</label><input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Jane Smith" required /></div>
      <div className="form-group"><label htmlFor="email">Email address</label><input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="jane@company.com" required /></div>
    </div>
    <div className="form-group"><label htmlFor="company">Company <span>(optional)</span></label><input id="company" name="company" value={formData.company} onChange={handleChange} placeholder="Your company" /></div>
    <div className="form-group"><label htmlFor="message">Project details</label><textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="What are you looking to build?" rows="5" required /></div>
    <div className="form-action"><button type="submit" className="form-submit" disabled={loading}>{loading ? 'Sending…' : 'Send inquiry'}</button><span>Usually replies within 1–2 business days.</span></div>
  </form>
  {submitted && <aside className="lead-toast" role="status" aria-live="polite">
    <div className="lead-toast-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m5 12 4.2 4.2L19.5 6" /></svg></div>
    <div><span>MESSAGE RECEIVED</span><strong>Thanks — I’ll be in touch soon.</strong><p>Your project details are safely on their way.</p></div>
    <button type="button" onClick={dismissSuccess} aria-label="Dismiss confirmation">×</button>
  </aside>}
  </>
}
