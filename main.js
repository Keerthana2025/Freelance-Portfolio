import './style.css'
import AOS from 'aos'
import { createIcons as lucideCreateIcons } from 'lucide'
import {
  profile, stats, skills, services, projects,
  process, testimonials, faqs,
} from './data.js'

/* ---------- Init ---------- */
AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 80 })
const refreshIcons = () => lucideCreateIcons()

/* ---------- Helpers ---------- */
const el = (sel) => document.querySelector(sel)
const setText = (sel, txt) => { const n = el(sel); if (n) n.textContent = txt }
const setHref = (sel, href) => { const n = el(sel); if (n) n.href = href }

const socialIcon = (name) => {
  const map = { github: 'github', linkedin: 'linkedin', dribbble: 'dribbble', twitter: 'twitter' }
  return map[name] || 'globe'
}

/* ---------- Hero / profile ---------- */
setText('#availability', profile.availability)
setText('#name', profile.name)
setText('#role', profile.role)
setText('#tagline', profile.tagline)
setText('#location', profile.location)
setText('#email-text', profile.email)
setText('#phone-text', profile.phone)
setHref('#email-link', `mailto:${profile.email}`)
setHref('#phone-link', `tel:${profile.phone.replace(/[^+\d]/g, '')}`)
el('#year').textContent = new Date().getFullYear()

const socialsWrap = el('#socials')
socialsWrap.innerHTML = profile.social.map((s) => `
  <a href="${s.url}" target="_blank" rel="noopener" aria-label="${s.name}"
     class="grid place-items-center w-10 h-10 rounded-full glass text-ink-300 hover:text-accent-300 hover:scale-110 transition-all">
    <i data-lucide="${socialIcon(s.icon)}" class="w-5 h-5"></i>
  </a>`).join('')

const footerSocials = el('#footer-socials')
footerSocials.innerHTML = profile.social.map((s) => `
  <a href="${s.url}" target="_blank" rel="noopener" aria-label="${s.name}" class="hover:text-accent-300 transition-colors">
    <i data-lucide="${socialIcon(s.icon)}" class="w-5 h-5"></i>
  </a>`).join('')

/* ---------- Stats ---------- */
el('#stats').innerHTML = stats.map((s, i) => `
  <div class="text-center" data-aos="fade-up" data-aos-delay="${i * 80}">
    <p class="font-display text-3xl sm:text-4xl font-bold text-gradient">${s.value}</p>
    <p class="text-sm text-ink-400 mt-1">${s.label}</p>
  </div>`).join('')

/* ---------- Services ---------- */
el('#services-grid').innerHTML = services.map((s, i) => `
  <article class="group relative rounded-2xl glass p-6 hover:border-accent-400/40 transition-all duration-300 hover:-translate-y-1"
           data-aos="fade-up" data-aos-delay="${(i % 3) * 100}">
    <div class="grid place-items-center w-12 h-12 rounded-xl bg-accent-500/15 text-accent-300 group-hover:bg-accent-500 group-hover:text-ink-950 transition-colors">
      <i data-lucide="${s.icon}" class="w-6 h-6"></i>
    </div>
    <h3 class="font-display font-semibold text-xl text-ink-50 mt-5">${s.title}</h3>
    <p class="text-ink-400 mt-2 leading-relaxed">${s.desc}</p>
    <ul class="mt-4 flex flex-wrap gap-2">
      ${s.points.map((p) => `<li class="inline-flex items-center gap-1.5 text-sm text-ink-300"><i data-lucide="check" class="w-3.5 h-3.5 text-accent-400"></i>${p}</li>`).join('')}
    </ul>
  </article>`).join('')

/* ---------- Projects + filter ---------- */
const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))]
const filterBar = el('#filter-bar')
filterBar.innerHTML = categories.map((c, i) => `
  <button data-filter="${c}" class="filter-btn rounded-full px-4 py-2 text-sm font-medium transition-colors ${i === 0 ? 'bg-accent-500 text-ink-950' : 'glass text-ink-300 hover:text-ink-50'}">${c}</button>`).join('')

const projectsGrid = el('#projects-grid')
const renderProjects = (filter) => {
  const list = filter === 'All' ? projects : projects.filter((p) => p.category === filter)
  projectsGrid.innerHTML = list.map((p, i) => `
    <article class="project-card group rounded-2xl glass overflow-hidden flex flex-col"
             data-aos="zoom-in" data-aos-delay="${(i % 3) * 100}">
      <div class="relative aspect-[16/10] overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br ${p.accent}"></div>
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_55%)]"></div>
        <div class="absolute inset-0 grid place-items-center text-white/90">
          <i data-lucide="folder-git-2" class="w-12 h-12 drop-shadow-lg group-hover:scale-110 transition-transform"></i>
        </div>
        <span class="absolute top-3 left-3 rounded-full bg-ink-950/70 backdrop-blur px-3 py-1 text-xs font-medium text-ink-100">${p.category}</span>
      </div>
      <div class="p-5 flex flex-col flex-1">
        <h3 class="font-display font-semibold text-lg text-ink-50">${p.title}</h3>
        <p class="text-ink-400 text-sm mt-2 leading-relaxed flex-1">${p.desc}</p>
        <div class="mt-4 flex flex-wrap gap-2">
          ${p.tags.map((t) => `<span class="rounded-md bg-ink-800/70 px-2 py-1 text-xs text-ink-300">${t}</span>`).join('')}
        </div>
        <a href="${p.link}" class="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent-300 hover:text-accent-200 transition-colors">
          View case study <i data-lucide="arrow-up-right" class="w-4 h-4"></i>
        </a>
      </div>
    </article>`).join('')
  refreshIcons()
}
renderProjects('All')

filterBar.addEventListener('click', (e) => {
  const btn = e.target.closest('.filter-btn')
  if (!btn) return
  filterBar.querySelectorAll('.filter-btn').forEach((b) => {
    b.classList.remove('bg-accent-500', 'text-ink-950')
    b.classList.add('glass', 'text-ink-300')
  })
  btn.classList.add('bg-accent-500', 'text-ink-950')
  btn.classList.remove('glass', 'text-ink-300')
  renderProjects(btn.dataset.filter)
})

/* ---------- Process ---------- */
el('#process-grid').innerHTML = process.map((p, i) => `
  <div class="relative rounded-2xl glass p-6" data-aos="fade-up" data-aos-delay="${i * 100}">
    <span class="font-display text-5xl font-bold text-ink-800 absolute top-4 right-5 select-none">${p.step}</span>
    <div class="grid place-items-center w-12 h-12 rounded-xl bg-accent-500/15 text-accent-300 relative">
      <i data-lucide="${p.icon}" class="w-6 h-6"></i>
    </div>
    <h3 class="font-display font-semibold text-lg text-ink-50 mt-4 relative">${p.title}</h3>
    <p class="text-ink-400 text-sm mt-2 leading-relaxed relative">${p.desc}</p>
  </div>`).join('')

/* ---------- Skills ---------- */
el('#skills-list').innerHTML = skills.map((s, i) => `
  <li data-aos="fade-left" data-aos-delay="${i * 80}">
    <div class="flex items-center justify-between mb-2">
      <span class="flex items-center gap-2 text-ink-200 font-medium"><i data-lucide="${s.icon}" class="w-4 h-4 text-accent-400"></i>${s.name}</span>
      <span class="text-sm text-ink-400">${s.level}%</span>
    </div>
    <div class="h-2 rounded-full bg-ink-800 overflow-hidden">
      <div class="skill-bar-fill h-full rounded-full bg-gradient-to-r from-accent-500 to-accent-300" data-level="${s.level}" style="width:0%"></div>
    </div>
  </li>`).join('')

/* ---------- Testimonials ---------- */
el('#testimonials-grid').innerHTML = testimonials.map((t, i) => `
  <figure class="rounded-2xl glass p-6 flex flex-col" data-aos="fade-up" data-aos-delay="${i * 100}">
    <div class="flex gap-1 text-gold-400 mb-4">
      ${'<i data-lucide="star" class="w-4 h-4 fill-current"></i>'.repeat(5)}
    </div>
    <blockquote class="text-ink-200 leading-relaxed flex-1">"${t.quote}"</blockquote>
    <figcaption class="mt-6 flex items-center gap-3">
      <span class="grid place-items-center w-11 h-11 rounded-full bg-accent-500/20 text-accent-300 font-display font-semibold">${t.initials}</span>
      <span>
        <span class="block text-ink-50 font-medium">${t.name}</span>
        <span class="block text-sm text-ink-400">${t.title}</span>
      </span>
    </figcaption>
  </figure>`).join('')

/* ---------- FAQ (accordion) ---------- */
const faqList = el('#faq-list')
faqList.innerHTML = faqs.map((f, i) => `
  <details class="group faq-item bg-ink-900/30" data-aos="fade-up" data-aos-delay="${i * 60}">
    <summary class="flex items-center justify-between gap-4 cursor-pointer px-5 py-4 list-none">
      <span class="font-medium text-ink-100">${f.q}</span>
      <i data-lucide="chevron-down" class="w-5 h-5 text-accent-400 transition-transform group-open:rotate-180"></i>
    </summary>
    <p class="px-5 pb-5 text-ink-400 leading-relaxed">${f.a}</p>
  </details>`).join('')

/* ---------- Contact form ---------- */
const form = el('#contact-form')
const status = el('#form-status')
form.addEventListener('submit', (e) => {
  e.preventDefault()
  const data = new FormData(form)
  if (!data.get('name') || !data.get('email') || !data.get('message')) {
    status.textContent = 'Please fill in all fields.'
    status.className = 'text-sm text-red-400'
    return
  }
  status.textContent = 'Thanks! I\'ll be in touch within one business day.'
  status.className = 'text-sm text-accent-300'
  form.reset()
  setTimeout(() => { status.textContent = '' }, 6000)
})

/* ---------- Navbar scroll state + active link + back-to-top ---------- */
const navbar = el('#navbar')
const toTop = el('#to-top')
const navLinks = document.querySelectorAll('.nav-link')
const sections = ['home', 'services', 'work', 'process', 'about', 'faq', 'contact']
  .map((id) => document.getElementById(id))

const onScroll = () => {
  const y = window.scrollY
  // navbar bg
  if (y > 30) {
    navbar.classList.add('glass', 'shadow-soft')
  } else {
    navbar.classList.remove('glass', 'shadow-soft')
  }
  // back to top
  if (y > 600) {
    toTop.classList.remove('opacity-0', 'pointer-events-none')
  } else {
    toTop.classList.add('opacity-0', 'pointer-events-none')
  }
  // active section
  const offset = y + 120
  let current = 'home'
  for (const sec of sections) {
    if (sec && sec.offsetTop <= offset) current = sec.id
  }
  navLinks.forEach((l) => {
    l.classList.toggle('active', l.getAttribute('href') === `#${current}`)
  })
}
window.addEventListener('scroll', onScroll, { passive: true })
onScroll()

toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }))

/* ---------- Mobile menu ---------- */
const menuBtn = el('#menu-btn')
const mobileMenu = el('#mobile-menu')
const toggleMenu = (open) => {
  mobileMenu.classList.toggle('hidden', !open)
  menuBtn.innerHTML = open
    ? '<i data-lucide="x" class="w-5 h-5"></i>'
    : '<i data-lucide="menu" class="w-5 h-5"></i>'
  refreshIcons()
}
menuBtn.addEventListener('click', () => toggleMenu(mobileMenu.classList.contains('hidden')))
mobileMenu.addEventListener('click', (e) => { if (e.target.closest('a')) toggleMenu(false) })

/* ---------- Skill bars: animate when visible ---------- */
const skillBars = document.querySelectorAll('.skill-bar-fill')
const skillObs = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (en.isIntersecting) {
      en.target.style.width = `${en.target.dataset.level}%`
      skillObs.unobserve(en.target)
    }
  })
}, { threshold: 0.4 })
skillBars.forEach((b) => skillObs.observe(b))

/* ---------- First paint icons ---------- */
refreshIcons()
