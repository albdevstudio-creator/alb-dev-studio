import { Fragment, useRef } from 'react'
import { LazyMotion, MotionConfig, domAnimation, m, useReducedMotion, useScroll } from 'motion/react'

const ease = [.22, 1, .36, 1]
export function MotionProvider({ children }) {
  return <MotionConfig reducedMotion="user"><LazyMotion features={domAnimation} strict>{children}</LazyMotion></MotionConfig>
}
export function Reveal({ children, className = '', delay = 0, as = 'div', ...props }) {
  const reduce = useReducedMotion()
  const Tag = m[as]
  return <Tag className={className} initial={reduce ? false : { opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12 }}
    transition={{ duration: .8, ease, delay: reduce ? 0 : delay }} {...props}>{children}</Tag>
}
export function TextReveal({ text, className = '', as = 'h2', onLoad = false, delay = 0 }) {
  const reduce = useReducedMotion()
  const Tag = m[as]
  return <Tag className={className} aria-label={as === 'span' ? undefined : text} aria-hidden={as === 'span' ? true : undefined} initial={reduce ? false : 'hidden'}
    animate={onLoad ? 'visible' : undefined} whileInView={onLoad ? undefined : 'visible'}
    viewport={{ once: true, amount: .2 }}
    variants={{ visible: { transition: { staggerChildren: reduce ? 0 : .065, delayChildren: reduce ? 0 : delay } } }}>
    {text.split(' ').map((word, i, words) => <Fragment key={`${word}-${i}`}><span className="word-mask" aria-hidden="true">
      <m.span variants={{ hidden: { y: '110%', opacity: 0 }, visible: { y: 0, opacity: 1 } }}
        transition={{ duration: reduce ? 0 : .85, ease }}>{word}</m.span>
    </span>{i < words.length - 1 ? ' ' : null}</Fragment>)}
  </Tag>
}
export function Timeline({ children }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start center', 'end center'] })
  return <div className="timeline" ref={ref}>
    <div className="timeline-track" aria-hidden="true"><m.span style={{ scaleY: reduce ? 1 : scrollYProgress }}/></div>
    <ol>{children}</ol>
  </div>
}
