import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import { m, useReducedMotion } from 'motion/react'

const stops = [
  { id: 'inicio', label: 'Início' },
  { id: 'projetos-no-ar', label: 'Projetos' },
  { id: 'servicos', label: 'Serviços' },
  { id: 'sobre', label: 'Sobre' },
  { id: 'processo', label: 'Processo' },
  { id: 'contratacao', label: 'Contratação' },
  { id: 'faq', label: 'Dúvidas' },
  { id: 'contato', label: 'Contato' },
]

export default function PageScrollbar() {
  const reduce = useReducedMotion()
  const widget = useRef(null)
  const toggle = useRef(null)
  const mobile = useRef(null)
  const focusTarget = useRef(null)
  const [current, setCurrent] = useState(0)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    const media = window.matchMedia('(min-width: 761px) and (hover: hover) and (pointer: fine) and (forced-colors: none)')
    function updateMode() {
      root.classList.toggle('has-page-scrollbar', media.matches)
      if (!media.matches) setOpen(false)
    }
    const sections = stops.map(stop => document.getElementById(stop.id))
    let frame = 0
    function measure() {
      frame = 0
      const max = Math.max(0, root.scrollHeight - window.innerHeight)
      const scroll = Math.max(0, window.scrollY)
      let index = 0
      sections.forEach((section, i) => {
        if (section && scroll + 1 >= Math.min(max, Math.max(0, section.getBoundingClientRect().top + scroll - 120))) index = i
      })
      const progress = String(max ? Math.min(1, scroll / max) : 0)
      widget.current?.style.setProperty('--page-progress', progress)
      mobile.current?.style.setProperty('--page-progress', progress)
      setCurrent(index)
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(measure)
    }
    updateMode()
    media.addEventListener('change', updateMode)
    const observer = new ResizeObserver(schedule)
    observer.observe(document.body)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    measure()
    return () => {
      root.classList.remove('has-page-scrollbar')
      media.removeEventListener('change', updateMode)
      observer.disconnect()
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const focusFrame = requestAnimationFrame(() => {
      if (focusTarget.current !== null) widget.current?.querySelectorAll('.section-index-link')[focusTarget.current]?.focus({ preventScroll: true })
      focusTarget.current = null
    })
    function outside(event) {
      if (!widget.current?.contains(event.target)) setOpen(false)
    }
    function escape(event) {
      if (event.key === 'Escape') {
        setOpen(false)
        toggle.current?.focus({ preventScroll: true })
      }
    }
    document.addEventListener('pointerdown', outside)
    document.addEventListener('keydown', escape)
    return () => {
      cancelAnimationFrame(focusFrame)
      document.removeEventListener('pointerdown', outside)
      document.removeEventListener('keydown', escape)
    }
  }, [open])

  function openWithKeyboard(event) {
    if (!['ArrowDown', 'ArrowUp'].includes(event.key)) return
    event.preventDefault()
    const index = event.key === 'ArrowUp' ? stops.length - 1 : current
    if (open) {
      widget.current?.querySelectorAll('.section-index-link')[index]?.focus({ preventScroll: true })
    } else {
      focusTarget.current = index
      setOpen(true)
    }
  }

  function moveFocus(event) {
    const links = [...event.currentTarget.querySelectorAll('a')]
    const index = links.indexOf(document.activeElement)
    const next = { ArrowDown: Math.min(links.length - 1, index + 1), ArrowUp: Math.max(0, index - 1), Home: 0, End: links.length - 1 }[event.key]
    if (next === undefined) return
    event.preventDefault()
    links[next]?.focus({ preventScroll: true })
  }

  return <>
    <div ref={widget} className={`section-index${open ? ' is-open' : ''}`} onBlur={event => {
      if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false)
    }}>
      <button ref={toggle} className="section-index-toggle" type="button" aria-expanded={open} aria-controls="section-index-panel"
        aria-label={`Explorar seções: ${stops[current].label}`} onClick={() => setOpen(value => !value)} onKeyDown={openWithKeyboard}>
        <span className="section-index-number">{String(current + 1).padStart(2, '0')} <span>/</span></span>
        <m.span key={current} className="section-index-current" initial={reduce ? false : { opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduce ? 0 : .28, ease: [.25, .1, .25, 1] }}>{stops[current].label}</m.span>
        <ChevronDown size={16} aria-hidden="true" />
        <span className="section-index-progress" aria-hidden="true"><span /></span>
      </button>
      <m.nav id="section-index-panel" className="section-index-panel" aria-label="Índice da página" aria-hidden={!open} inert={!open} initial={false}
        animate={open ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 8, scale: .98 }}
        transition={{ duration: reduce ? 0 : .28, ease: [.25, .1, .25, 1] }} onKeyDown={moveFocus}>
        <span className="section-index-caption">EXPLORE O ESTÚDIO</span>
        <ol>
          {stops.map((stop, index) => <li key={stop.id}>
            <a href={`#${stop.id}`} className="section-index-link" aria-current={current === index ? 'location' : undefined} onClick={() => {
              setOpen(false)
              toggle.current?.focus({ preventScroll: true })
            }}>
              <span className="section-index-link-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <span>{stop.label}</span><ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </li>)}
        </ol>
      </m.nav>
    </div>
    <div ref={mobile} className="mobile-page-progress" aria-hidden="true"><span /></div>
  </>
}
