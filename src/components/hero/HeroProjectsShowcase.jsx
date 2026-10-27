import { useState } from 'react'
import { AnimatePresence, m, useReducedMotion } from 'motion/react'
import { ArrowUpRight, Asterisk } from 'lucide-react'
import { heroProjects } from '../../data/heroProjects'
import { useHeroCursor } from '../../hooks/useHeroCursor'
import HeroCursor from './HeroCursor'
import HeroProjectCard from './HeroProjectCard'

export default function HeroProjectsShowcase() {
  // Hover/focus previews temporarily override the selection pinned by click or Enter.
  const [selectedId, setSelectedId] = useState(heroProjects[0].id)
  const [previewId, setPreviewId] = useState(null)
  const cursor = useHeroCursor()
  const reduce = useReducedMotion()
  const activeId = previewId ?? selectedId
  const active = heroProjects.find(project => project.id === activeId)

  function leave() {
    cursor.leave()
    setPreviewId(null)
  }

  function choose(id) {
    setSelectedId(id)
    setPreviewId(null)
  }

  function handleBlur(event) {
    if (!event.currentTarget.contains(event.relatedTarget)) setPreviewId(null)
  }

  return (
    <div
      className="alb-showcase"
      ref={cursor.area}
      {...cursor.handlers}
      onPointerLeave={leave}
      onPointerCancel={leave}
      onBlur={handleBlur}
    >
      <div className="alb-showcase-heading">
        <span aria-hidden="true"><span /></span>
        <div className="alb-category" aria-live="polite" aria-atomic="true">
          <AnimatePresence mode="wait" initial={false}>
            <m.span
              key={active.categoryLabel}
              initial={{ opacity: 0, y: reduce ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduce ? 0 : -8 }}
              transition={{ duration: reduce ? 0 : .17 }}
            >
              {active.categoryLabel}<ArrowUpRight size={22} />
            </m.span>
          </AnimatePresence>
        </div>
      </div>
      <div className="alb-project-stage" role="group" aria-label="Projetos em destaque: selecione para explorar">
        <span className="alb-stage-orbit" aria-hidden="true" />
        <Asterisk className="alb-stage-star" aria-hidden="true" size={47} strokeWidth={1} />
        {heroProjects.map((project, index) => (
          <HeroProjectCard
            key={project.id}
            project={project}
            index={index}
            active={activeId === project.id}
            selected={selectedId === project.id}
            onPreview={setPreviewId}
            onSelect={choose}
          />
        ))}
      </div>
      <div className="alb-showcase-footer">
        <div className="alb-project-selectors" role="group" aria-label="Selecionar projeto em destaque">
          {heroProjects.map((project, index) => (
            <button
              key={project.id}
              type="button"
              aria-label={`Destacar ${project.title}`}
              aria-pressed={selectedId === project.id}
              className={activeId === project.id ? 'is-active' : ''}
              onClick={() => choose(project.id)}
              onFocus={() => setPreviewId(null)}
            >
              0{index + 1}
            </button>
          ))}
        </div>
        {active.link ? (
          <a href={active.link} target="_blank" rel="noreferrer" className="alb-project-detail">
            {active.title} <ArrowUpRight size={14} /><span className="sr-only"> — visitar site</span>
          </a>
        ) : (
          <span className="alb-project-detail">{active.title} / {active.format === 'mobile' ? 'Mobile' : 'Web'}</span>
        )}
      </div>
      <HeroCursor x={cursor.x} y={cursor.y} visible={cursor.visible} interacting={Boolean(previewId)} pressed={cursor.pressed} />
    </div>
  )
}
