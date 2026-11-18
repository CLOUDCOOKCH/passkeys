import { Download, Expand, Printer } from 'lucide-react'
import posters from '../content/posters.json'
import type { Lang } from '../i18n/home'
import './posters.css'

const copy = {
  de: {
    title: 'Posterbibliothek',
    intro:
      'Für die Bürowand, den Pausenraum oder den Gruppenchat. Drucke dein Lieblingsmotiv auf A4 oder teile es als Bild.',
    guide: 'Lernposter',
    meme: 'Meme',
    print: 'Drucken',
    format: 'A4 oder 1080 × 1350 px',
    preview: 'Grossansicht öffnen',
    pdf: 'PDF herunterladen',
    png: 'PNG herunterladen',
    newTab: 'Druckansicht in neuem Tab',
  },
  en: {
    title: 'Poster library',
    intro:
      'For the office wall, the break room or the group chat. Print your favourite on A4 or share it as an image.',
    guide: 'Learning poster',
    meme: 'Meme',
    print: 'Print',
    format: 'A4 or 1080 × 1350 px',
    preview: 'View full-size poster',
    pdf: 'Download PDF',
    png: 'Download PNG',
    newTab: 'Print view in a new tab',
  },
} as const

export function PosterLibrary({ lang }: { lang: Lang }) {
  const t = copy[lang]
  return (
    <section id="library" aria-labelledby="library-title" className="poster-library">
      <div className="wrap">
        <div className="library-intro">
          <h2 id="library-title">{t.title}</h2>
          <p>{t.intro}</p>
        </div>
        <div className="poster-catalogue">
          {posters.map((poster) => {
            const { title, description } = poster[lang]
            const path = import.meta.env.BASE_URL + 'posters/' + lang + '/' + poster.id
            return (
              <article
                key={poster.id}
                id={'poster-' + poster.id}
                className="poster-card"
                aria-labelledby={'label-' + poster.id}
              >
                <a
                  className={'poster-mount mount-' + poster.id}
                  href={path + '.png'}
                  target="_blank"
                  rel="noopener"
                  aria-label={t.preview + ' · ' + title}
                  aria-describedby={'description-' + poster.id}
                >
                  <img
                    id={'description-' + poster.id}
                    src={path + '.webp'}
                    alt={description}
                    width="480"
                    height="600"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="poster-preview-icon" aria-hidden="true">
                    <Expand size={16} />
                  </span>
                </a>
                <p className="poster-kind">{poster.kind === 'meme' ? t.meme : t.guide}</p>
                <h3 id={'label-' + poster.id}>{title}</h3>
                <div className="poster-formats">
                  <small>{t.format}</small>
                </div>
                <div className="poster-actions">
                  <a
                    href={path + '.pdf'}
                    download={'passkeys-' + poster.id + '-' + lang + '.pdf'}
                    aria-label={t.pdf + ' · ' + title}
                  >
                    <Download size={15} />
                    PDF
                  </a>
                  <a
                    href={path + '.png'}
                    download={'passkeys-' + poster.id + '-' + lang + '.png'}
                    aria-label={t.png + ' · ' + title}
                  >
                    <Download size={15} />
                    PNG
                  </a>
                  <a
                    className="poster-print"
                    href={path + '.html'}
                    target="_blank"
                    rel="noopener"
                    aria-label={t.print + ' · ' + title + ' (' + t.newTab + ')'}
                  >
                    <Printer size={15} />
                    {t.print}
                  </a>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
