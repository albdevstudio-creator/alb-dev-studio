import { useReducedMotion } from 'motion/react'

// Update only CSS variables: pointer movement never triggers React renders.
export default function GlowSurface({ as: Tag = 'div', className = '', children, ...props }) {
  const reduce = useReducedMotion()

  function move(event) {
    if (reduce || event.pointerType !== 'mouse') return
    const bounds = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`)
    event.currentTarget.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`)
  }

  return <Tag {...props} className={`glow-surface ${className}`} onPointerMove={move}>
    {children}
  </Tag>
}
