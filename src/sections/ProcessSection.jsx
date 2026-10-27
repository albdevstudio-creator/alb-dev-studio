import { ArrowRight, ArrowUpRight, Check, Monitor, Palette } from 'lucide-react'
import { Reveal } from '../components/animation/Motion'
import SectionTitle from '../components/ui/SectionTitle'
import { steps } from '../data/process'
import { useRef, useState } from 'react'
import { m, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from 'motion/react'

export default function ProcessSection() {
  const list = useRef(null)
  const [active, setActive] = useState(0)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: list, offset: ['start center', 'end center'] })
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: .5 })
  useMotionValueEvent(scrollYProgress, 'change', () => {
    const cards = [...(list.current?.querySelectorAll('.journey-step') ?? [])]
    let nearest = 0
    let distance = Infinity
    cards.forEach((card, index) => {
      const bounds = card.getBoundingClientRect()
      const delta = Math.abs(bounds.top + bounds.height / 2 - window.innerHeight / 2)
      if (delta < distance) { distance = delta; nearest = index }
    })
    setActive(nearest)
  })
  return <section id="processo" className="section section-light studio-section studio-process process-journey" aria-label="Como trabalhamos">
    <div className="container">
      <div className="journey-layout">
        <div className="journey-intro">
          <SectionTitle eyebrow="04 / Como trabalhamos" title="Da sua essência à sua presença." desc="Começamos entendendo o que torna sua marca única. A partir daí, definimos uma direção e criamos cada detalhe junto com você." />
          <Reveal className="journey-route">
            <span className="journey-caption">UM CAMINHO CONSTRUÍDO COM VOCÊ</span>
            <div className="journey-route-stages"><span>Escuta</span><ArrowRight size={17} aria-hidden="true" /><span>Criação</span><ArrowRight size={17} aria-hidden="true" /><span>Presença</span></div>
            <p>Cinco etapas. A sua identidade em todas elas.</p>
          </Reveal>
          <Reveal className="journey-formats"><span><Monitor size={16} aria-hidden="true" />Sites personalizados</span><span><Palette size={16} aria-hidden="true" />Artes para redes sociais</span></Reveal>
        </div>
        <ol ref={list} className="journey-steps" aria-label="As cinco etapas do processo">
          <li className="journey-progress-track" aria-hidden="true"><m.span style={{ scaleY: reduce ? 1 : smoothProgress }} /></li>
          {steps.map(({ icon: Icon, name, desc, outcome }, index) => <Reveal as="li" className={`journey-step${active === index ? ' is-current' : ''}${active > index ? ' is-complete' : ''}`} key={name} delay={index * .03}>
            <span className="journey-number" aria-hidden="true">0{index + 1}</span>
            <div className="journey-card">
              <div className="journey-card-top"><span className="journey-caption">ETAPA 0{index + 1}</span><Icon size={23} strokeWidth={1.5} aria-hidden="true" /></div>
              <h3>{name}</h3>
              <p>{desc}</p>
              <div className="journey-outcome"><Check size={14} aria-hidden="true" /><span>{outcome}</span></div>
            </div>
          </Reveal>)}
        </ol>
      </div>
      <Reveal className="journey-closing">
        <div><span className="journey-caption">DA PRIMEIRA CONVERSA À ENTREGA</span><p>Sua identidade em cada detalhe.<br /><span>Cuidado em cada entrega.</span></p></div>
        <a className="journey-cta" href="#contato">Vamos dar o primeiro passo?<span><ArrowUpRight size={21} aria-hidden="true" /></span></a>
      </Reveal>
    </div>
  </section>
}
