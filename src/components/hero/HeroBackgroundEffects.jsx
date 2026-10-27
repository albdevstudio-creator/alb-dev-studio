import background from '../../assets/hero/bg-hero.png'
import smoke from '../../assets/hero/efeitoFumê.png'
import particles from '../../assets/hero/bolinhasFlutuantes.png'

// Crop individual lights from the supplied image so each follows its own path.
const lights = [
  [108, 74, 80, 11, 20, 48], [257, 92, 184, 26, 28, 92],
  [653, 0, 164, 54, 12, 90], [1040, 42, 38, 78, 10, 24],
  [846, 149, 34, 63, 31, 16], [690, 193, 198, 58, 44, 100],
  [962, 258, 176, 80, 52, 85], [1170, 253, 38, 90, 36, 22],
  [324, 307, 38, 24, 48, 24], [387, 414, 40, 30, 65, 26],
  [506, 428, 42, 39, 69, 28], [433, 523, 64, 34, 84, 40],
  [746, 632, 134, 60, 90, 76], [1263, 569, 92, 95, 81, 54],
]

// Keep lights visible around the cards when the atmosphere spans a long section.
const extendedPositions = [
  [4, 4], [91, 6], [73, 3], [96, 17], [3, 27], [97, 38],
  [2, 49], [96, 60], [3, 70], [97, 81], [45, 12], [51, 44],
  [48, 72], [88, 95],
]

export default function HeroBackgroundEffects({ extended = false }) {
  return <div className="alb-atmosphere" aria-hidden="true">
    <img className="alb-atmosphere-layer alb-background" src={background} alt="" fetchPriority="high" draggable={false} />
    <img className="alb-atmosphere-layer alb-smoke" src={smoke} alt="" draggable={false} />
    <div className="alb-particles">
      {lights.map(([x, y, crop, left, top, size], i) => (
        <svg key={i} className="alb-floating-light" viewBox={`${x} ${y} ${crop} ${crop}`}
          style={{ left: `${extended ? extendedPositions[i][0] : left}%`, top: `${extended ? extendedPositions[i][1] : top}%`, '--light-size': `${size}px`, '--duration': `${5 + i % 4}s`, '--delay': `${-i * 1.3}s`, '--drift-x': `${i % 2 ? -20 : 24}px` }}>
          <image href={particles} width="1366" height="768" />
        </svg>
      ))}
    </div>
  </div>
}
