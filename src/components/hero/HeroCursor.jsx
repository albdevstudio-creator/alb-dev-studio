import { m } from 'motion/react'
import { MousePointer2 } from 'lucide-react'

// Motion values update the transform without a React render on every pointer move.
export default function HeroCursor({ x, y, visible, interacting, pressed }) {
  return <m.div className={`alb-cursor ${interacting ? 'is-interacting' : ''} ${pressed ? 'is-pressed' : ''}`} style={{ x, y }} animate={{ opacity: visible ? 1 : 0 }} transition={{ duration: .15 }} aria-hidden="true">
    <MousePointer2 size={29} fill="currentColor" strokeWidth={1.2} /><span>{pressed ? 'Selecionado' : 'Explorar'}</span>
  </m.div>
}
