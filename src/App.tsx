import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Briefcase,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  Code2,
  Globe2,
  LayoutGrid,
  Lightbulb,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Palette,
  Phone,
  Rocket,
  ShieldCheck,
  Smartphone,
  Star,
  Target,
  TrendingUp,
  Wrench,
  X,
} from 'lucide-react'
import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useParams,
} from 'react-router-dom'
import './App.css'

type PageMeta = {
  title: string
  description: string
}

const siteConfig = {
  companyName: 'CodeMind Digital Agency',
  tagline: 'Turning Ideas Into Digital Solutions.',
  shortDescription:
    'CodeMind Digital Agency helps businesses, startups, and organizations transform ideas into powerful websites, software systems, and digital experiences.',
  contact: {
    email: 'cyuzuzocyisezeranosamuel@gmail.com',
    phone: '250726456572',
    location: 'Kigali, Rwanda',
    whatsapp: 'https://wa.me/250726456572',
    github: 'https://github.com',
    linkedin: 'https://www.linkedin.com',
  },
}

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Process', href: '/process' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Insights', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

const journeyStages = [
  {
    title: 'Discover',
    text: 'Understand your goals, ideas, and challenges.',
    icon: Lightbulb,
  },
  {
    title: 'Plan',
    text: 'Define the strategy, requirements, and solution.',
    icon: ClipboardList,
  },
  {
    title: 'Build',
    text: 'Design and develop the digital product.',
    icon: Code2,
  },
  {
    title: 'Test & Refine',
    text: 'Test quality, performance, usability, and security.',
    icon: ShieldCheck,
  },
  {
    title: 'Launch',
    text: 'Deploy the solution and make it available to users.',
    icon: Rocket,
  },
  {
    title: 'Grow Together',
    text: 'Improve, support, and innovate continuously.',
    icon: TrendingUp,
  },
]

const services = [
  {
    title: 'Web Development',
    description:
      'Modern, responsive, high-performance websites and web applications built for growth.',
    icon: 'code',
    problems: ['Poor online presence', 'Slow user experience', 'Scalable growth needs'],
    features: ['SEO-ready architecture', 'Fast front-end experiences', 'CMS and dashboard support'],
    technologies: ['React', 'TypeScript', 'Node.js', 'Next.js'],
    approach: 'We map product goals to user journeys and ship a polished web experience.',
  },
  {
    title: 'Software Development',
    description:
      'Custom software systems designed around business requirements, workflows, and measurable impact.',
    icon: 'layout',
    problems: ['Manual processes', 'Disconnected systems', 'Low operational visibility'],
    features: ['Business logic design', 'Role-based access', 'Reporting and automation'],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'REST APIs'],
    approach: 'We design practical systems that reduce friction and improve clarity.',
  },
  {
    title: 'Mobile Applications',
    description:
      'User-friendly mobile experiences for Android and iOS that feel fast, reliable, and intuitive.',
    icon: 'smartphone',
    problems: ['Offline business access', 'Weak mobile user experience', 'Customer engagement gaps'],
    features: ['Cross-platform delivery', 'Secure authentication', 'Push notifications'],
    technologies: ['React Native', 'Firebase', 'Expo', 'APIs'],
    approach: 'We prioritize usability and product simplicity for everyday mobile customers.',
  },
  {
    title: 'UI/UX Design',
    description:
      'Modern interfaces and experiences designed around real users, business goals, and clarity.',
    icon: 'palette',
    problems: ['Low conversion', 'Confusing interfaces', 'Brand inconsistency'],
    features: ['Wireframes and flows', 'Design systems', 'Prototype validation'],
    technologies: ['Figma', 'Design systems', 'User testing'],
    approach: 'We turn complex ideas into intuitive product experiences.',
  },
  {
    title: 'Business Systems',
    description:
      'Custom systems for managing operations, customers, data, documents, and workflows.',
    icon: 'briefcase',
    problems: ['Disconnected departments', 'Document chaos', 'Slow reporting'],
    features: ['Dashboard views', 'Workflow automation', 'Data tracking'],
    technologies: ['Custom admin panels', 'Integrations', 'Databases'],
    approach: 'We simplify internal operations and create visibility across teams.',
  },
  {
    title: 'E-Commerce Solutions',
    description:
      'Professional online stores and digital commerce platforms built to convert and scale.',
    icon: 'globe',
    problems: ['Low online sales', 'Weak storefront experience', 'Manual order handling'],
    features: ['Product management', 'Secure checkout', 'Inventory visibility'],
    technologies: ['Shopify', 'React', 'Stripe', 'Headless Commerce'],
    approach: 'We reshape digital selling experiences into clear customer journeys.',
  },
  {
    title: 'Digital Transformation',
    description:
      'Helping organizations move manual processes into efficient digital systems and workflows.',
    icon: 'target',
    problems: ['Paper-heavy tasks', 'Slow internal processes', 'Limited automation'],
    features: ['Digital strategy support', 'Process mapping', 'Change-ready systems'],
    technologies: ['Workflow tooling', 'Data systems', 'Cloud deployment'],
    approach: 'We align technology with the actual operational realities of the business.',
  },
  {
    title: 'Maintenance & Support',
    description:
      'Continuous improvements, upgrades, security reviews, and technical support after launch.',
    icon: 'wrench',
    problems: ['Bugs and downtime', 'Security concerns', 'Limited technical support'],
    features: ['Ongoing monitoring', 'Feature improvements', 'Issue resolution'],
    technologies: ['Monitoring tools', 'CI/CD', 'Performance audits'],
    approach: 'We keep products stable, secure, and growing over time.',
  },
]

const projects = [
  {
    slug: 'skillhive',
    name: 'SkillHive',
    category: 'Community Platform',
    description: 'AI-powered community skills exchange platform connecting learners and experts.',
    technology: ['AI', 'React', 'Node.js', 'PostgreSQL'],
    image:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
    accent: '#6d5efc',
    overview:
      'SkillHive creates a digital marketplace for skills exchange, peer learning, and guided community growth.',
    problem:
      'Users struggled to find trusted peers, structured learning pathways, and straightforward ways to offer or receive skills.',
    solution:
      'We designed a platform that matches people by capability, interest, and community needs while making skill exchange measurable and easy to manage.',
    features: ['Skill discovery', 'Profiles and onboarding', 'Community collaboration', 'AI-assisted matching'],
    results: 'Improved onboarding clarity and helped users connect around practical learning opportunities.',
    challenges: 'Balancing simplicity with trust, community moderation, and scalable matching logic.',
    lessons: 'Clear onboarding and strong search criteria help community products retain users quickly.',
    process: ['Discovery', 'Experience design', 'Product build', 'Testing'],
  },
  {
    slug: 'taxcoreai',
    name: 'TaxCoreAI',
    category: 'Public Sector',
    description: 'Intelligent taxpayer records management and digital tax administration system.',
    technology: ['AI', 'Analytics', 'Python', 'Cloud'],
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80',
    accent: '#1ca98c',
    overview:
      'TaxCoreAI helps institutions manage records, automate review workflows, and improve tax administration efficiency.',
    problem:
      'Tax data was fragmented, repetitive, and difficult to monitor consistently across teams.',
    solution:
      'We organized tax records into a secure, searchable digital system with workflow visibility and smart insights.',
    features: ['Record management', 'AI-assisted review', 'Reporting dashboards', 'Access controls'],
    results: 'Improved visibility, reduced manual reconciliation effort, and supported more consistent service delivery.',
    challenges: 'Adapting complex public-sector rules into a usable and scalable digital workflow.',
    lessons: 'Operational clarity matters just as much as technical performance in public-facing systems.',
    process: ['Strategy', 'Architecture', 'Development', 'Deployment'],
  },
  {
    slug: 'resume-screening-ai',
    name: 'Resume Screening AI',
    category: 'HR Technology',
    description: 'AI-powered recruitment and resume screening platform for fast, fair candidate evaluation.',
    technology: ['AI', 'React', 'API', 'Data Models'],
    image:
      'https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&w=900&q=80',
    accent: '#f39a36',
    overview:
      'The platform helps recruiters filter large candidate pools while improving decision-making speed.',
    problem:
      'Recruitment teams were overwhelmed by manual screening, mismatched talent reviews, and inconsistent filtering.',
    solution:
      'We built a structured evaluation system that organizes applicant data and helps teams make better-informed decisions faster.',
    features: ['Candidate scoring', 'Smart filtering', 'Reporting', 'Role-based workflows'],
    results: 'Simplified screening and reduced the administrative burden on the hiring process.',
    challenges: 'Keeping the AI-assisted workflow transparent, fair, and useful in real hiring decisions.',
    lessons: 'A strong user experience is essential when designing decision-support tools.',
    process: ['Discovery', 'UX design', 'Build', 'Testing'],
  },
  {
    slug: 'harmony-hospitality',
    name: 'Harmony Hospitality',
    category: 'Hospitality Platform',
    description: 'Digital hospitality and accommodation platform for bookings, services, and guest experiences.',
    technology: ['React', 'Stripe', 'CMS', 'Cloud'],
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
    accent: '#ff6a88',
    overview:
      'Harmony Hospitality offers a traveler-friendly booking experience blended with service management and brand visibility.',
    problem:
      'Hospitality brands needed a smoother digital booking journey and a clearer way to manage guest-facing information.',
    solution:
      'We built a polished platform with a strong user flow, accommodation discovery, and service showcases.',
    features: ['Listings', 'Booking flow', 'Guest information', 'Service management'],
    results: 'Helped present hospitality offerings more clearly and improved the digital booking experience.',
    challenges: 'Balancing rich content, usability, and conversion-focused design without clutter.',
    lessons: 'Good hospitality experiences thrive on simplicity, trust, and clear information architecture.',
    process: ['Research', 'Design', 'Development', 'Launch'],
  },
]

const processSteps = [
  {
    title: 'Discovery',
    text: 'Understand the business, users, and problem before designing the right solution.',
  },
  {
    title: 'Strategy',
    text: 'Define requirements, architecture, scope, roadmap, and measurable outcomes.',
  },
  {
    title: 'Design',
    text: 'Create wireframes, UX flows, and polished visual design for clarity and usability.',
  },
  {
    title: 'Development',
    text: 'Build the solution using modern development practices and scalable architecture.',
  },
  {
    title: 'Testing',
    text: 'Validate performance, security, usability, and reliability across critical workflows.',
  },
  {
    title: 'Deployment',
    text: 'Launch the product with a clear handoff, monitoring, and support plan.',
  },
  {
    title: 'Support',
    text: 'Monitor, maintain, improve, and scale the solution as the business grows.',
  },
]

const testimonials = [
  {
    name: 'Aline Uwase',
    role: 'Operations Lead',
    company: 'Kigali Venture Studio',
    project: 'Community Platform',
    rating: 5,
    quote:
      'CodeMind brought structure, clarity, and a strong product sense to our platform. Their work felt professional and aligned with our goals.',
  },
  {
    name: 'Eric Ndayambaje',
    role: 'Founder',
    company: 'TaxFlow Consulting',
    project: 'Digital Administration System',
    rating: 5,
    quote:
      'Their team understood our problem deeply and translated that into a thoughtful, usable system that helped us run smarter operations.',
  },
  {
    name: 'Miriam Kabanda',
    role: 'Head of Marketing',
    company: 'Horizon Hotel Group',
    project: 'Hospitality Platform',
    rating: 5,
    quote:
      'We needed a digital experience that felt premium and practical. CodeMind delivered something polished and easy for users to navigate.',
  },
]

const faqItems = [
  {
    question: 'What kind of projects does CodeMind build?',
    answer:
      'We build websites, web apps, custom software, mobile experiences, business systems, e-commerce platforms, digital transformation projects, and support work for growing organizations.',
  },
  {
    question: 'How much does a website cost?',
    answer:
      'Project cost depends on scope, features, timeline, and complexity. We typically provide a tailored estimate after learning about the product and business goals.',
  },
  {
    question: 'How long does development take?',
    answer:
      'Small projects can take a few weeks, while broader systems may take several months depending on the requirements, testing, and stakeholder feedback cycles.',
  },
  {
    question: 'Can you build custom business systems?',
    answer:
      'Yes. We can design and build internal systems, dashboards, administration panels, workflow tools, and operational platforms tailored to business needs.',
  },
  {
    question: 'Do you provide maintenance?',
    answer:
      'Yes. We provide ongoing support, maintenance, performance optimization, security reviews, and improvements after launch.',
  },
  {
    question: 'Can you work with startups?',
    answer:
      'Absolutely. We help startups test ideas, define product priorities, build MVPs, and prepare solutions for growth and scaling.',
  },
  {
    question: 'Do you redesign existing websites?',
    answer:
      'Yes. We can refresh, restructure, and improve existing websites to make them more user-friendly, scalable, and conversion-focused.',
  },
  {
    question: 'How do I start a project?',
    answer:
      'Start by sending a project inquiry through our contact page. We will review your needs, ask a few clarifying questions, and propose the next steps.',
  },
]

const blogPosts = [
  {
    slug: 'building-digital-products-in-rwanda',
    category: 'Digital Transformation',
    title: 'Building digital products that serve real business needs in Rwanda',
    excerpt:
      'A practical look at how digital products should solve operational pain points before chasing broad feature lists.',
    date: '16 Sep 2026',
    readTime: '5 min read',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
  },
  {
    slug: 'how-web-performance-affects-conversion',
    category: 'Web Development',
    title: 'How web performance directly affects conversion and trust',
    excerpt:
      'Fast websites improve usability, reduce friction, and help customers make decisions with more confidence.',
    date: '09 Sep 2026',
    readTime: '4 min read',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
  },
  {
    slug: 'ai-for-business-operations',
    category: 'AI',
    title: 'AI for business operations: where automation delivers value',
    excerpt:
      'The most effective AI systems are built around clear workflows, measurable outcomes, and user trust.',
    date: '03 Sep 2026',
    readTime: '6 min read',
    image:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80',
  },
]

const iconMap: Record<string, typeof Code2> = {
  code: Code2,
  layout: LayoutGrid,
  smartphone: Smartphone,
  palette: Palette,
  briefcase: Briefcase,
  globe: Globe2,
  target: Target,
  wrench: Wrench,
  bot: Bot,
}

const metaMap: Record<string, PageMeta> = {
  '/': {
    title: 'CodeMind Digital Agency | Rwanda Digital Solutions',
    description:
      'CodeMind Digital Agency builds web solutions, software systems, and digital experiences for businesses in Rwanda and beyond.',
  },
  '/about': {
    title: 'About CodeMind | Digital Agency Rwanda',
    description:
      'Learn about CodeMind, our mission, values, and commitment to building practical digital solutions for growth.',
  },
  '/services': {
    title: 'Services | CodeMind Digital Agency',
    description:
      'Explore our web development, software, mobile, UX design, business systems, AI, and support services.',
  },
  '/projects': {
    title: 'Projects | CodeMind Digital Agency',
    description:
      'See examples of digital products built with purpose across community, public sector, hospitality, and business technology.',
  },
  '/process': {
    title: 'Our Process | CodeMind Digital Agency',
    description:
      'A step-by-step process from discovery and strategy to development, testing, deployment, and long-term support.',
  },
  '/testimonials': {
    title: 'Testimonials | CodeMind Digital Agency',
    description:
      'Read sample client feedback and discover how CodeMind supports businesses with digital product development and strategy.',
  },
  '/blog': {
    title: 'Insights & Blog | CodeMind Digital Agency',
    description:
      'Read practical insights on software development, AI, digital transformation, and strategic product thinking.',
  },
  '/contact': {
    title: 'Contact CodeMind | Start a Project',
    description:
      'Tell us about your challenge and start a project conversation with CodeMind Digital Agency.',
  },
  '/faq': {
    title: 'FAQ | CodeMind Digital Agency',
    description:
      'Find answers about project scope, pricing, timelines, maintenance, and how we work with teams and startups.',
  },
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout />
    </BrowserRouter>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [pathname])

  return null
}

function Layout() {
  const location = useLocation()

  useEffect(() => {
    const pathMeta = metaMap[location.pathname] ?? metaMap['/']
    document.title = pathMeta.title

    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', pathMeta.description)
    }
  }, [location.pathname])

  return (
    <div className="site-shell">
      <Header />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="page-content"
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:slug" element={<ProjectDetailsPage />} />
            <Route path="/process" element={<ProcessPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogArticlePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}

function NotFoundPage() {
  return (
    <section className="section-block not-found-page">
      <div className="container not-found-content">
        <span className="eyebrow">Page not found</span>
        <h1>That page is not available.</h1>
        <p>The link may be outdated, but you can return to CodeMind and continue exploring.</p>
        <Link to="/" className="primary-button">Back to home <ArrowRight size={17} /></Link>
      </div>
    </section>
  )
}

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="topbar">
      <div className="container nav-wrap">
        <Link to="/" className="logo" aria-label="CodeMind home page">
          <img src="/c.png" alt="CodeMind Digital Agency Ltd" className="site-logo-image" />
        </Link>

        <nav className={`desktop-nav ${mobileOpen ? 'mobile-open' : ''}`} aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }: { isActive: boolean }) =>
                isActive ? 'nav-item active' : 'nav-item'
              }
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          <Link to="/contact" className="primary-button desktop-cta">
            Start a Project
          </Link>
          <button
            className="mobile-menu-btn"
            type="button"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen((value) => !value)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>
  )
}

function HomePage() {
  const [activeStep, setActiveStep] = useState(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleMotionPreference = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches)
    mediaQuery.addEventListener('change', handleMotionPreference)

    return () => mediaQuery.removeEventListener('change', handleMotionPreference)
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveStep((current) => (current + 1) % journeyStages.length)
    }, 2300)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <>
      <section className="hero-section home-brand-hero">
        <div className="container hero-grid brand-hero-grid">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hero-copy brand-copy"
          >
            <span className="journey-eyebrow"><span className="journey-eyebrow-dot" /> Our Journey</span>
            <h1>From Ideas to <span>Real Impact</span></h1>
            <p>
              We turn ideas into powerful digital solutions through strategy, technology, creativity, and continuous innovation.
            </p>

            <div className="hero-actions">
              <Link to="/services" className="primary-button">
                Explore Our Services <ArrowRight size={17} />
              </Link>
              <Link to="/contact" className="secondary-button light-button">
                Start a Project
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hero-visual brand-visual"
          >
            <div className="journey-visual" aria-label="CodeMind project journey">
              <div className="journey-orbit">
                <div className="journey-track" />
                <div className="journey-progress" />
                <div className="journey-center">
                  <img src="/c.png" alt="CodeMind Digital Agency Ltd" className="journey-logo" />
                  <span>IDEA <b>→</b> STRATEGY <b>→</b> SOLUTION <b>→</b> IMPACT</span>
                </div>
                {journeyStages.map((step, index) => {
                  const Icon = step.icon
                  const isActive = index === activeStep

                  return (
                    <motion.div
                      key={step.title}
                      className={`journey-stage journey-stage-${index + 1} ${isActive ? 'active' : ''}`}
                      animate={prefersReducedMotion ? { opacity: 1 } : {
                        opacity: isActive ? 1 : 0.62,
                        scale: isActive ? 1.04 : 1,
                      }}
                      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.55, ease: 'easeOut' }}
                      style={{ '--stage-index': index } as React.CSSProperties}
                    >
                      <div className="journey-icon-wrap">
                        <Icon size={20} />
                      </div>
                      <div className="journey-stage-copy">
                        <strong>{step.title}</strong>
                        <span>{step.text}</span>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
              <div className="journey-legend" aria-live="polite">
                <span className="journey-legend-number">0{activeStep + 1}</span>
                <span>{journeyStages[activeStep].title}</span>
                <span className="journey-legend-line" />
                <span>06</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-block services-highlight">
        <div className="container">
          <div className="cards-grid services-grid">
            {services.slice(0, 4).map((service) => {
              const Icon = iconMap[service.icon] ?? Code2
              return (
                <motion.article key={service.title} whileHover={{ y: -8, scale: 1.01 }} className="info-card service-card brand-card">
                  <div className="card-icon">
                    <Icon size={24} />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <Link to="/services" className="text-link">
                    Learn more <ArrowRight size={16} />
                  </Link>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section-block pricing-block alt">
        <div className="container">
          <div className="section-heading split pricing-head">
            <div>
              <span className="eyebrow">Tariffs</span>
              <h2>Transparent pricing for growing digital businesses.</h2>
            </div>
            <div className="pricing-summary">
              <p>We focus on value, not just low prices.</p>
            </div>
          </div>

          <div className="pricing-layout">
            <div className="pricing-card pricing-card-blue">
              <div className="pricing-card-header">
                <div className="pricing-icon"><Code2 size={18} /></div>
                <h3>1. Website Development</h3>
              </div>
              <p>Get a fast, responsive and professional website for your business or organization.</p>
              <div className="price-grid">
                <div><strong>Starter</strong><span>150,000 – 250,000 RWF</span></div>
                <div><strong>Business</strong><span>300,000 – 500,000 RWF</span></div>
                <div><strong>Professional</strong><span>600,000 – 1,200,000 RWF</span></div>
                <div><strong>E-Commerce</strong><span>800,000 – 2,000,000+ RWF</span></div>
              </div>
              <ul>
                <li>1–5 page website</li>
                <li>Responsive design</li>
                <li>Contact form</li>
                <li>Basic SEO</li>
                <li>WhatsApp integration</li>
              </ul>
            </div>

            <div className="pricing-card pricing-card-purple">
              <div className="pricing-card-header">
                <div className="pricing-icon"><Palette size={18} /></div>
                <h3>2. Graphic Design & Branding</h3>
              </div>
              <p>Make your brand stand out with creative and professional designs.</p>
              <div className="price-grid compact-grid">
                <div><strong>Logo design</strong><span>30,000 – 80,000 RWF</span></div>
                <div><strong>Business card</strong><span>15,000 – 30,000 RWF</span></div>
                <div><strong>Social media post</strong><span>10,000 – 25,000 RWF</span></div>
                <div><strong>Flyer / poster</strong><span>15,000 – 40,000 RWF</span></div>
                <div><strong>Company profile</strong><span>50,000 – 150,000 RWF</span></div>
                <div><strong>Brand identity</strong><span>150,000 – 400,000 RWF</span></div>
              </div>
            </div>

            <div className="pricing-card pricing-card-green">
              <div className="pricing-card-header">
                <div className="pricing-icon"><MessageCircle size={18} /></div>
                <h3>3. Social Media Management</h3>
              </div>
              <p>Engage your audience, build your brand and increase your online presence.</p>
              <div className="price-grid compact-grid">
                <div><strong>Starter</strong><span>100,000 RWF</span></div>
                <div><strong>Business</strong><span>200,000 RWF</span></div>
                <div><strong>Growth</strong><span>350,000 – 500,000 RWF</span></div>
              </div>
              <ul>
                <li>8–10 posts</li>
                <li>Content calendar</li>
                <li>Facebook & Instagram management</li>
                <li>Monthly reporting</li>
              </ul>
            </div>

            <div className="pricing-card pricing-card-orange">
              <div className="pricing-card-header">
                <div className="pricing-icon"><Code2 size={18} /></div>
                <h3>4. Software & Custom Systems</h3>
              </div>
              <p>Power your business with custom software and automation solutions.</p>
              <div className="price-grid compact-grid">
                <div><strong>Simple system</strong><span>500,000 RWF</span></div>
                <div><strong>School system</strong><span>1,000,000+ RWF</span></div>
                <div><strong>Inventory/POS</strong><span>800,000+ RWF</span></div>
                <div><strong>Booking system</strong><span>700,000 RWF</span></div>
                <div><strong>Business platform</strong><span>1,500,000 – 5,000,000 RWF</span></div>
                <div><strong>AI app</strong><span>2,000,000+ RWF</span></div>
              </div>
            </div>
          </div>

          <div className="maintenance-wrap">
            <div className="maintenance-card">
              <div className="pricing-card-header">
                <div className="pricing-icon"><Wrench size={18} /></div>
                <h3>5. Monthly Maintenance</h3>
              </div>
              <div className="maintenance-grid">
                <div><strong>Basic</strong><span>50,000 RWF/month</span><ul><li>Updates</li><li>Backups</li><li>Minor fixes</li></ul></div>
                <div><strong>Business</strong><span>100,000 RWF/month</span><ul><li>Updates</li><li>Backups</li><li>Security checks</li></ul></div>
                <div><strong>Premium</strong><span>200,000 RWF/month</span><ul><li>Priority support</li><li>Security</li><li>Monitoring</li></ul></div>
              </div>
            </div>

            <div className="pricing-approach">
              <h3>Our Pricing Approach</h3>
              <div className="approach-pills">
                <span>40% Project start</span>
                <span>30% Development milestone</span>
                <span>30% Final delivery</span>
              </div>
              <p>This ensures fairness, transparency and security for both you and Codemind.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-block why-us-block">
        <div className="container why-banner">
          <h2>Why Choose CodeMind?</h2>
          <div className="why-grid">
            <div className="why-item">
              <Code2 size={22} />
              <span>Skilled &amp; experienced team</span>
            </div>
            <div className="why-item">
              <Target size={22} />
              <span>Custom solutions for your needs</span>
            </div>
            <div className="why-item">
              <ShieldCheck size={22} />
              <span>Affordable &amp; transparent pricing</span>
            </div>
            <div className="why-item">
              <Rocket size={22} />
              <span>Ongoing support &amp; maintenance</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-block cta-block">
        <div className="container cta-shell">
          <div>
            <span className="eyebrow">Let’s build together</span>
            <h2>Need a digital solution that moves your business forward?</h2>
          </div>
          <Link to="/contact" className="primary-button">
            Start a Project
          </Link>
        </div>
      </section>
    </>
  )
}

function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Why CodeMind?"
        title="Technology should help good ideas become real solutions."
        description="CodeMind was born from a simple belief: technology should not only be something we use, but something we create to solve real problems."
        image={projects[2].image}
      />

      <section className="section-block">
        <div className="container split-layout">
          <div className="story-copy">
            <span className="eyebrow">The beginning</span>
            <h2>More than software. A way to move ideas forward.</h2>
            <p>
              I started CodeMind because I want to build more than software. I want to build solutions that make
              businesses better, help people work smarter, and turn ideas into something real.
            </p>
            <p>
              Many great ideas never become reality because people do not know how to transform them into technology.
              That is where CodeMind comes in.
            </p>
          </div>
          <div className="feature-panel">
            <div className="feature-row">
              <MessageCircle size={20} />
              <span>We listen to problems.</span>
            </div>
            <div className="feature-row">
              <Target size={20} />
              <span>We understand ideas.</span>
            </div>
            <div className="feature-row">
              <Palette size={20} />
              <span>We design solutions.</span>
            </div>
            <div className="feature-row">
              <Code2 size={20} />
              <span>We build technology.</span>
            </div>
            <div className="feature-row">
              <Rocket size={20} />
              <span>We create impact.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-block alt">
        <div className="container story-grid">
          <div className="mini-story story-card-accent">
            <span className="eyebrow">My promise</span>
            <h3>I will build CodeMind with purpose, discipline, and courage.</h3>
            <p>
              Every project will be an opportunity to learn. Every client will be an opportunity to serve. Every failure
              will be an opportunity to improve. Every success will be a reason to grow further.
            </p>
          </div>
          <div className="promise-list" aria-label="CodeMind values">
            {['Integrity', 'Creativity', 'Consistency', 'Learning', 'Excellence', 'Courage'].map((value, index) => (
              <div key={value} className="promise-item">
                <span>0{index + 1}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="container vision-panel">
          <div>
            <span className="eyebrow">The bigger vision</span>
            <h2>From one person with an idea to a trusted technology brand.</h2>
          </div>
          <p>
            My vision is to grow CodeMind from a small idea into a trusted digital agency serving businesses,
            organizations, startups, and individuals locally and internationally. I do not want CodeMind to be known
            simply as a company that builds websites. I want it to be known as the technology partner people trust
            when they have a problem worth solving.
          </p>
        </div>
      </section>

      <section className="section-block">
        <div className="container">
          <div className="section-heading center">
            <span className="eyebrow">Our values</span>
            <h2>Principles that guide every project.</h2>
          </div>
          <div className="cards-grid values-grid">
            {[
              'Innovation',
              'Integrity',
              'Excellence',
              'Collaboration',
              'Customer Focus',
              'Continuous Learning',
            ].map((value) => (
              <div key={value} className="info-card value-card">
                <CheckCircle2 size={20} />
                <h3>{value}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block alt">
        <div className="container">
          <div className="section-heading center">
            <span className="eyebrow">Why CodeMind?</span>
            <h2>We combine business understanding with technical execution.</h2>
          </div>
          <div className="cards-grid reasons-grid">
            {[
              'We understand business problems and design practical solutions around them.',
              'We combine technology and creativity to deliver better experiences.',
              'We build scalable systems with room for growth and improvement.',
              'We focus on user experience and digital clarity.',
              'We provide ongoing support as products evolve.',
              'We are committed to quality at every stage of delivery.',
            ].map((reason, index) => (
              <div key={reason} className="info-card reason-card">
                <span className="reason-number">0{index + 1}</span>
                <p>{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Solutions designed around business needs and user experience."
        description="CodeMind offers a thoughtful mix of design, development, automation, and product support services for teams that want meaningful digital outcomes."
        image={projects[1].image}
      />

      <section className="section-block">
        <div className="container">
          <div className="cards-grid services-grid detailed-grid">
            {services.map((service) => {
              const Icon = iconMap[service.icon] ?? Code2
              return (
                <article key={service.title} className="detail-card service-detail-card">
                  <div className="card-icon">
                    <Icon size={24} />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <div className="detail-list">
                    <div>
                      <strong>Problems it solves</strong>
                      <ul>
                        {service.problems.map((problem) => (
                          <li key={problem}>{problem}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <strong>Features</strong>
                      <ul>
                        {service.features.map((feature) => (
                          <li key={feature}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <strong>Technologies</strong>
                      <div className="tags compact-tags">
                        {service.technologies.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <strong>Approach</strong>
                      <p>{service.approach}</p>
                    </div>
                  </div>
                  <Link to="/contact" className="primary-button small-button">
                    Book a consultation
                  </Link>
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}

function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Digital products built with purpose."
        description="Sample portfolio work that reflects the kind of digital solutions CodeMind can help design, build, and improve."
        image={projects[0].image}
      />

      <section className="section-block">
        <div className="container">
          <div className="cards-grid project-grid large-grid">
            {projects.map((project) => (
              <article key={project.slug} className="project-card">
                <div className="project-thumb" style={{ backgroundImage: `url(${project.image})` }} />
                <div className="project-body">
                  <span className="project-category">{project.category}</span>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <div className="tags">
                    {project.technology.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <Link to={`/projects/${project.slug}`} className="text-link">
                    View Project <ArrowUpRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function ProjectDetailsPage() {
  const { slug } = useParams()
  const project = projects.find((item) => item.slug === slug) ?? projects[0]

  return (
    <>
      <section className="project-hero" style={{ backgroundImage: `linear-gradient(rgba(11, 16, 31, 0.5), rgba(11, 16, 31, 0.7)), url(${project.image})` }}>
        <div className="container project-hero-inner">
          <span className="eyebrow alt-light">{project.category}</span>
          <h1>{project.name}</h1>
          <p>{project.description}</p>
        </div>
      </section>

      <section className="section-block">
        <div className="container project-detail-layout">
          <div className="detail-page-section">
            <span className="eyebrow">Overview</span>
            <h2>Project overview</h2>
            <p>{project.overview}</p>
          </div>
          <div className="detail-page-section">
            <span className="eyebrow">Problem</span>
            <h2>What needed to change</h2>
            <p>{project.problem}</p>
          </div>
          <div className="detail-page-section">
            <span className="eyebrow">Solution</span>
            <h2>How we addressed it</h2>
            <p>{project.solution}</p>
          </div>
          <div className="detail-page-section">
            <span className="eyebrow">Key features</span>
            <ul className="feature-bullets">
              {project.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
          <div className="detail-page-section">
            <span className="eyebrow">Technologies</span>
            <div className="tags">
              {project.technology.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
          <div className="detail-page-section">
            <span className="eyebrow">Development process</span>
            <div className="step-list">
              {project.process.map((step, index) => (
                <div key={step} className="step-item">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="detail-page-section">
            <span className="eyebrow">Results</span>
            <p>{project.results}</p>
          </div>
          <div className="detail-page-section">
            <span className="eyebrow">Challenges</span>
            <p>{project.challenges}</p>
          </div>
          <div className="detail-page-section">
            <span className="eyebrow">Lessons learned</span>
            <p>{project.lessons}</p>
          </div>
          <div className="cta-box">
            <h3>Have a similar challenge?</h3>
            <Link to="/contact" className="primary-button">
              Let’s Build It
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

function ProcessPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our process"
        title="From Idea to Impact."
        description="A clear, collaborative process that keeps projects focused, realistic, and aligned to business outcomes."
        image={projects[2].image}
      />

      <section className="section-block">
        <div className="container">
          <div className="process-grid">
            {processSteps.map((step, index) => (
              <div key={step.title} className="process-card">
                <span className="process-number">{String(index + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function TestimonialsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Testimonials"
        title="What clients say about working with CodeMind."
        description="Sample feedback is shared here to illustrate how the brand and service story can be presented while future client reviews are added."
        image={projects[3].image}
      />

      <section className="section-block">
        <div className="container">
          <div className="cards-grid testimonial-grid detailed">
            {testimonials.map((item) => (
              <article key={item.name} className="info-card testimonial-card detailed">
                <div className="rating-row" aria-label={`${item.rating} out of 5 stars`}>
                  {Array.from({ length: item.rating }, (_, index) => (
                    <Star key={`${item.name}-${index}`} size={17} fill="currentColor" />
                  ))}
                </div>
                <p className="quote">“{item.quote}”</p>
                <div className="person-box">
                  <div className="avatar">{item.name.charAt(0)}</div>
                  <div>
                    <strong>{item.name}</strong>
                    <span>
                      {item.role} · {item.company}
                    </span>
                  </div>
                </div>
                <span className="project-chip">{item.project}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ReviewForm />
    </>
  )
}

function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Insights"
        title="Thoughtful ideas for technology, growth, and digital transformation."
        description="Sample blog content designed to demonstrate expertise and support search visibility while future articles are added."
        image={blogPosts[0].image}
      />

      <section className="section-block">
        <div className="container">
          <div className="cards-grid blog-grid">
            {blogPosts.map((post) => (
              <article key={post.slug} className="blog-card">
                <div className="blog-image" style={{ backgroundImage: `url(${post.image})` }} />
                <div className="blog-body">
                  <span className="blog-category">{post.category}</span>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <div className="blog-meta">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <Link to={`/blog/${post.slug}`} className="text-link">
                    Read Article <ChevronRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function BlogArticlePage() {
  const { slug } = useParams()
  const article = blogPosts.find((post) => post.slug === slug) ?? blogPosts[0]

  return (
    <>
      <header className="article-header" style={{ backgroundImage: `linear-gradient(rgba(11, 16, 31, 0.55), rgba(11, 16, 31, 0.7)), url(${article.image})` }}>
        <div className="container article-header-inner">
          <span className="eyebrow alt-light">{article.category}</span>
          <h1>{article.title}</h1>
          <div className="blog-meta article-meta">
            <span>{article.date}</span>
            <span>{article.readTime}</span>
          </div>
        </div>
      </header>

      <section className="section-block article-section">
        <div className="container article-content">
          <p>
            Sample content for this article is included to show the structure and style of the blog experience.
            This section is easy to replace with real insights, case studies, or thought leadership articles as your content grows.
          </p>
          <p>
            Successful digital products are not built by chasing every feature available. They are shaped by understanding the real problem,
            identifying what users need most, and aligning technical decisions with business goals. This is the foundation of strong product work.
          </p>
          <h3>Why this matters</h3>
          <p>
            Teams move faster when they clarify scope, prioritize meaningful outcomes, and design around usability. Technical performance, interface
            quality, and strategic clarity all reinforce each other.
          </p>
          <h3>What to keep in mind</h3>
          <p>
            Whether you are improving a website, building a system, or launching a product, the same principles apply: define the user
            journey clearly, reduce friction, and plan for growth from the beginning.
          </p>
        </div>
      </section>
    </>
  )
}

function ContactPage() {
  return (
    <>
      <section className="contact-page-section">
        <div className="container contact-workspace">
          <div className="contact-form-column">
            <ProjectInquiryForm />
            <div className="contact-details-row">
              <span><Mail size={16} /> {siteConfig.contact.email}</span>
              <span><Phone size={16} /> {siteConfig.contact.phone}</span>
            </div>
          </div>

          <aside className="contact-map-panel" aria-label={`CodeMind location in ${siteConfig.contact.location}`}>
            <div className="map-grid-lines" />
            <div className="map-road map-road-one" />
            <div className="map-road map-road-two" />
            <div className="map-road map-road-three" />
            <div className="map-label map-label-one">Kigali City</div>
            <div className="map-label map-label-two">Kicukiro</div>
            <div className="map-label map-label-three">Nyarugenge</div>
            <div className="map-pin"><MapPin size={20} /></div>
            <div className="map-location-card">
              <strong>CodeMind Digital Agency</strong>
              <span>{siteConfig.contact.location}</span>
            </div>
            <div className="map-caption">
              <MapPin size={16} />
              <span>Find us in Kigali</span>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}

function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <>
      <PageHeader
        eyebrow="FAQ"
        title="Frequently asked questions."
        description="A quick guide to common questions about project scope, timing, pricing, and working with CodeMind."
        image={projects[4 % projects.length].image}
      />

      <section className="section-block">
        <div className="container faq-wrap">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <div key={item.question} className={`faq-item ${isOpen ? 'open' : ''}`}>
                <button type="button" onClick={() => setOpenIndex(isOpen ? null : index)}>
                  <span>{item.question}</span>
                  <ChevronDown size={18} />
                </button>
                {isOpen && <p>{item.answer}</p>}
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}

function PageHeader({ eyebrow, title, description, image }: { eyebrow: string; title: string; description: string; image: string }) {
  return (
    <section
      className="page-header"
      style={{ backgroundImage: `linear-gradient(110deg, rgba(4, 15, 31, 0.92), rgba(7, 38, 78, 0.72)), url(${image})` }}
    >
      <div className="container page-header-inner">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  )
}

function ReviewForm() {
  type ReviewFormState = {
    fullName: string
    email: string
    company: string
    role: string
    project: string
    rating: string
    testimonial: string
    consent: boolean
  }

  const initialState: ReviewFormState = {
    fullName: '',
    email: '',
    company: '',
    role: '',
    project: '',
    rating: '5',
    testimonial: '',
    consent: false,
  }

  const [form, setForm] = useState(initialState)
  const [errors, setErrors] = useState<Partial<Record<keyof ReviewFormState, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState('')

  const validate = () => {
    const nextErrors: Partial<Record<keyof ReviewFormState, string>> = {}
    if (!form.fullName.trim()) nextErrors.fullName = 'Full name is required.'
    if (!form.email.trim()) nextErrors.email = 'Email is required.'
    if (!form.project.trim()) nextErrors.project = 'Project or service is required.'
    if (!form.testimonial.trim()) nextErrors.testimonial = 'Please share your experience.'
    if (!form.consent) nextErrors.consent = 'Consent is required before submission.'
    return nextErrors
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setSuccess('')
      return
    }

    setIsSubmitting(true)
    window.setTimeout(() => {
      setIsSubmitting(false)
      setSuccess('Thank you for sharing your experience. Your review has been captured and will be moderated before publication.')
      setForm(initialState)
    }, 700)
  }

  return (
    <section className="section-block alt">
      <div className="container review-panel">
        <div className="section-heading left">
          <span className="eyebrow">Share your experience</span>
          <h2>Tell Us About Your Experience</h2>
        </div>
        <form className="contact-form review-form" onSubmit={handleSubmit} noValidate>
          <div className="form-grid">
            <label>
              <span>Full Name</span>
              <input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
              {errors.fullName && <small>{errors.fullName}</small>}
            </label>
            <label>
              <span>Email</span>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              {errors.email && <small>{errors.email}</small>}
            </label>
            <label>
              <span>Company</span>
              <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
            </label>
            <label>
              <span>Role</span>
              <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
            </label>
            <label>
              <span>Project / Service</span>
              <input value={form.project} onChange={(e) => setForm({ ...form, project: e.target.value })} />
              {errors.project && <small>{errors.project}</small>}
            </label>
            <label>
              <span>Rating</span>
              <select value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })}>
                <option value="5">5 stars</option>
                <option value="4">4 stars</option>
                <option value="3">3 stars</option>
                <option value="2">2 stars</option>
                <option value="1">1 star</option>
              </select>
            </label>
          </div>

          <label>
            <span>Testimonial</span>
            <textarea rows={5} value={form.testimonial} onChange={(e) => setForm({ ...form, testimonial: e.target.value })} />
            {errors.testimonial && <small>{errors.testimonial}</small>}
          </label>

          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(e) => setForm({ ...form, consent: e.target.checked })}
            />
            <span>I consent to sharing this feedback for review and potential publication.</span>
          </label>
          {errors.consent && <small>{errors.consent}</small>}

          <button type="submit" className="primary-button" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
          {success && <div className="success-box">{success}</div>}
        </form>
      </div>
    </section>
  )
}

function ProjectInquiryForm() {
  type InquiryFormState = {
    fullName: string
    email: string
    phone: string
    company: string
    projectType: string
    budget: string
    description: string
    timeline: string
    source: string
  }

  const initialState: InquiryFormState = {
    fullName: '',
    email: '',
    phone: '',
    company: '',
    projectType: 'Website',
    budget: 'Under $2,000',
    description: '',
    timeline: '1-3 months',
    source: 'Website',
  }

  const [form, setForm] = useState(initialState)
  const [errors, setErrors] = useState<Partial<Record<keyof InquiryFormState, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState('')

  const validate = () => {
    const nextErrors: Partial<Record<keyof InquiryFormState, string>> = {}
    if (!form.fullName.trim()) nextErrors.fullName = 'Full name is required.'
    if (!form.email.trim()) nextErrors.email = 'Email is required.'
    if (!form.company.trim()) nextErrors.company = 'Company name is required.'
    if (!form.description.trim()) nextErrors.description = 'Project description is required.'
    return nextErrors
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setSuccess('')
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const result = (await response.json()) as { error?: string }
      if (!response.ok) {
        throw new Error(result.error ?? 'Unable to send your inquiry.')
      }

      setSuccess('Thank you for reaching out. We\'ve received your project inquiry and will get back to you soon.')
      setErrors({})
      setForm(initialState)
    } catch (error) {
      setSuccess(error instanceof Error ? error.message : 'Unable to send your inquiry right now.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="contact-form-wrap">
      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <div className="form-intro">
          <div>
            <span className="form-kicker">Start a conversation</span>
            <h2>Tell us about your project</h2>
            <p>Answer a few quick questions and we will help shape the best next step.</p>
          </div>
          <div className="form-step-badge">01 <span>/ 01</span></div>
        </div>

          <div className="contact-trust-row" aria-label="Why contact CodeMind">
            <span><CheckCircle2 size={15} /> Clear next steps</span>
            <span><CheckCircle2 size={15} /> Practical advice</span>
            <span><CheckCircle2 size={15} /> Quick response</span>
          </div>

        <div className="form-progress" aria-hidden="true">
          <span />
        </div>

        <div className="form-grid">
          <label className="form-field">
            <span>Name <em>Required</em></span>
            <input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
            {errors.fullName && <small>{errors.fullName}</small>}
          </label>
          <label className="form-field">
            <span>Email <em>Required</em></span>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            {errors.email && <small>{errors.email}</small>}
          </label>
          <label className="form-field">
            <span>Phone</span>
            <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </label>
          <label className="form-field">
            <span>Company <em>Required</em></span>
            <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
            {errors.company && <small>{errors.company}</small>}
          </label>
          <label className="form-field">
            <span>Project Type</span>
            <select value={form.projectType} onChange={(e) => setForm({ ...form, projectType: e.target.value })}>
              <option>Website</option>
              <option>Software System</option>
              <option>Mobile App</option>
              <option>UI/UX Design</option>
              <option>Business System</option>
              <option>E-Commerce</option>
              <option>Maintenance</option>
            </select>
          </label>
          <label className="form-field">
            <span>Budget Range</span>
            <select value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })}>
              <option>Under $2,000</option>
              <option>$2,000 - $5,000</option>
              <option>$5,000 - $10,000</option>
              <option>$10,000 - $20,000</option>
              <option>$20,000+</option>
            </select>
          </label>
          <label className="form-field">
            <span>Preferred Timeline</span>
            <select value={form.timeline} onChange={(e) => setForm({ ...form, timeline: e.target.value })}>
              <option>1-3 months</option>
              <option>3-6 months</option>
              <option>6+ months</option>
            </select>
          </label>
          <label className="form-field">
            <span>How did you hear about us?</span>
            <select value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })}>
              <option>Website</option>
              <option>Referral</option>
              <option>LinkedIn</option>
              <option>GitHub</option>
              <option>Social media</option>
              <option>Other</option>
            </select>
          </label>
        </div>

        <label className="form-field form-description-field">
          <span>Project description <em>Required</em></span>
          <textarea
            rows={5}
            maxLength={600}
            placeholder="What would you like to build, improve, or solve?"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <div className="description-meta">
            <small>{errors.description ? '' : 'A few sentences are enough to get started.'}</small>
            <span>{form.description.length}/600</span>
          </div>
          {errors.description && <small>{errors.description}</small>}
        </label>

        <div className="form-submit-row">
          <p>We usually respond within one business day.</p>
          <button type="submit" className="primary-button form-submit-button" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Project Inquiry'}
            {!isSubmitting && <ArrowRight size={17} />}
          </button>
        </div>
        {success && <div className="success-box">{success}</div>}
      </form>
    </div>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <div className="logo footer-logo">
            <img src="/c.png" alt="CodeMind Digital Agency Ltd" className="footer-logo-image" />
          </div>
          <p>Turning ideas into digital solutions.</p>
        </div>
        <div>
          <h3>Company</h3>
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/projects">Projects</Link></li>
          </ul>
        </div>
        <div>
          <h3>Resources</h3>
          <ul>
            <li><Link to="/process">Process</Link></li>
            <li><Link to="/testimonials">Testimonials</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h3>Connect</h3>
          <ul>
            <li><a href={`mailto:${siteConfig.contact.email}`}>Email</a></li>
            <li><a href={siteConfig.contact.whatsapp}>WhatsApp</a></li>
            <li><a href={siteConfig.contact.linkedin}>LinkedIn</a></li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 {siteConfig.companyName}. Sample content for design and demo purposes.</span>
      </div>
    </footer>
  )
}

function WhatsAppFloat() {
  return (
    <a
      href={siteConfig.contact.whatsapp}
      className="whatsapp-float"
      aria-label="Chat on WhatsApp"
      target="_blank"
      rel="noreferrer"
    >
      <MessageCircle size={22} />
    </a>
  )
}

export default App
