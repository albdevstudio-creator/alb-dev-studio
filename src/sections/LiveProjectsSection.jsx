import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '../components/animation/Motion'
import SectionTitle from '../components/ui/SectionTitle'
import { liveProjects } from '../data/liveProjects'
import HeroBackgroundEffects from '../components/hero/HeroBackgroundEffects'

export default function LiveProjectsSection() {
  return <section id="projetos-no-ar" className="section section-dark studio-section live-projects" aria-label="Projetos no ar">
    <HeroBackgroundEffects extended />
    <div className="container">
      <div className="live-projects-heading">
        <SectionTitle
          eyebrow="01 / Projetos no ar"
          title="Cada projeto, uma identidade. Cada marca, uma presença."
          desc="Do universo do skincare à tecnologia, cada projeto ganha uma linguagem própria. Explore os sites e veja como essas identidades se tornam experiências."
        />
        <Reveal className="live-projects-count"><span aria-hidden="true" />05 SITES PARA EXPLORAR</Reveal>
      </div>
      <div className="live-projects-grid">
        {liveProjects.map((project, index) => <Reveal as="article" key={project.id} className={`live-project live-project-${project.id}`} style={{ '--project-accent': project.accent }}>
          <a className="live-project-link" href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`Visitar site ${project.name} (abre em nova aba)`}>
            <div className="live-project-preview">
              <img src={project.image} alt={`Página inicial do site ${project.name}`} width="1440" height="1000" loading="lazy" decoding="async" />
              <span className="live-project-open" aria-hidden="true"><ArrowUpRight size={23} /></span>
            </div>
            <div className="live-project-copy">
              <div className="live-project-meta"><span>{project.category}</span><span>0{index + 1}</span></div>
              <h3>{project.name}</h3>
              <p className="live-project-headline">{project.headline}</p>
              <p className="live-project-description">{project.description}</p>
              <div className="live-project-bottom"><span>{project.identity}</span><span className="live-project-cta">Visitar site <ArrowUpRight size={16} aria-hidden="true" /></span></div>
            </div>
          </a>
        </Reveal>)}
      </div>
      <Reveal className="live-projects-note"><span>UNIVERSOS DIFERENTES. CUIDADO EM COMUM.</span><p>A sua marca também merece uma presença que seja só dela.</p><a className="text-link" href="#contato">Vamos criar a sua <ArrowUpRight size={18} aria-hidden="true" /></a></Reveal>
    </div>
  </section>
}
