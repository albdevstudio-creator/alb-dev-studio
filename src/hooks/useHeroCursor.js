import { useRef, useState } from 'react'
import { useMotionValue, useReducedMotion } from 'motion/react'

// Kept independent from project selection: pointer coordinates never trigger a render.
export function useHeroCursor() {
  const area = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const reduce = useReducedMotion()
  const [visible, setVisible] = useState(false)
  const [pressed, setPressed] = useState(false)

  function trackPointer(event) {
    if (event.pointerType !== 'mouse' || reduce || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const bounds = area.current.getBoundingClientRect()
    x.set(event.clientX - bounds.left + 14)
    y.set(event.clientY - bounds.top + 14)
    setVisible(true)
  }

  function leave() {
    setVisible(false)
    setPressed(false)
  }

  return {
    area, x, y, visible, pressed, leave,
    handlers: {
      onPointerMove: trackPointer,
      onPointerDown: event => { if (event.pointerType === 'mouse') setPressed(true) },
      onPointerUp: () => setPressed(false),
    },
  }
}
