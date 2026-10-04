import { useState } from 'react'

export function ContactForm() {
  const [formData, setFormData] = useState({
    source: 'freelancing',
    name: '',
    email: '',
    company: '',
    priority: 'medium',
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Name is required')
      return false
    }
    if (!formData.email.trim()) {
      setError('Email is required')
      return false
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email')
      return false
    }
    setError('')
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)
    
    try {
      // Replace with your Google Apps Script URL
      const scriptUrl = 'https://script.google.com/macros/d/YOUR_DEPLOYMENT_ID/usercallable'
      
      const response = await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source: formData.source,
          name: formData.name,
          email: formData.email,
          company: formData.company || 'N/A',
          priority: formData.priority,
          timestamp: new Date().toISOString(),
        })
      })

      setSubmitted(true)
      setFormData({
        source: 'freelancing',
        name: '',
        email: '',
        company: '',
        priority: 'medium',
      })
      
      setTimeout(() => setSubmitted(false), 4000)
    } catch (err) {
      setError('Failed to submit form. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="contact-form-wrapper">
      <form className="contact-form" onSubmit={handleSubmit}>
        {submitted && (
          <div className="form-success">
            ✓ Message received! I'll get back to you soon.
          </div>
        )}

        {error && (
          <div className="form-error">
            {error}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="source">How did you find me?</label>
          <select
            id="source"
            name="source"
            value={formData.source}
            onChange={handleChange}
            required
          >
            <option value="freelancing">Freelancing Opportunity</option>
            <option value="employee">Employment Opportunity</option>
            <option value="collaboration">Collaboration / Partnership</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="company">Company <span className="optional">(Optional)</span></label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Your Company"
            />
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="form-submit"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  )
}
