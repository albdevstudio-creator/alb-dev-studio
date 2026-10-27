import { ArrowDown, Asterisk } from 'lucide-react'
import { Reveal, TextReveal } from '../animation/Motion'
import HeroBackgroundEffects from './HeroBackgroundEffects'
import HeroButtons from './HeroButtons'
import HeroProjectsShowcase from './HeroProjectsShowcase'

export default function HeroSection() {
  return <section id="inicio" className="hero alb-hero section-dark" aria-labelledby="hero-title">
    <HeroBackgroundEffects />
    <div className="container alb-hero-main">
      <div className="alb-hero-copy">
        <Reveal><div className="alb-hero-eyebrow"><span />ESTÚDIO CRIATIVO INDEPENDENTE</div></Reveal>
        <h1 id="hero-title" className="hero-title" aria-label="Sua essência. Uma presença única."><TextReveal as="span" text="Sua essência." onLoad delay={.08} /><TextReveal as="span" className="alb-title-accent" text="Uma presença única." onLoad delay={.16} /></h1>
        <Reveal delay={.32}><p className="alb-hero-description">Design, sites e artes para redes sociais feitos sob medida para expressar a personalidade da sua marca e conectar você ao seu público.</p></Reveal>
        <HeroButtons />
        <Reveal delay={.6}><div className="alb-copy-signature"><Asterisk size={21} strokeWidth={1.3} /><span>Do seu site à arte do próximo post.</span></div></Reveal>
      </div>
      <Reveal className="alb-showcase-reveal" delay={.3}><HeroProjectsShowcase /></Reveal>
    </div>
    <div className="container alb-hero-bottom"><span>DESIGN + ESTRATÉGIA + TECNOLOGIA</span><a href="#sobre">EXPLORE O ESTÚDIO <ArrowDown size={15} /></a><span>FEITO PARA TER IDENTIDADE <Asterisk size={15} /></span></div>
  </section>
}
