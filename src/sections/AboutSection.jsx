import { ArrowUpRight, Asterisk } from 'lucide-react'
import { Reveal, TextReveal } from '../components/animation/Motion'
import Eyebrow from '../components/ui/Eyebrow'
import { pillars } from '../data/about'
import SectionAtmosphere from '../components/ui/SectionAtmosphere'

export default function AboutSection() {
  return <section id="sobre" className="section section-light studio-section studio-about">
    <SectionAtmosphere quiet />
    <div className="container">
      <Reveal className="studio-section-meta"><Eyebrow>03 / Nossa essência</Eyebrow><span>DESIGN × TECNOLOGIA</span></Reveal>
      <div className="about-editorial">
        <div>
          <h2 className="about-heading" aria-label="Design com intenção. Tecnologia com propósito.">
            <TextReveal as="span" text="Design com intenção." />
            <TextReveal as="span" text="Tecnologia com propósito." delay={.12} />
          </h2>
          <Reveal><a href="#servicos" className="text-link">Descubra o que fazemos <ArrowUpRight size={18} /></a></Reveal>
        </div>
        <Reveal className="about-intro" delay={.15}>
          <Asterisk size={68} strokeWidth={1} className="about-graphic" aria-hidden="true" />
          <p>A ALB Studio Dev é um estúdio criativo independente que une design gráfico e desenvolvimento web. Criamos sites, artes para redes sociais e peças para campanhas, com uma linguagem visual que conecta cada ponto de contato à identidade da sua marca.</p>
          <span className="about-annotation">IDEIAS COM PERSONALIDADE.<br />EXPERIÊNCIAS COM PROPÓSITO.</span>
        </Reveal>
      </div>
      <div className="pillars">
        {pillars.map(({ icon: Icon, name, desc }, index) => <Reveal className="pillar" delay={index * .1} key={name}>
          <div className="pillar-top"><span>0{index + 1}</span><Icon size={25} strokeWidth={1.3} /></div>
          <h3>{name}<span>.</span></h3><p>{desc}</p>
        </Reveal>)}
      </div>
    </div>
  </section>
}
