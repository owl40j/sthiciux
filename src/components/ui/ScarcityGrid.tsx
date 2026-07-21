import styles from './ScarcityGrid.module.css'

interface ScarcityGridProps {
  compact?: boolean
  interactive?: boolean
  onEpicenterClick?: () => void
}

function buildGridLines(compact: boolean) {
  const lines: { x1: number; y1: number; x2: number; y2: number; key: string }[] = []
  const epicenterX = compact ? 72 : 68
  const epicenterY = compact ? 78 : 75

  for (let i = 0; i <= 8; i++) {
    const t = i / 8
    const spacing = 8 + t * t * (compact ? 28 : 32)
    const x = epicenterX - spacing * (4 - i)
    if (x >= 4 && x <= 96) {
      lines.push({ x1: x, y1: 4, x2: x, y2: 96, key: `v-${i}` })
    }
  }

  for (let i = 0; i <= 8; i++) {
    const t = i / 8
    const spacing = 8 + t * t * (compact ? 28 : 32)
    const y = epicenterY - spacing * (4 - i)
    if (y >= 4 && y <= 96) {
      lines.push({ x1: 4, y1: y, x2: 96, y2: y, key: `h-${i}` })
    }
  }

  return { lines, epicenterX, epicenterY }
}

export function ScarcityGrid({ compact = false, interactive = false, onEpicenterClick }: ScarcityGridProps) {
  const { lines, epicenterX, epicenterY } = buildGridLines(compact)

  const svg = (
    <svg
      className={styles['scarcity-preview__svg']}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <rect x="4" y="4" width="92" height="92" rx="4" fill="#f8f8f8" />
      <path d="M5 30 C24 22, 35 38, 51 30 S78 14, 96 23" fill="none" stroke="#b7b7b7" strokeWidth="2.4" />
      <path d="M17 4 C22 24, 15 43, 25 58 S48 79, 43 96" fill="none" stroke="#c7c7c7" strokeWidth="1.8" />
      <path d="M5 63 C27 67, 38 54, 56 61 S79 83, 96 74" fill="none" stroke="#c7c7c7" strokeWidth="1.8" />
      {lines.map((line) => (
        <line
          key={line.key}
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          stroke="#111"
          strokeWidth={compact ? 0.6 : 0.8}
        />
      ))}
      <g>
        <circle cx="31" cy="38" r="3" fill="#888" />
        <circle cx="42" cy="67" r="3" fill="#bbb" />
        <circle cx="81" cy="42" r="3" fill="#ddd" stroke="#777" strokeWidth="0.8" />
        <circle cx={epicenterX} cy={epicenterY} r={interactive ? 6 : 4} fill="none" stroke="#111" strokeWidth="1.2" />
        <line x1={epicenterX - 8} y1={epicenterY} x2={epicenterX + 8} y2={epicenterY} stroke="#111" strokeWidth="1" />
        <line x1={epicenterX} y1={epicenterY - 8} x2={epicenterX} y2={epicenterY + 8} stroke="#111" strokeWidth="1" />
      </g>
      {!compact && (
        <>
          <text x="7" y="13" fontSize="3.3" fill="#555">Poblacion</text>
          <text x="68" y="16" fontSize="3.3" fill="#555">Market zone</text>
          <text x="7" y="91" fontSize="3.3" fill="#555">South cluster</text>
        </>
      )}
    </svg>
  )

  if (compact) {
    return (
      <div>
        <h2 className={styles['scarcity-preview__section-title']}>Nearby supply status</h2>
        <button
          type="button"
          className={styles['scarcity-preview']}
          onClick={onEpicenterClick}
          aria-label="Open scarcity map. Cooking oil critical nearby."
        >
          {svg}
        </button>
        <p className={styles['scarcity-preview__caption']}>Cooking oil — critical nearby</p>
      </div>
    )
  }

  return (
    <div className={`card card--dashed ${styles['scarcity-preview']} ${styles['scarcity-preview--map']}`}>
      {svg}
      {interactive && (
        <button
          type="button"
          className={styles['scarcity-preview__target-button']}
          onClick={onEpicenterClick}
          aria-label="Inspect critical scarcity epicenter"
        >
          <span>Critical signal</span>
        </button>
      )}
    </div>
  )
}

export function StabilizingIcon() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" aria-hidden="true">
      <circle cx="60" cy="60" r="48" fill="none" stroke="#111" strokeWidth="4" />
      <line x1="60" y1="8" x2="60" y2="28" stroke="#111" strokeWidth="3" />
      <line x1="60" y1="92" x2="60" y2="112" stroke="#111" strokeWidth="3" />
      <line x1="8" y1="60" x2="28" y2="60" stroke="#111" strokeWidth="3" />
      <line x1="92" y1="60" x2="112" y2="60" stroke="#111" strokeWidth="3" />
      <circle cx="60" cy="60" r="6" fill="#111" />
    </svg>
  )
}
