import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

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

    document.querySelectorAll('.section-label, .project-row, .about-grid, .about-facts, .contact-content').forEach((element) => revealObserver.observe(element))
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
            <h1>Building<br /><em>reliable</em> systems<span className="orange-dot">.</span></h1>
            <div className="hero-aside"><div className="signal-card"><span className="signal-pulse" /><span>system.status</span><strong>operational</strong><i /><i /><i /><i /></div><p>Go backend engineer<br />based in Ahmedabad.<br />AWS · APIs · Microservices.</p></div>
          </div>
          <div className="hero-bottom">
            <p className="hero-intro">I build cloud-native services that stay clear under load, observable in production, and useful to the teams that own them.</p>
            <button className="scroll-cue" onClick={() => scrollTo('work')}><span>Explore systems</span><Arrow /></button>
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
            <div className="about-copy"><p>I’m Devendra, a backend engineer with 3+ years of experience building cloud-native microservices and APIs in Go.</p><p>I work across design, implementation, code review, CI/CD, and production monitoring, with a focus on event-driven systems and strong ownership.</p><button className="text-link" onClick={() => scrollTo('contact')}>Let’s connect <Arrow /></button></div>
          </div>
          <div className="about-facts"><div><span>Core stack</span><strong>Go · REST · gRPC · GraphQL</strong></div><div><span>Cloud</span><strong>AWS · Docker · GitHub Actions</strong></div><div><span>Elsewhere</span><strong><a href="mailto:devendrapohekar30@gmail.com">Email</a> / <a href="https://linkedin.com/in/devendra-pohekar-a1b790230" target="_blank" rel="noreferrer">LinkedIn</a></strong></div></div>
        </section>

        <section className="experience-section section-pad">
          <div className="section-label"><span>Experience & capabilities</span><span>(02)</span></div>
          <div className="experience-list">
            <article className="experience-item"><div className="experience-date">Nov 2023 — now</div><div><h3>Software Engineer — Backend (Go)</h3><p className="experience-company">Silicon IT Hub Pvt. Ltd. · Ahmedabad</p><p>Designed Go microservices for Auth, Notifications, and Payments over REST and gRPC. Built a schema-federated GraphQL gateway, gRPC streaming with JWT interceptors, Stripe billing workflows, and Lambda/SQS processing with dead-letter queues.</p></div></article>
            <article className="experience-item"><div className="experience-date">Jan 2023 — Oct 2023</div><div><h3>Backend Developer</h3><p className="experience-company">Hidden Brains Infotech Pvt. Ltd. · Ahmedabad</p><p>Built REST APIs for onboarding, attendance, payroll, and contract workflows. Designed MySQL schemas, optimized queries, implemented JWT/RBAC middleware, audit logging, and AWS S3 document storage.</p></div></article>
          </div>
          <div className="capability-grid"><div><span>Runtime & APIs</span><strong>Go · Node.js · TypeScript<br />REST · gRPC · GraphQL · Beego · sqlc</strong></div><div><span>AWS & data</span><strong>Lambda · SQS · SNS · S3 · Kinesis<br />DynamoDB · PostgreSQL · MySQL · Redis</strong></div><div><span>Delivery & reliability</span><strong>Docker · GitHub Actions · Dapr<br />Datadog · OpenTelemetry · LocalStack</strong></div><div><span>Open source & education</span><strong>Dapr contributor: LocalStack/OpenSearch and Kinesis<br />B.Tech CSE · RGPV · CGPA 8.85 / 10</strong></div></div>
        </section>

        <section className="pipeline-section section-pad" aria-label="Delivery workflow">
          <div className="section-label"><span>How I ship</span><span>CI/CD</span></div>
          <div className="pipeline"><div className="pipeline-step"><span>01</span><strong>Commit</strong><small>Git / GitHub</small></div><div className="pipeline-line" /><div className="pipeline-step"><span>02</span><strong>Test</strong><small>Unit + integration</small></div><div className="pipeline-line" /><div className="pipeline-step"><span>03</span><strong>Build</strong><small>Docker / Actions</small></div><div className="pipeline-line" /><div className="pipeline-step"><span>04</span><strong>Observe</strong><small>Datadog / OTel</small></div></div>
        </section>

        <section className="contact-section section-pad" id="contact">
          <div className="section-label"><span>Start a conversation</span><span>(03)</span></div>
          <div className="contact-content"><h2>Let’s build<br /><em>something solid.</em></h2><div><a className="contact-email" href="mailto:devendrapohekar30@gmail.com">devendrapohekar30@gmail.com <Arrow /></a><a className="contact-phone" href="tel:+919109396802">+91 91093 96802</a></div></div>
          <footer><span>© 2026 Devendra Pohekar</span><span>Ahmedabad · IST</span><a href="#top">Back to top ↑</a></footer>
        </section>
      </main>

      {selectedProject && <div className="modal-backdrop" onClick={() => setSelectedProject(null)}><div className="project-modal" role="dialog" aria-modal="true" aria-label={`${selectedProject.title} project details`} onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setSelectedProject(null)}>Close <span>×</span></button><img src={selectedProject.image} alt="" /><div><span>{selectedProject.type} · {selectedProject.year}</span><h2>{selectedProject.title}</h2><p>{selectedProject.description}</p><a className="modal-link" href="mailto:devendrapohekar30@gmail.com">Discuss a similar project <Arrow /></a></div></div></div>}
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)