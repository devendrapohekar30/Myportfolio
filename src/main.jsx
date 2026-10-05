import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './reference.css'
import './styles.css'
import { ContactForm } from './ContactForm'
import profileImage from './assets/devendra-profile-cutout.png'

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
  const [activeIntegration, setActiveIntegration] = useState(0)
  const [awsExpanded, setAwsExpanded] = useState(false)
  const [architectureOpen, setArchitectureOpen] = useState(false)

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
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') { setSelectedProject(null); setArchitectureOpen(false) }
    }
    document.addEventListener('keydown', closeOnEscape)
    document.body.style.overflow = selectedProject || architectureOpen ? 'hidden' : ''
    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.body.style.overflow = ''
    }
  }, [selectedProject, architectureOpen])

  useEffect(() => {
    if (activeIntegration !== 1) return undefined
    setAwsExpanded(false)
    const timer = setInterval(() => setAwsExpanded((expanded) => !expanded), 5000)
    return () => clearInterval(timer)
  }, [activeIntegration])

  const scrollTo = (id) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <button className="wordmark" onClick={() => scrollTo('top')} aria-label="Back to top">
          <span className="dp-logo" aria-hidden="true">DP</span><span className="brand-name">DEVENDRA</span>
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
              <p className="hero-eyebrow">Backend engineer · Ahmedabad, India</p>
              <h1>Building <em>reliable</em><br />systems for the web<span className="orange-dot">.</span></h1>
              <p className="hero-intro">I design cloud-native services that stay clear under load, observable in production, and useful to the teams that own them.</p>
              <button className="hero-cta" onClick={() => scrollTo('work')}>Explore my work <Arrow /></button>
            </div>
            <div className="hero-art" aria-label="Abstract Devendra Pohekar monogram illustration">
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
            <button className="stack-item stack-go" onClick={() => setArchitectureOpen(true)} aria-label="Open Go microservices system design"><i className="devicon-go-original-wordmark" /><span>Go</span><small>View system design</small></button>
            <div className="stack-item"><i className="devicon-amazonwebservices-plain-wordmark" /><span>AWS</span></div>
            <div className="stack-item"><i className="devicon-docker-plain" /><span>Docker</span></div>
            <div className="stack-item"><i className="devicon-redis-plain-wordmark" /><span>Redis</span></div>
            <div className="stack-item"><i className="devicon-postgresql-plain-wordmark" /><span>PostgreSQL</span></div>
            <div className="stack-item"><i className="devicon-kubernetes-plain" /><span>Kubernetes</span></div>
            <div className="stack-item"><i className="devicon-grafana-plain" /><span>Observability</span></div>
          </div>
        </section>

        <section className="work-section section-pad" id="work">
          <div className="section-label"><span>Open for collaboration</span><span>(03)</span></div>
          <div className="portfolio-heading"><div><span className="eyebrow">The next case study starts here</span><h2>Your next <em>project.</em></h2></div><p>Let’s build a system that deserves<br />to be featured here.</p></div>
          <div className="coming-soon-board">
            <div className="coming-grid" aria-hidden="true" />
            <span className="coming-chip chip-one">GO / GRPC</span><span className="coming-chip chip-two">AWS / CLOUD</span><span className="coming-chip chip-three">BUILD IN PROGRESS</span>
            <div className="coming-core" aria-hidden="true"><i /><i /><i /></div>
            <div className="coming-copy"><span>01 / NEXT DEPLOYMENT</span><h3>Coming <em>soon.</em></h3><p>Waiting for your project to show here. Let’s turn your next idea into a reliable, production-ready system.</p><a className="hero-cta" href="#contact">Start a conversation <Arrow /></a></div>
          </div>
        </section>

        <section className="about-section section-pad" id="about">
          <div className="section-label"><span>Engineering profile</span><span>(01)</span></div>
          <div className="about-grid">
            <h2>Reliable code<br /><em>earns trust.</em></h2>
            <div className="about-copy"><p>I'm Devendra, a backend engineer with 3+ years of experience building cloud-native microservices and APIs in Go.</p><p>I work across design, implementation, testing, and deployment — taking full ownership of systems from ideation to production.</p><a className="text-link" href="#contact">Get in touch <Arrow /></a></div>
            <aside className="about-profile-card" aria-label="Devendra's contact details">
              <div className="profile-photo-wrap"><img src={profileImage} alt="Devendra Pohekar" /></div>
              <div className="profile-card-head"><div><small>Go microservice specialist</small><h3>Devendra<br />Pohekar</h3></div><b>DP</b></div>
              <div className="profile-availability"><i />Available for work</div>
              <div className="profile-contact-list">
                <a href="mailto:devendrapohekar30@gmail.com"><i>✉</i><span>Email<em>devendrapohekar30@gmail.com</em></span></a>
                <a href="tel:+919109396802"><i>⌕</i><span>Phone<em>+91 91093 96802</em></span></a>
                <div><i>⌖</i><span>Location<em>India · Remote friendly</em></span></div>
              </div>
            </aside>
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
          <div className="section-label"><span>How I ship</span><span>CI / CD</span></div>
          <div className="pipeline-heading"><div><span className="eyebrow">From commit to production</span><h2>Deployment, <em>in motion.</em></h2></div><p>Every release moves through a visible, automated path—then Argo CD verifies the service is healthy.</p></div>
          <div className="delivery-board" aria-label="Animated deployment workflow">
            <div className="delivery-flow">
              <article className="delivery-node"><span className="node-icon">&lt;/&gt;</span><div><b>Code push</b><small>GitHub · main</small></div><i>01</i></article>
              <span className="flow-line" />
              <article className="delivery-node"><span className="node-icon">✓</span><div><b>Build & test</b><small>CI · Docker</small></div><i>02</i></article>
              <span className="flow-line" />
              <article className="delivery-node"><span className="node-icon">ECR</span><div><b>Push image</b><small>AWS ECR · v1.4.0</small></div><i>03</i></article>
              <span className="flow-line" />
              <article className="delivery-node"><span className="node-icon">K</span><div><b>Kargo promote</b><small>stage → production</small></div><i>04</i></article>
              <span className="flow-line" />
              <article className="delivery-node"><span className="node-icon">A</span><div><b>Argo CD sync</b><small>cluster · production</small></div><i>05</i></article>
            </div>
            <div className="service-status"><div><span className="status-dot" /><span>ARGO CD · LIVE STATUS</span></div><strong>microservice-api</strong><p><b>Healthy</b><span>●</span> Synced · 3/3 pods ready</p><small>release v1.4.0 · just deployed</small></div>
          </div>
        </section>

        <section className="integrations-section section-pad" aria-label="Third-party integrations">
          <div className="section-label"><span>Third-party integrations</span><span>01 / 03</span></div>
          <div className="integration-heading"><div><span className="eyebrow">Reliable system boundaries</span><h2>Payments without<br /><em>guesswork.</em></h2></div><p>I build integrations with clear server-side ownership, verified events, and observable states.</p></div>
          <div className="integration-tabs" role="tablist" aria-label="Integration examples">
            {['Stripe payments', 'AWS event flow', 'Notifications'].map((name, index) => <button key={name} role="tab" aria-selected={activeIntegration === index} className={activeIntegration === index ? 'is-active' : ''} onClick={() => setActiveIntegration(index)}>{String(index + 1).padStart(2, '0')} <span>{name}</span></button>)}
          </div>
          {activeIntegration === 0 && <div className="integration-panel">
            <div className="stripe-intro"><div className="stripe-mark">stripe</div><span>Payments integration</span><h3>From booking<br />to <em>confirmed.</em></h3><p>A secure payment journey where your backend owns the booking, validates the amount, and fulfils only verified Stripe events.</p><div className="stripe-principles"><span>✓ Server-side amount validation</span><span>✓ Webhook signature verification</span><span>✓ Idempotent order fulfilment</span></div></div>
            <div className="booking-flow" aria-label="Stripe booking payment integration flow">
              <div className="booking-card"><div className="booking-card-top"><span>DP</span><b>Cloud architecture session</b><i>₹2,499</i></div><div className="booking-meta"><span>Tue, 15 Oct · 45 min</span><span>Online consultation</span></div><button>Confirm booking <b>→</b></button></div>
              <div className="booking-path path-booking-one"><i>01</i><span>Booking created</span></div>
              <div className="payment-service"><span>⌘</span><div><b>payments-service</b><small>Go API · validates amount</small></div><i>PaymentIntent</i></div>
              <div className="booking-path path-booking-two"><i>02</i><span>Secure payment intent</span></div>
              <div className="stripe-checkout"><div><span>stripe</span><small>Secure checkout</small></div><div className="checkout-methods"><div className="checkout-method card-method"><i>▰</i><span><b>Card</b><small>•••• 4242</small></span><em>VISA</em></div><div className="checkout-method gpay-method"><i>G</i><span><b>Google Pay</b><small>Fast, secure checkout</small></span><em>G Pay</em></div><div className="checkout-method apple-method"><i>●</i><span><b>Apple Pay</b><small>Confirm with Face ID</small></span><em> Pay</em></div></div><p>Payment details are secured by Stripe.</p><i>Payment authorized <strong>✓</strong></i></div>
              <div className="payment-phone"><div className="payment-phone-notch" /><div className="payment-phone-screen"><div className="phone-status"><span>9:41</span><span>● ● ●</span></div><div className="success-ring"><span>✓</span></div><b>Payment successful</b><p>₹2,499 paid securely</p><small>Booking confirmed · 15 Oct</small></div></div>
              <div className="booking-path path-booking-three"><i>03</i><span>Verified webhook event</span></div>
              <div className="database-sync"><div className="db-icon">▤</div><div><small>POSTGRESQL · BOOKINGS</small><b>Payment status updated</b><p>booking_id BK-1048 · <strong>paid</strong> · transaction saved</p></div><span>✓</span></div>
            </div>
          </div>}
          {activeIntegration === 1 && <div className={`aws-panel ${awsExpanded ? 'is-expanded' : ''}`}>
            <div className="aws-panel-header"><div><span className="aws-mark">aws</span><span>Event-driven architecture</span></div><p>{awsExpanded ? 'Scale-out mode · parallel event processing' : 'Focused mode · single event processing'} <i /></p></div>
            <div className="aws-canvas">
              <div className="aws-lane-labels"><span>Producer</span><span>Event stream</span><span>Compute</span><span>Destination</span></div>
              <div className="aws-lanes">
                <div className="aws-lane lane-one"><div className="aws-box producer"><b>orders-service</b><small>OrderCreated</small></div><i className="lane-arrow" /><div className="aws-box stream"><em>≋</em><div><b>orders-stream</b><small>Kinesis Data Stream</small></div></div><i className="lane-arrow" /><div className="aws-box lambda"><em>λ</em><div><b>order-processor</b><small>Lambda · batch 100</small></div></div><i className="lane-arrow" /><div className="aws-box destination"><b>Partner API</b><small>Third-party app</small></div></div>
                <div className="aws-lane lane-extra"><div className="aws-box producer"><b>billing-service</b><small>PaymentCaptured</small></div><i className="lane-arrow" /><div className="aws-box stream"><em>≋</em><div><b>billing-stream</b><small>Kinesis Data Stream</small></div></div><i className="lane-arrow" /><div className="aws-box lambda"><em>λ</em><div><b>billing-processor</b><small>Lambda · batch 50</small></div></div><i className="lane-arrow" /><div className="aws-box destination"><b>notifications</b><small>Microservice</small></div></div>
                <div className="aws-lane lane-extra"><div className="aws-box producer"><b>catalog-service</b><small>InventoryChanged</small></div><i className="lane-arrow" /><div className="aws-box stream"><em>≋</em><div><b>inventory-stream</b><small>Kinesis Data Stream</small></div></div><i className="lane-arrow" /><div className="aws-box lambda"><em>λ</em><div><b>inventory-processor</b><small>Lambda · batch 75</small></div></div><i className="lane-arrow" /><div className="aws-box destination"><b>analytics</b><small>Microservice</small></div></div>
              </div>
              <div className="aws-mode-note"><span>{awsExpanded ? '03 streams · 03 consumers' : '01 stream · 01 consumer'}</span><b>{awsExpanded ? 'Parallel event processing is live' : 'Focused event processing is live'}</b><small>{awsExpanded ? 'Each domain event scales independently, without coupling services.' : 'Switching to parallel processing in 5 seconds…'}</small></div>
            </div>
          </div>}
          {activeIntegration === 2 && <div className="notification-panel">
            <div className="notification-copy"><div className="firebase-mark">✦</div><span>Firebase Cloud Messaging</span><h3>From backend event<br />to <em>mobile moment.</em></h3><p>When a meaningful backend event occurs, the notification service creates a targeted FCM message and delivers it to the user’s device.</p><div className="notification-legends"><span><i /> Backend event</span><span><i /> FCM delivery</span><span><i /> Mobile received</span></div></div>
            <div className="notification-flow" aria-label="Firebase push notification flow">
              <div className="notify-node backend-node"><span>⌘</span><div><b>notification-service</b><small>Go backend · event received</small></div></div><div className="notify-path path-one" />
              <div className="notify-node fcm-node"><span>✦</span><div><b>Firebase Cloud Messaging</b><small>Targeted push · high priority</small></div></div><div className="notify-path path-two" />
              <div className="mobile-device"><div className="mobile-speaker" /><div className="mobile-screen"><div className="mobile-top"><span>9:41</span><span>● ● ●</span></div><div className="app-brand">DP</div><p>Your workspace</p><div className="push-toast"><div className="push-icon">DP</div><div><b>Order update</b><p>Your deployment is live and healthy.</p><small>now</small></div></div><div className="mobile-pulse" /></div></div>
              <div className="notification-status"><span className="status-dot" /><div><b>DELIVERED TO DEVICE</b><small>fcm_message_id: 0:172… · Android</small></div><strong>✓</strong></div>
            </div>
          </div>}
        </section>

        <section className="contact-section section-pad" id="contact">
          <div className="section-label"><span>Start a conversation</span><span>(03)</span></div>
          <div className="contact-content">
            <div>
              <h2>Let's build<br /><em>something solid.</em></h2>
              <div className="contact-copy">
                <a className="contact-email" href="mailto:devendrapohekar30@gmail.com">devendrapohekar30@gmail.com <Arrow /></a>
                <span className="contact-phone">+91 91093 96802</span>
                <nav className="contact-links">
                  <a className="text-link" href="https://linkedin.com/in/devendrapohekar30" target="_blank" rel="noopener noreferrer">LinkedIn <Arrow /></a>
                </nav>
              </div>
            </div>
            <ContactForm />
          </div>
          <footer><span>© 2026 Devendra Pohekar</span><span>Ahmedabad · IST</span><a href="#top">Back to top ↑</a></footer>
        </section>
      </main>

      {selectedProject && <div className="modal-backdrop" onClick={() => setSelectedProject(null)}><div className="project-modal" role="dialog" aria-modal="true" aria-label={`${selectedProject.title} project details`}><img src={selectedProject.image} alt="" /><div><span className="project-number">{selectedProject.number}</span><h2>{selectedProject.title}</h2><p className="project-type">{selectedProject.type}</p><p>{selectedProject.description}</p></div><button className="modal-close" onClick={() => setSelectedProject(null)} aria-label="Close modal">Close ✕</button></div></div>}
      {architectureOpen && <div className="modal-backdrop architecture-backdrop" onClick={() => setArchitectureOpen(false)}><div className="architecture-modal" role="dialog" aria-modal="true" aria-label="Go microservices system design" onClick={(event) => event.stopPropagation()}>
        <div className="architecture-head"><div><span>GO / GRPC · PRODUCTION BLUEPRINT</span><h2>Microservices, <em>designed to flow.</em></h2><p>A resilient Go platform with independent services, asynchronous events, secure delivery, and end-to-end observability.</p></div><button className="modal-close" onClick={() => setArchitectureOpen(false)} aria-label="Close system design">Close ✕</button></div>
        <div className="architecture-legend"><span><i className="request" /> Synchronous gRPC</span><span><i className="event" /> Async event stream</span><span><i className="observe" /> Telemetry & alerts</span><b>LIVE ARCHITECTURE MAP</b></div>
        <div className="architecture-map">
          <section className="architecture-zone edge-zone"><h3>01 / Edge</h3><div className="arch-node edge-node"><small>PUBLIC EDGE</small><b>API Gateway</b><span>REST / gRPC ingress</span></div><div className="arch-arrow request-arrow">gRPC</div></section>
          <section className="architecture-zone service-zone"><h3>02 / Go services on EKS</h3><div className="service-cluster"><div className="arch-node service-node"><small>GO / GRPC</small><b>Auth service</b><span>Identity & RBAC</span></div><div className="arch-node service-node"><small>GO / GRPC</small><b>Orders service</b><span>Business workflows</span></div><div className="arch-node service-node"><small>GO / GRPC</small><b>Payments service</b><span>Transactions</span></div><div className="arch-node service-node"><small>GO / GRPC</small><b>Notifications</b><span>Push & email</span></div></div><div className="service-note"><span>Amazon EKS</span><b>Horizontal pods · service discovery · gRPC tracing</b></div></section>
          <section className="architecture-zone data-zone"><h3>03 / State & contracts</h3><div className="data-grid"><div className="arch-node data-node postgres"><b>PostgreSQL</b><span>Service-owned data</span></div><div className="arch-node data-node redis"><b>Redis cache</b><span>Hot reads · locks</span></div><div className="arch-node data-node dynamo"><b>DynamoDB</b><span>Idempotency keys</span></div><div className="arch-node data-node s3"><b>Amazon S3</b><span>Documents & exports</span></div></div></section>
          <section className="architecture-zone event-zone"><h3>04 / Event backbone</h3><div className="event-rail"><div className="arch-node event-node"><b>Kafka</b><span>Domain events</span></div><div className="event-pulse" /><div className="arch-node event-node"><b>Kinesis</b><span>Streaming events</span></div><div className="event-pulse delay" /><div className="arch-node lambda-node"><b>λ Lambda</b><span>Async processors</span></div></div><div className="event-targets"><span>Partner APIs</span><span>OpenSearch</span><span>Analytics</span></div></section>
          <section className="architecture-zone platform-zone"><h3>05 / Security, delivery & operations</h3><div className="platform-grid"><div className="platform-card security"><b>Secrets</b><span>AWS Secrets Manager · Infisical</span></div><div className="platform-card delivery"><b>Delivery</b><span>Docker → ECR → Kargo → Argo CD</span></div><div className="platform-card telemetry"><b>Telemetry</b><span>Datadog tracing · CloudWatch logs</span></div><div className="platform-card alert"><b>Incidents</b><span>OpenSearch → PagerDuty</span></div></div><div className="deploy-track"><span>Build image</span><i /> <span>Amazon ECR</span><i /> <span>Kargo promote</span><i /> <span>Argo CD sync</span><i /> <strong>Healthy on EKS ✓</strong></div></section>
        </div>
        <div className="architecture-status"><span className="status-dot" /><div><b>orders-service · v2.8.1</b><small>Trace 8fd1… · 42ms p95 · 6 healthy pods · event lag 0</small></div><span>SYNCED</span></div>
      </div></div>}
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
