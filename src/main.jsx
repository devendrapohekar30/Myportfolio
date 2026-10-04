import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import './reference.css'
import { ContactForm } from './ContactForm'

const projects = [
  {
    number: '01',
    title: 'Service Mesh',
    type: 'Go / Microservices',
    year: '2023–now',
    description: 'Independently deployable Auth, Notifications, and Payments services over REST and gRPC, each owning its PostgreSQL schema.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=90',
    color: 'coral',
  },
  {
    number: '02',
    title: 'Eventline',
    type: 'AWS / Event-driven',
    year: '2024',
    description: 'Lambda and SQS background processing with dead-letter queues, CloudWatch alarms, and asynchronous messaging for lower infrastructure overhead.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=90',
    color: 'yellow',
  },
  {
    number: '03',
    title: 'PeopleOps',
    type: 'REST / HR platform',
    year: '2023',
    description: 'HR workflow APIs for onboarding, attendance, payroll, and contracts with RBAC, audit logging, MySQL optimization, and S3 documents.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=90',
    color: 'blue',
  },
]

function Arrow({ diagonal = false }) {
  return <span aria-hidden="true" className={diagonal ? 'arrow arrow-diagonal' : 'arrow'}>↗</span>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)

  useEffect(() => {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          revealObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })

    document.querySelectorAll('.section-label, .project-row, .about-grid, .about-facts, .contact-content, .stat-card').forEach((element) => revealObserver.observe(element))
    return () => revealObserver.disconnect()
  }, [])

  useEffect(() => {
    const closeOnEscape = (event) => event.key === 'Escape' && setSelectedProject(null)
    document.addEventListener('keydown', closeOnEscape)
    document.body.style.overflow = selectedProject ? 'hidden' : ''
    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.body.style.overflow = ''
    }
  }, [selectedProject])

  const scrollTo = (id) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <button className="wordmark" onClick={() => scrollTo('top')} aria-label="Back to top">
          DP<span className="wordmark-dot">.</span>
        </button>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen}>
          <span>{menuOpen ? 'Close' : 'Menu'}</span>
          <span className={`menu-icon ${menuOpen ? 'is-open' : ''}`}><i /><i /></span>
        </button>
        <nav className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
          <button onClick={() => scrollTo('work')}>Work</button>
          <button onClick={() => scrollTo('about')}>About</button>
          <button onClick={() => scrollTo('contact')}>Contact</button>
        </nav>
      </header>

      <main>
        <section className="hero section-pad" id="top">
          <div className="hero-kicker"><span className="status-dot" /> Backend engineer · Open to opportunities</div>
          <div className="hero-heading">
            <div className="hero-copy">
              <p className="hero-eyebrow">Hello, I'm Devendra</p>
              <h1>Building<br /><em>reliable</em><br />systems<span className="orange-dot">.</span></h1>
              <p className="hero-intro">I build cloud-native services that stay clear under load, observable in production, and useful to the teams that own them.</p>
              <button className="hero-cta" onClick={() => scrollTo('work')}>Explore my work <Arrow /></button>
            </div>
            <div className="hero-art" aria-label="Abstract Devendra Pohekar monogram illustration">
              <div className="hero-orbit hero-orbit-one" />
              <div className="hero-orbit hero-orbit-two" />
              <div className="hero-monogram"><span>DP</span><i>GO · CLOUD · APIs</i></div>
              <div className="hero-code-card"><span><i /> system.status</span><strong>operational</strong><small>services · healthy</small></div>
              <span className="hero-location">AHMEDABAD, IN <b>↗</b></span>
            </div>
          </div>
          <div className="hero-bottom"><span>Backend engineering / 2026</span><button className="scroll-cue" onClick={() => scrollTo('work')}><span>Scroll to explore</span><Arrow /></button></div>
        </section>

        <section className="stats-section section-pad" aria-label="Career highlights">
          <div className="stats-grid">
            <article className="stat-card"><span>01 / EXPERIENCE</span><strong>3<span>+</span></strong><p>Years building backend systems</p></article>
            <article className="stat-card"><span>02 / SPECIALTY</span><strong>Go</strong><p>Microservices, APIs & distributed systems</p></article>
            <article className="stat-card"><span>03 / CLOUD</span><strong>AWS</strong><p>Reliable event-driven infrastructure</p></article>
            <article className="stat-card"><span>04 / COMMUNITY</span><strong>Dapr</strong><p>Open-source contributor</p></article>
          </div>
        </section>

        <section className="stack-section section-pad" aria-label="Technology stack">
          <div className="stack-heading"><span>Daily drivers</span><span>01 — 08</span></div>
          <div className="stack-grid">
            <div className="stack-item"><i className="devicon-go-original-wordmark" /><span>Go</span></div>
            <div className="stack-item"><i className="devicon-amazonwebservices-plain-wordmark" /><span>AWS</span></div>
            <div className="stack-item"><i className="devicon-docker-plain" /><span>Docker</span></div>
            <div className="stack-item"><i className="devicon-github-original" /><span>GitHub</span></div>
            <div className="stack-item"><i className="devicon-redis-plain-wordmark" /><span>Redis</span></div>
            <div className="stack-item"><i className="devicon-postgresql-plain-wordmark" /><span>PostgreSQL</span></div>
            <div className="stack-item"><i className="devicon-kubernetes-plain" /><span>Kubernetes</span></div>
            <div className="stack-item"><i className="devicon-grafana-plain" /><span>Observability</span></div>
          </div>
        </section>

        <section className="work-section section-pad" id="work">
          <div className="section-label"><span>Selected systems</span><span>(03)</span></div>
          <div className="portfolio-heading"><div><span className="eyebrow">A selection of my work</span><h2>Featured <em>projects</em></h2></div><p>Systems built for scale,<br />clarity, and reliability</p></div>
          <div className="project-list">
            {projects.map((project) => (
              <article className="project-row" key={project.title} onClick={() => setSelectedProject(project)} tabIndex="0" onKeyDown={(event) => event.key === 'Enter' && setSelectedProject(project)}>
                <div className={`project-image ${project.color}`}><img src={project.image} alt="" /></div>
                <div className="project-meta"><span className="project-number">{project.number}</span><h2>{project.title}</h2><p>{project.type}</p></div>
                <div className="project-description"><p>{project.description}</p><span className="project-year">{project.year}</span></div>
                <button className="project-arrow" aria-label={`View ${project.title}`}><Arrow diagonal /></button>
              </article>
            ))}
          </div>
        </section>

        <section className="about-section section-pad" id="about">
          <div className="section-label"><span>Engineering profile</span><span>(01)</span></div>
          <div className="about-grid">
            <h2>Reliable code<br /><em>earns trust.</em></h2>
            <div className="about-copy"><p>I'm Devendra, a backend engineer with 3+ years of experience building cloud-native microservices and APIs in Go.</p><p>I work across design, implementation, testing, and deployment — taking full ownership of systems from ideation to production.</p><a className="text-link" href="#contact">Get in touch <Arrow /></a></div>
          </div>
          <div className="about-facts"><div><span>Core stack</span><strong>Go · REST · gRPC · GraphQL</strong></div><div><span>Cloud</span><strong>AWS · Docker · GitHub Actions</strong></div><div><span>Databases</span><strong>PostgreSQL · Redis · DynamoDB</strong></div></div>
        </section>

        <section className="experience-section section-pad">
          <div className="section-label"><span>Experience & capabilities</span><span>(02)</span></div>
          <div className="experience-list">
            <article className="experience-item"><div className="experience-date">Nov 2023 — now</div><div><h3>Software Engineer — Backend (Go)</h3><p className="experience-company">Silicon IT India Pvt. Ltd.</p><p>Designed and deployed event-driven microservices on AWS Lambda, built REST APIs with proper error handling and observability, optimized database queries achieving 40% faster response times.</p></div></article>
            <article className="experience-item"><div className="experience-date">Jan 2023 — Oct 2023</div><div><h3>Backend Developer</h3><p className="experience-company">Hidden Brains Infotech</p><p>Built scalable REST APIs in Go, implemented Docker containerization, set up CI/CD pipelines with GitHub Actions, managed PostgreSQL databases and data migrations.</p></div></article>
          </div>
          <div className="capability-grid"><div><span>Runtime & APIs</span><strong>Go · Node.js · TypeScript<br />REST · gRPC · GraphQL · Beego · sqlc</strong></div><div><span>AWS & data</span><strong>Lambda · API Gateway · RDS<br />DynamoDB · S3 · SQS · CloudWatch</strong></div><div><span>DevOps & tools</span><strong>Docker · Kubernetes · GitHub Actions<br />Git · PostgreSQL · Redis · Linux</strong></div><div><span>Practices</span><strong>Microservices · Event-driven · Unit testing · Code review · Agile</strong></div></div>
        </section>

        <section className="pipeline-section section-pad" aria-label="Delivery workflow">
          <div className="section-label"><span>How I ship</span><span>CI/CD</span></div>
          <div className="pipeline"><div className="pipeline-step"><span>01</span><strong>Commit</strong><small>Git / GitHub</small></div><div className="pipeline-line" /><div className="pipeline-step"><span>02</span><strong>Test</strong><small>Unit · Integration</small></div><div className="pipeline-line" /><div className="pipeline-step"><span>03</span><strong>Build</strong><small>Docker · Push</small></div><div className="pipeline-line" /><div className="pipeline-step"><span>04</span><strong>Deploy</strong><small>AWS · Production</small></div></div>
        </section>

        <section className="contact-section section-pad" id="contact">
          <div className="section-label"><span>Start a conversation</span><span>(03)</span></div>
          <div className="contact-content">
            <div>
              <h2>Let's build<br /><em>something solid.</em></h2>
              <div className="contact-copy">
                <a className="contact-email" href="mailto:devendrapohekar30@gmail.com">devendrapohekar30@gmail.com <Arrow /></a>
                <span className="contact-phone">+91 95 52 95 0130</span>
                <nav className="contact-links">
                  <a className="text-link" href="https://github.com/devendrapohekar30" target="_blank" rel="noopener noreferrer">GitHub <Arrow /></a>
                  <a className="text-link" href="https://linkedin.com/in/devendrapohekar30" target="_blank" rel="noopener noreferrer">LinkedIn <Arrow /></a>
                  <a className="text-link" href="https://twitter.com/devendra_code" target="_blank" rel="noopener noreferrer">Twitter <Arrow /></a>
                </nav>
              </div>
            </div>
            <ContactForm />
          </div>
          <footer><span>© 2026 Devendra Pohekar</span><span>Ahmedabad · IST</span><a href="#top">Back to top ↑</a></footer>
        </section>
      </main>

      {selectedProject && <div className="modal-backdrop" onClick={() => setSelectedProject(null)}><div className="project-modal" role="dialog" aria-modal="true" aria-label={`${selectedProject.title} project details`}><img src={selectedProject.image} alt="" /><div><span className="project-number">{selectedProject.number}</span><h2>{selectedProject.title}</h2><p className="project-type">{selectedProject.type}</p><p>{selectedProject.description}</p></div><button className="modal-close" onClick={() => setSelectedProject(null)} aria-label="Close modal">Close ✕</button></div></div>}
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
