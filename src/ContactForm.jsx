import { useState } from 'react'

const initialForm = { name: '', email: '', company: '', message: '' }

export function ContactForm() {
  const [formData, setFormData] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const handleChange = ({ target: { name, value } }) => setFormData((current) => ({ ...current, [name]: value }))

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return setError('Please complete your name, email, and project details.')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return setError('Please enter a valid email address.')
    setLoading(true); setError('')
    try {
      await fetch('https://script.google.com/macros/s/AKfycbyYlgTmytx2YtdwhQAdcM3UYjVNX2TV_jb_AZdkZu5i0fDi0e4mO0pC_BpsPSIkx028bQ/exec', { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...formData, company: formData.company || 'N/A', timestamp: new Date().toISOString() }) })
      setSubmitted(true); setFormData(initialForm); setTimeout(() => setSubmitted(false), 5000)
    } catch { setError('Something went wrong. Please email me directly instead.') } finally { setLoading(false) }
  }

  return <form className="contact-form" onSubmit={handleSubmit}>
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
}
