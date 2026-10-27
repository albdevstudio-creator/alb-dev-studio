import { useRef, useState } from 'react'
import { m, useReducedMotion } from 'motion/react'
import { ArrowUpRight, Monitor, Smartphone } from 'lucide-react'
import { liveProjects } from '../../data/liveProjects'

export default function SiteShowcase() {
  const [selected, setSelected] = useState(0)
  const [device, setDevice] = useState('desktop')
  const buttons = useRef([])
  const reduce = useReducedMotion()
  const project = liveProjects[selected]

  function selectWithKeyboard(event, index) {
    const count = liveProjects.length
    const next = { ArrowRight: (index + 1) % count, ArrowLeft: (index + count - 1) % count, Home: 0, End: count - 1 }[event.key]
    if (next === undefined) return
    event.preventDefault()
    setSelected(next)
    buttons.current[next]?.focus({ preventScroll: true })
    const button = buttons.current[next]
    const row = button?.parentElement
    if (row && row.scrollWidth > row.clientWidth) {
      row.scrollTo({ left: button.offsetLeft - (row.clientWidth - button.offsetWidth) / 2, behavior: reduce ? 'instant' : 'smooth' })
    }
  }

  return <div className="site-showcase" style={{ '--project-accent': project.accent }}>
    <div className="site-project-tabs" role="tablist" aria-label="Escolher site para explorar">
      {liveProjects.map((item, index) => <button key={item.id} ref={element => { buttons.current[index] = element }} type="button" role="tab"
        id={`site-tab-${item.id}`} aria-selected={index === selected} aria-controls="site-showcase-panel" tabIndex={index === selected ? 0 : -1}
        onClick={() => setSelected(index)} onKeyDown={event => selectWithKeyboard(event, index)}>
        <span className="site-tab-number">0{index + 1}</span><span>{item.name}</span><ArrowUpRight size={14} aria-hidden="true" />
      </button>)}
    </div>
    <article id="site-showcase-panel" className="site-showcase-panel" role="tabpanel" aria-labelledby={`site-tab-${project.id}`} tabIndex={0}>
      <div className="site-preview-toolbar">
        <span className="site-preview-address"><span aria-hidden="true" />{new URL(project.link).hostname}</span>
        <div className="site-device-options" role="group" aria-label="Formato da prévia">
          <button type="button" aria-pressed={device === 'desktop'} onClick={() => setDevice('desktop')}><Monitor size={15} aria-hidden="true" />Desktop</button>
          <button type="button" aria-pressed={device === 'mobile'} onClick={() => setDevice('mobile')}><Smartphone size={15} aria-hidden="true" />Mobile</button>
        </div>
      </div>
      <div className={`site-preview-stage is-${device}`}>
        <div className="site-device-frame">
          <m.img key={`${project.id}-${device}`} src={device === 'mobile' ? project.mobileImage : project.image}
            alt={`Página inicial de ${project.name} ${device === 'mobile' ? 'no celular' : 'no desktop'}`}
            width={device === 'mobile' ? 390 : 1440} height={device === 'mobile' ? 844 : 1000}
            loading="lazy" decoding="async" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduce ? 0 : .4 }} />
        </div>
        <span className="site-preview-caption" aria-hidden="true">{device === 'mobile' ? '390 × 844 / MOBILE' : '1440 × 1000 / DESKTOP'}</span>
      </div>
      <div className="site-project-details">
        <div><span className="site-project-category">{project.category}</span><h3>{project.name}</h3></div>
        <p>{project.summary}</p>
        <a className="site-explore-button" href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`Explorar site ${project.name} (abre em nova aba)`}>Explorar site <ArrowUpRight size={19} aria-hidden="true" /></a>
      </div>
      <p className="sr-only" role="status" aria-live="polite">{project.name}: prévia {device === 'mobile' ? 'mobile' : 'desktop'}.</p>
    </article>
  </div>
}
