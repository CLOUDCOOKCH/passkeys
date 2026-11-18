import { useEffect, useState } from 'react'
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  CirclePlay,
  Play,
  RotateCcw,
  Fingerprint,
} from 'lucide-react'
import { LazyMotion, MotionConfig } from 'motion/react'
import * as m from 'motion/react-m'
import { Header } from './components/Header'
import { Brand } from './components/Brand'
import { HeroScene } from './components/illustrations/HeroScene'
import { PathArt } from './components/illustrations/PathArt'
import { PosterLibrary } from './sections/PosterLibrary'
import { Discover } from './sections/Discover'
import { Playground } from './sections/Playground'
import { Options } from './sections/Options'
import { Business, Quiz, Recovery, Resources } from './sections/Resources'
import { home, type Lang } from './i18n/home'

const loadMotionFeatures = () =>
  import('./components/motionFeatures').then((module) => module.default)
const paths = ['compare', 'business', 'how-technical']
const kinds = ['everyday', 'business', 'technical'] as const
const footTargets = ['setup', 'recovery', 'business', 'quiz', 'faq', 'library']
function Welcome({ lang }: { lang: Lang }) {
  const t = home[lang]
  const [step, setStep] = useState(0)
  return (
    <>
      <section className="hero wrap" aria-labelledby="hero-title">
        <div className="hero-copy">
          <h1 id="hero-title">
            {t.title[0]}
            <br />
            {t.title[1]}
            <br />
            <em>{t.title[2]}</em>
          </h1>
          <p>{t.intro}</p>
          <div className="hero-actions">
            <a className="action-primary" href="#paths">
              {t.start}
              <ArrowDown size={17} />
            </a>
            <a className="action-secondary" href="#playground">
              <CirclePlay size={19} />
              {t.play}
            </a>
          </div>
        </div>
        <figure className="hero-art" aria-label={t.fig}>
          <HeroScene phase={(['idle', 'confirm', 'verified'] as const)[step]} />
          <figcaption>
            <div className="scene-caption">
              <span className="scene-caption-label">{t.simulation}</span>
              <span aria-live="polite">{t.status[step]}</span>
            </div>
            <button className="scene-control" onClick={() => setStep((step + 1) % 3)}>
              {step === 0 ? (
                <Play size={13} />
              ) : step === 1 ? (
                <Fingerprint size={15} />
              ) : (
                <RotateCcw size={14} />
              )}
              {[t.simulate, t.next, t.replay][step]}
            </button>
          </figcaption>
        </figure>
      </section>
      <section id="paths" className="paths-section" aria-labelledby="paths-title">
        <div className="wrap">
          <h2 className="paths-heading" id="paths-title">{t.paths}</h2>
          <LazyMotion features={loadMotionFeatures} strict>
            <div className="path-grid">
              {t.cards.map(([audience, title, desc], i) => (
                <m.a
                  key={paths[i]}
                  className={'path-card path-' + kinds[i]}
                  href={'#' + paths[i]}
                  whileHover={{ y: -1 }}
                  transition={{ duration: 0.18 }}
                >
                  <PathArt kind={kinds[i]} />
                  <span className="path-audience">{audience}</span>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                  <span className="path-arrow">
                    <ArrowUpRight size={20} />
                  </span>
                </m.a>
              ))}
            </div>
          </LazyMotion>
        </div>
      </section>
    </>
  )
}

export function App({ lang }: { lang: Lang }) {
  const t = home[lang]
  useEffect(() => {
    function restoreTarget() {
      const target = document.getElementById(location.hash.slice(1))
      if (target) target.scrollIntoView({ behavior: 'instant' })
    }
    // Fragment navigation can precede the React mount on a static Pages visit.
    if (location.hash) {
      void document.fonts.ready.then(restoreTarget)
    }
  }, [])
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">
        {t.skip}
      </a>
      <div id="top" />
      <Header lang={lang} />
      <main id="main" tabIndex={-1}>
        <Welcome lang={lang} />
        <Discover lang={lang} />
        <Options lang={lang} />
        <Recovery lang={lang} />
        <Business lang={lang} />
        <Playground lang={lang} />
        <Quiz lang={lang} />
        <Resources lang={lang} />
        <PosterLibrary lang={lang} />
      </main>
      <footer className="site-footer">
        <div className="wrap footer-inner">
          <div>
            <a href="#top" className="brand-link">
              <Brand />
            </a>
            <p>{t.independent}</p>
          </div>
          <nav aria-label={t.footerNav}>
            {footTargets.map((target, i) => (
              <a key={target} href={'#' + target}>
                {t.footLinks[i]}
                <ArrowRight size={14} />
              </a>
            ))}
          </nav>
          <a className="back-top" href="#top">
            {t.top}
            <ArrowUp size={15} />
          </a>
        </div>
      </footer>
    </MotionConfig>
  )
}
