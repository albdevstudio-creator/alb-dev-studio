import { ArrowUpRight } from 'lucide-react'

export default function HeroProjectCard({ project, index, active, selected, onPreview, onSelect }) {
  return (
    <div className={`alb-project-position alb-position-${project.position} ${active ? 'is-active' : ''}`}>
      <div className={`alb-project-float alb-float-${index}`}>
        <button
          type="button"
          className={`alb-project-card alb-card-${project.format}`}
          aria-label={`Selecionar projeto ${project.title}`}
          aria-pressed={selected}
          onPointerEnter={event => { if (event.pointerType === 'mouse') onPreview(project.id) }}
          onPointerLeave={() => onPreview(null)}
          onFocus={() => onPreview(project.id)}
          onClick={() => onSelect(project.id)}
        >
          {project.format === 'desktop' ? (
            <span className="alb-browser-bar" aria-hidden="true">
              <i /><i /><i />
              <span>{project.title} — digital experience</span>
              <ArrowUpRight size={11} />
            </span>
          ) : <span className="alb-phone-island" aria-hidden="true" />}
          <img
            src={project.image}
            alt={project.format === 'mobile' ? 'Landing page do Instituto Aveloz em um mockup de celular' : `Interface do projeto ${project.title}`}
            width={project.imageWidth}
            height={project.imageHeight}
            fetchPriority={index === 0 ? 'high' : 'auto'}
            draggable="false"
          />
          <span className="alb-card-caption">{project.title}<ArrowUpRight size={13} /></span>
        </button>
      </div>
    </div>
  )
}
