export function Brand() {
  return (
    <span className="brand">
      <svg aria-hidden="true" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="12" fill="#b7e4bd" />
        <g
          transform="rotate(40 20 20)"
          stroke="#143f32"
          strokeWidth="3.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="20" cy="13" r="5.6" />
          <path d="M20 19v14m0-5h5m-5-4h4" />
        </g>
      </svg>
      <span>
        Passkeys<span className="brand-period">.</span>
      </span>
    </span>
  )
}
