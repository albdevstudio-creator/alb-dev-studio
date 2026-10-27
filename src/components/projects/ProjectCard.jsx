import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '../animation/Motion'
import ProjectArtwork from './ProjectArtwork'
import GlowSurface from '../ui/GlowSurface'

export default function ProjectCard({ project, index, active, onActivate }) {
  return <Reveal as="article" className={`project-item project-item-${index} portfolio-${project.theme} ${active ? 'is-active' : ''}`} onPointerEnter={event => { if (event.pointerType === 'mouse') onActivate() }} onFocus={onActivate}>
    <GlowSurface as="button" className="portfolio-visual" type="button" aria-label={`Destacar projeto ${project.name}`} aria-pressed={active} onClick={onActivate}>
      {project.image ? (
        <div className={`portfolio-image-frame ${project.mobile ? 'portfolio-mobile-frame' : ''}`}>
          <div className="portfolio-window-bar" aria-hidden="true"><i /><i /><i /><span>{project.name} / Digital experience</span></div>
          <img src={project.image} alt={`Captura real do projeto ${project.name}${project.mobile ? ' em dispositivo móvel' : ''}`} loading="lazy" decoding="async" width={project.mobile ? 482 : 1280} height={project.mobile ? 776 : project.id === 'aura' ? 686 : 660} />
          {project.mobile && <span className="portfolio-mobile-note" aria-hidden="true">Design que<br />acompanha<br /><em>o movimento.</em><small>WEB EXPERIENCE / MOBILE</small></span>}
        </div>
      ) : <ProjectArtwork project={project} />}
      <span className="portfolio-focus" aria-hidden="true"><span />EM FOCO</span>
    </GlowSurface>
    <div className="project-info">
      <div className="project-title"><span className="project-index">0{index + 1}</span><div><span className="small-label">{project.type}</span><h3>{project.name}</h3></div></div>
      <p>{project.desc}</p>
      {project.conceptual && <span className="concept-label">ESTUDO CONCEITUAL</span>}
      {project.link && <a className="round-link" href={project.link} target="_blank" rel="noreferrer" aria-label={`Visitar site ${project.name}`}><ArrowUpRight size={22} /></a>}
    </div>
  </Reveal>
}
