import { useId } from 'react'

/** The screen, keyboard and phone each use their own affine drawing plane. */
export function HeroScene({ phase }: { phase: 'idle' | 'password' | 'verified' }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '')
  const grid = 'grid' + id
  const verified = phase === 'verified'
  return (
    <svg
      className={'hero-scene scene-' + phase}
      viewBox="0 0 560 380"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern id={grid} width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r=".95" fill="#86b6a2" opacity=".53" />
        </pattern>
      </defs>
      <rect width="560" height="380" fill={'url(#' + grid + ')'} />
      <g fill="none" stroke="#90b8a4" strokeWidth="1.3" strokeDasharray="4 7">
        <path d="M48 191c-30 68 46 142 151 134s166-50 226-42 104-18 105-63" />
        <path d="M111 122c10-46 80-77 137-59s116 36 166 16" />
      </g>
      <g stroke="#1e3933" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
        {/* Laptop lid in perspective, with the hinge nearest the viewer */}
        <path fill="#7cafa3" d="M124 107q0-10 9-13l195-42q8-2 14 6l14 12-7 1 8 139-217 50-11-10Z" />
        <path
          fill="#b9dbcf"
          d="M131 106q-1-7 6-9l192-42q9-2 10 6l13 144q1 8-6 9l-194 46q-9 2-10-5Z"
        />
        <g transform="matrix(.97 -.211 .082 .935 140 109)">
          <rect width="197" height="143" rx="3" fill="#f3f8ec" />
          <path d="M0 19h197" fill="none" stroke="#94b6a8" strokeWidth="1" />
          <g stroke="none" fill="#77a795">
            <circle cx="9" cy="10" r="2.4" />
            <circle cx="18" cy="10" r="2.4" />
            <circle cx="27" cy="10" r="2.4" />
          </g>
          <g className="screen-account">
            <rect
              x="35"
              y="35"
              width="127"
              height="89"
              rx="8"
              fill="#fffdf5"
              stroke="#86a99a"
              strokeWidth="1.3"
            />
            <circle cx="98" cy="61" r="14" fill="#d4ebdb" stroke="none" />
            <circle cx="98" cy="57" r="4.3" fill="#426e60" stroke="none" />
            <path d="M90 68c1-8 15-8 16 0" fill="#426e60" stroke="none" />
            <rect
              x="58"
              y="85"
              width="80"
              height="22"
              rx="5"
              fill={verified ? '#b4dfb4' : '#e4ede3'}
              stroke="#adc4b7"
              strokeWidth="1"
            />
            {phase === 'password' ? (
              <g stroke="#376a54" fill="none">
                <circle cx="96" cy="94" r="3.6" />
                <path d="m98.5 96.5 6.5 6 .5-3 2-1" />
              </g>
            ) : verified ? (
              <path d="m91 95 5 5 10-10" fill="none" stroke="#1b684d" strokeWidth="3" />
            ) : (
              <g fill="#487568" stroke="none">
                {[75, 84, 93, 102, 111, 120].map((x) => (
                  <circle key={x} cx={x} cy="96" r="2" />
                ))}
              </g>
            )}
          </g>
        </g>
        {/* Deck folds out from the hinge. Parallel rows follow the deck axes. */}
        <path
          d="m143 260 210-48 76 36v8q0 4-6 6l-198 55q-6 2-13-1l-87-43q-6-3-6-8l1-5Z"
          fill="#80aa9e"
        />
        <path
          d="m145 253 205-46q4-1 9 1l68 36q6 3 0 6l-202 56q-6 1-12-2l-88-41q-6-3 1-5Z"
          fill="#d0e3d8"
        />
        <g
          transform="matrix(.92 -.219 1.08 .49 155 254)"
          strokeWidth="1.2"
          stroke="#668f80"
          fill="#a9cabc"
        >
          {[0, 1, 2, 3].map((row) => (
            <g key={row}>
              {Array.from({ length: 12 }, (_, col) => (
                <rect
                  key={col}
                  x={col * 15 + (row % 2) * 3}
                  y={row * 8}
                  width="12"
                  height="5.5"
                  rx="1.2"
                />
              ))}
            </g>
          ))}
          <rect x="54" y="38" width="63" height="16" rx="3" fill="#c3dacf" />
        </g>
        {/* A physical FIDO key in the foreground */}
        <g className="scene-key" transform="translate(66 235) rotate(-24)">
          <path d="M0 8q0-8 9-8h56l13 8v28L65 44H9q-9 0-9-9Z" fill="#ab8dcb" />
          <path d="M0 5q0-8 9-8h53q9 0 9 8v25q0 7-9 7H9q-9 0-9-8Z" fill="#cbb7ea" />
          <rect x="68" y="4" width="27" height="24" rx="2" fill="#e8e8df" />
          <path d="M72 22h18m-16-10h4m5 0h4" stroke="#667069" />
          <circle cx="15" cy="15" r="5" fill="#d8ebe1" />
          <rect
            x="36"
            y="6"
            width="18"
            height="18"
            rx="8"
            fill="#e9ddf7"
            stroke="#806b98"
            strokeWidth="1.4"
          />
        </g>
        {/* Phone floats in front, one local verification gesture */}
        <g className="scene-phone">
          <path
            d="m349 156 74-17q9-2 14 6l5 8 10 137q1 9-6 12l-74 21q-8 2-14-7l-4-7Z"
            fill="#3b665b"
          />
          <g transform="matrix(.98 -.235 .088 .995 344 157)">
            <rect width="90" height="154" rx="12" fill="#4a7468" />
            <rect x="4" y="4" width="82" height="146" rx="10" fill="#e4efdf" />
            <path d="M25 4h40l-2 5q-1 2-4 2H31q-3 0-4-2Z" fill="#35594e" stroke="none" />
            <circle
              cx="45"
              cy="75"
              r="29"
              fill={verified ? '#afe1ba' : '#c2ddcb'}
              stroke="#95bca5"
              strokeWidth="1.1"
            />
            {verified ? (
              <path d="m31 75 10 11 20-23" fill="none" strokeWidth="4" stroke="#226448" />
            ) : (
              <g fill="none" stroke="#326c56" strokeWidth="2.1">
                <path d="M29 72c1-18 30-22 33-2M28 78c6-5 2-17 17-18 12-1 14 7 14 16" />
                <path d="M30 85c8-7 3-20 15-20 13-1 5 14 12 19M35 89c7-8 3-18 9-19 5-1 3 4 4 10 1 6 4 9 6 10M41 92c3-6 3-11 3-15" />
              </g>
            )}
            <path d="M27 122h36m-28 6h19" stroke="#94b7a1" strokeWidth="3" />
            <path d="M33 145h24" stroke="#628270" strokeWidth="2" />
          </g>
        </g>
        <g className="scene-badge" transform="translate(378 82) rotate(9)">
          <path
            d="M0-28c9 5 17 6 25 8v17c0 15-13 26-25 32C-12 23-25 12-25-3v-17c8-2 16-3 25-8Z"
            fill="#f3d29b"
          />
          <path d="m-10-1 7 8L12-9" fill="none" strokeWidth="3.3" />
        </g>
        <g fill="#f7cb7e" strokeWidth="1.6">
          <path d="M97 121q0 12 12 14-12 0-14 13 0-11-11-14 12-2 13-13Z" />
          <path d="M476 194q1 8 9 10-8 0-10 9 0-8-8-9 8-2 9-10Z" />
        </g>
        <g stroke="#4e8a71" strokeWidth="1.4" fill="none">
          <path d="m100 298 1 7m-4-4 7 1M462 111v8m-4-4h8" />
        </g>
      </g>
    </svg>
  )
}
