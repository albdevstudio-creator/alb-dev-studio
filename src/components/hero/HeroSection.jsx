import { ArrowDown, Asterisk } from 'lucide-react'
import { Reveal, TextReveal } from '../animation/Motion'
import Header from '../layout/Header'
import HeroBackgroundEffects from './HeroBackgroundEffects'
import HeroButtons from './HeroButtons'
import HeroProjectsShowcase from './HeroProjectsShowcase'

export default function HeroSection() {
  return <section id="inicio" className="hero alb-hero section-dark" aria-labelledby="hero-title">
    <HeroBackgroundEffects />
    <Header />
    <div className="container alb-hero-main">
      <div className="alb-hero-copy">
        <Reveal><div className="alb-hero-eyebrow"><span />ESTÚDIO CRIATIVO INDEPENDENTE</div></Reveal>
        <h1 id="hero-title" className="hero-title" aria-label="Experiências digitais com identidade."><TextReveal as="span" text="Experiências" onLoad delay={.08} /><TextReveal as="span" text="Digitais" onLoad delay={.16} /><TextReveal as="span" className="alb-title-accent" text="Com identidade" onLoad delay={.25} /></h1>
        <Reveal delay={.32}><p className="alb-hero-description">Design, estratégia e desenvolvimento para criar presenças digitais personalizadas</p></Reveal>
        <HeroButtons />
        <Reveal delay={.6}><div className="alb-copy-signature"><Asterisk size={21} strokeWidth={1.3} /><span>Visão criativa. Código com intenção.</span></div></Reveal>
      </div>
      <Reveal className="alb-showcase-reveal" delay={.3}><HeroProjectsShowcase /></Reveal>
    </div>
    <div className="container alb-hero-bottom"><span>DESIGN + ESTRATÉGIA + TECNOLOGIA</span><a href="#sobre">EXPLORE O ESTÚDIO <ArrowDown size={15} /></a><span>FEITO PARA TER IDENTIDADE <Asterisk size={15} /></span></div>
  </section>
}
