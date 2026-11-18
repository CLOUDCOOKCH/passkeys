import { useEffect, useRef, useState } from 'react'
import { Globe2, Menu, X } from 'lucide-react'
import { home, type Lang } from '../i18n/home'
import { Brand } from './Brand'

const targets = ['paths', 'how', 'setup', 'playground', 'faq']
const navGroup: Record<string, string> = {
  paths: 'paths',
  compare: 'paths',
  how: 'how',
  options: 'setup',
  wizard: 'setup',
  setup: 'setup',
  recovery: 'paths',
  business: 'paths',
  playground: 'playground',
  quiz: 'playground',
  faq: 'faq',
}

function readingLocation(navigating: boolean) {
  const readingLine = Math.min(220, window.innerHeight / 3)
  const sections = document.querySelectorAll<HTMLElement>(
    'main > section[id], main > div > section[id]',
  )
  let current = ''
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= readingLine) current = section.id
  }

  // Keep a specific tutorial or disclosure when it is still in view. Browser
  // history can change through replaceState without firing a hashchange event.
  const hash = window.location.hash
  const element = hash && document.getElementById(hash.slice(1))
  if (element) {
    const bounds = element.getBoundingClientRect()
    if (navigating || (bounds.top < innerHeight && bounds.bottom > 75)) {
      return { current, hash }
    }
  }
  return { current, hash: current ? '#' + current : '' }
}

export function Header({ lang }: { lang: Lang }) {
  const t = home[lang]
  const [open, setOpen] = useState(false)
  const [hash, setHash] = useState(window.location.hash)
  const [active, setActive] = useState('')
  const navigating = useRef(Boolean(window.location.hash))
  const toggle = useRef<HTMLButtonElement>(null)
  const otherLocale = import.meta.env.BASE_URL + (lang === 'de' ? 'en/' : '')
  useEffect(() => {
    let frame = 0
    const read = () => {
      frame = 0
      const location = readingLocation(navigating.current)
      setHash(location.hash)
      setActive(navGroup[location.current] || '')
    }
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(read)
    }
    const settled = () => {
      navigating.current = false
      scroll()
    }
    const change = () => {
      navigating.current = Boolean(window.location.hash)
      setHash(window.location.hash)
      setOpen(false)
      scroll()
    }
    const key = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        setOpen(false)
        toggle.current?.focus()
      }
    }
    read()
    window.addEventListener('scrollend', settled)
    window.addEventListener('hashchange', change)
    window.addEventListener('scroll', scroll, { passive: true })
    window.addEventListener('keydown', key)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scrollend', settled)
      window.removeEventListener('hashchange', change)
      window.removeEventListener('scroll', scroll)
      window.removeEventListener('keydown', key)
    }
  }, [open])
  return (
    <header className="site-header">
      <div className="header-inner">
        <a href="#top" className="brand-link" aria-label="Passkeys" onClick={() => setOpen(false)}>
          <Brand />
        </a>
        <nav
          aria-label={t.primaryNav}
          id="site-nav"
          className={'primary-nav' + (open ? ' nav-visible' : '')}
        >
          {targets.map((id, i) => (
            <a
              key={id}
              href={'#' + id}
              aria-current={active === id ? 'location' : undefined}
              onClick={() => setOpen(false)}
            >
              {t.nav[i]}
            </a>
          ))}
        </nav>
        <a
          className="language-link"
          href={otherLocale + hash}
          onClick={(event) => {
            event.currentTarget.href = otherLocale + readingLocation(navigating.current).hash
          }}
          hrefLang={lang === 'de' ? 'en' : 'de-CH'}
          aria-label={t.language}
        >
          <Globe2 size={16} />
          <span>{lang === 'de' ? 'EN' : 'DE'}</span>
        </a>
        <button
          className="mobile-toggle"
          ref={toggle}
          type="button"
          aria-expanded={open}
          aria-controls="site-nav"
          aria-label={open ? t.close : t.menu}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  )
}
