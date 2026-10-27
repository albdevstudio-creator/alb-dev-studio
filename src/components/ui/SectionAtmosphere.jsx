import smoke from '../../assets/hero/efeitoFumê.png'

const lights = [
  [7, 30, 44], [84, 70, 70], [65, 12, 35], [28, 82, 26],
  [94, 24, 42], [43, 42, 20], [12, 90, 52],
]

export default function SectionAtmosphere({ quiet = false }) {
  return <div className={`section-atmosphere${quiet ? ' section-atmosphere-quiet' : ''}`} aria-hidden="true">
    <img src={smoke} alt="" loading="lazy" decoding="async" />
    {lights.map(([left, top, size], i) => <span key={i} style={{ left: `${left}%`, top: `${top}%`, width: size, height: size, '--orb-duration': `${6 + i % 4}s`, '--orb-delay': `${-i * 1.7}s` }} />)}
  </div>
}
