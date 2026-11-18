import { Download, SlidersHorizontal } from 'lucide-react'
import type { Lang } from '../i18n/home'
import './first-day-card.css'

export function FirstDayCard({ lang }: { lang: Lang }) {
  const de = lang === 'de'
  const path = import.meta.env.BASE_URL + 'handouts/m365-first-day-' + lang
  return (
    <aside className="first-day-card">
      <img src={path + '.png'} alt="" width="397" height="560" loading="lazy" />
      <div>
        <h3>{de ? 'Startkarte für Microsoft 365' : 'Microsoft 365 first-day card'}</h3>
        <p>{de
          ? 'Für die Schlüsselübergabe. Auf A6 beidseitig drucken und an der langen Kante wenden.'
          : 'An insert to hand out with each key. Print on A6, double-sided, flipping on the long edge.'}</p>
        <div className="first-day-links">
          <a href={path + '.pdf'} download>
            <Download size={16} aria-hidden="true" />
            {de ? 'Startkarte als PDF laden' : 'Download first-day PDF'}
          </a>
          <a href="#m365-card-builder">
            <SlidersHorizontal size={16} aria-hidden="true" />
            {de ? 'Startkarte anpassen' : 'Customise this card'}
          </a>
        </div>
      </div>
    </aside>
  )
}
