import { useRef, useState } from 'react'
import { m, useReducedMotion } from 'motion/react'
import { ArrowUpRight, Images, Layers, Smartphone } from 'lucide-react'
import { Reveal } from '../components/animation/Motion'
import SectionTitle from '../components/ui/SectionTitle'
import { liveProjects, socialProjects } from '../data/liveProjects'
import HeroBackgroundEffects from '../components/hero/HeroBackgroundEffects'
import { whatsappLink } from '../data/contact'
import SiteShowcase from '../components/projects/SiteShowcase'

const categories = [{ id: 'sites', label: 'Sites', count: liveProjects.length }, { id: 'social', label: 'Design para redes sociais', count: socialProjects.length }]

export default function LiveProjectsSection() {
  const [category, setCategory] = useState('sites')
  const tabs = useRef([])
  const reduce = useReducedMotion()

  function changeTab(event, index) {
    const next = { ArrowRight: (index + 1) % categories.length, ArrowLeft: (index + categories.length - 1) % categories.length, Home: 0, End: categories.length - 1 }[event.key]
    if (next === undefined) return
    event.preventDefault()
    setCategory(categories[next].id)
    tabs.current[next]?.focus()
  }

  return <section id="projetos-no-ar" className="section section-dark studio-section live-projects" aria-label="Portfólio do estúdio">
    <HeroBackgroundEffects extended />
    <div className="container">
      <div className="live-projects-heading">
        <SectionTitle eyebrow="01 / Presenças com identidade" title="Cada marca, um universo próprio." desc="Design que expressa personalidade. Explore os sites e conheça as possibilidades de criação para suas redes sociais." />
      </div>
      <div className="portfolio-toolbar">
        <div className="portfolio-tabs" role="tablist" aria-label="Seleções do portfólio">
          {categories.map((item, index) => <button ref={element => { tabs.current[index] = element }} key={item.id} type="button" role="tab" id={`portfolio-tab-${item.id}`} aria-selected={category === item.id} aria-controls={`portfolio-panel-${item.id}`} tabIndex={category === item.id ? 0 : -1} onClick={() => setCategory(item.id)} onKeyDown={event => changeTab(event, index)}>
            {item.label}{item.count > 0 && <span>{String(item.count).padStart(2, '0')}</span>}
          </button>)}
        </div>
        <span className="portfolio-selection-label">{category === 'sites' ? 'SELEÇÃO ALB / SITES NO AR' : 'DESIGN / COMUNICAÇÃO VISUAL'}</span>
      </div>
      {categories.map(item => <div key={item.id} id={`portfolio-panel-${item.id}`} role="tabpanel" aria-labelledby={`portfolio-tab-${item.id}`} hidden={category !== item.id} tabIndex={0}>
        {category === item.id && <m.div initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduce ? 0 : .5, ease: [.25, .1, .25, 1] }}>
          {item.id === 'sites' ? <SiteShowcase /> : socialProjects.length > 0 ? <div className="social-projects-grid">
            {socialProjects.map(project => <article className="social-project" key={project.id}>
              <div className="social-art-grid">{project.images.map((image, index) => <img key={image.src} src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" decoding="async" />)}</div>
              <span className="small-label">{project.category}</span><h3>{project.name}</h3><p>{project.description}</p>
            </article>)}
          </div> : <div className="social-design-intro">
            <div className="social-design-copy"><span className="small-label">DESIGN PARA SUA MARCA</span><h3>Sua essência.<br />Em cada publicação.</h3><p>Posts, stories e carrosséis feitos sob medida para criar uma presença visual consistente. Da escolha das cores à composição, cada peça fala a linguagem da sua marca.</p><a className="social-design-cta" href={whatsappLink('criação de artes para redes sociais')} target="_blank" rel="noopener noreferrer">Conversar sobre minhas artes <ArrowUpRight size={19} aria-hidden="true" /></a></div>
            <div className="social-design-formats">
              {[{ icon: Images, name: 'Posts para o feed', text: 'Composições para apresentar sua marca, seus produtos e suas ideias.' }, { icon: Layers, name: 'Carrosséis', text: 'Uma sequência visual para desenvolver mensagens e contar histórias.' }, { icon: Smartphone, name: 'Stories e campanhas', text: 'Artes adaptadas aos formatos e aos momentos da sua comunicação.' }].map(({ icon: Icon, name, text }, index) => <div className="social-design-format" key={name}><Icon size={24} strokeWidth={1.4} aria-hidden="true" /><div><span>0{index + 1}</span><h4>{name}</h4><p>{text}</p></div></div>)}
            </div>
          </div>}
        </m.div>}
      </div>)}
      <Reveal className="live-projects-note"><span>UNIVERSOS DIFERENTES. CUIDADO EM COMUM.</span><p>A sua marca também merece uma presença que seja só dela.</p><a className="text-link" href="#contato">Vamos criar a sua <ArrowUpRight size={18} aria-hidden="true" /></a></Reveal>
    </div>
  </section>
}
