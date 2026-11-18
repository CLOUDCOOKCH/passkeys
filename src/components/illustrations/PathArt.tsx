export function PathArt({ kind }: { kind: 'everyday' | 'business' | 'technical' }) {
  return (
    <svg viewBox="0 0 126 102" focusable="false" aria-hidden="true" className="path-art">
      <g fill="none" stroke="#668272" strokeWidth="1" opacity=".45">
        <ellipse
          cx="65"
          cy="72"
          rx="55"
          ry="18"
          transform="rotate(-14 65 72)"
          strokeDasharray="2 5"
        />
      </g>
      <g stroke="#253932" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        {kind === 'everyday' && (
          <g transform="rotate(-15 64 49)">
            <ellipse cx="63" cy="62" rx="39" ry="31" fill="#77ad93" />
            <ellipse cx="63" cy="55" rx="39" ry="32" fill="#a9d2b7" />
            <ellipse cx="63" cy="54" rx="32" ry="25" fill="#fcf8df" />
            <path
              d="m39 40 3 2m38 22 3 2m-7-29-2 3m-25 26-2 3"
              stroke="#83977c"
              strokeWidth="1.4"
            />
            <path d="M54 22v-5q0-8 9-8t9 8v6h-5v-6q0-4-4-4t-4 4v5Z" fill="#86b39d" />
            <path d="m81 36-13 23-24 13 13-23Z" fill="#f2ae74" />
            <path d="m57 49 11 10-24 13Z" fill="#517d6a" />
            <circle cx="63" cy="54" r="3.2" fill="#fbf7e4" />
            <path d="m34 54 4-1m50-2 4-1M62 33v3m1 38v3" stroke="#7a9986" />
          </g>
        )}
        {kind === 'business' && (
          <g transform="rotate(7 64 50)">
            <path d="m17 42 56-15 31 10-55 18Z" fill="#ffd9a4" />
            <path d="m17 42 32 12v36L17 76Z" fill="#dc9c64" />
            <path d="m49 54 55-17v36L49 90Z" fill="#f5bd86" />
            <path d="m17 43 33 13 54-17v13L50 69 17 56Z" fill="#ffce97" />
            <path d="m47 32-2-8q-1-4 3-5l16-4q4-1 5 2l3 9-6 2-2-7-12 4 2 6Z" fill="#d89961" />
            <path d="m68 58 10-3v10l-10 3Z" fill="#fff0c8" />
            <path d="m57 73 36-11" stroke="#ac8358" strokeDasharray="1 3" strokeWidth="1.1" />
            <path d="M24 64v5m68-12v9" stroke="#a36c49" strokeWidth="1.4" />
          </g>
        )}
        {kind === 'technical' && (
          <g transform="rotate(-8 60 50)">
            <path d="M18 32q0-4 4-4h70q4 0 4 4v46q0 4-4 4H22q-4 0-4-4Z" fill="#8e78ac" />
            <rect x="23" y="24" width="78" height="54" rx="5" fill="#ddcbf2" />
            <path d="M24 36h76" />
            <g fill="#826e98" stroke="none">
              <circle cx="30" cy="30" r="1.5" />
              <circle cx="36" cy="30" r="1.5" />
              <circle cx="42" cy="30" r="1.5" />
            </g>
            <path d="M35 69h11m4 0h7m3 0h6" stroke="#a08ab4" strokeWidth="1.6" />
            <path d="m43 48-8 6 8 6m31-12 8 6-8 6m-12-15-7 19" fill="none" />
            <path fill="#c2a6dd" d="m88 64 20 11-9 2-4 10Z" />
          </g>
        )}
      </g>
    </svg>
  )
}
