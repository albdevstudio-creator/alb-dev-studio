import { ArrowUpRight, Asterisk } from 'lucide-react'
import { Reveal } from '../components/animation/Motion'
import SectionTitle from '../components/ui/SectionTitle'
import { services } from '../data/services'
import { whatsappLink } from '../data/contact'
import SectionAtmosphere from '../components/ui/SectionAtmosphere'
import GlowSurface from '../components/ui/GlowSurface'
export default function ServicesSection() {
  return <section id="servicos" className="section section-dark services-section studio-section studio-services">
    <SectionAtmosphere />
    <div className="container">
      <SectionTitle eyebrow="02 / O que fazemos" title="O que sua marca precisa agora?" desc="Uma nova página, um site completo ou cuidado contínuo com a sua presença digital. Encontre o ponto de partida para o seu projeto." />
      <div className="service-list">{services.map(({
          icon: Icon,
          number,
          name,
          tag,
          desc,
          includes,
          action
        }, i) => <Reveal key={number} delay={i * .05}>
          <GlowSurface as="a" className={`service-row service-row-${i}`} href={whatsappLink(name)} target="_blank" rel="noreferrer">
            <span className="service-number">/{number}</span>
            <div className="service-name">
              <span className="small-label">{tag}</span>
              <h3>{name}</h3>
            </div>
            <div className="service-icon" aria-hidden="true"><Icon size={28} strokeWidth={1.3} /></div>
            <div className="service-details">
              <p>{desc}</p>
              <ul className="service-includes" aria-label={`Possibilidades para ${name}`}>
                {includes.map(item => <li key={item}>{item}</li>)}
              </ul>
              <span className="service-cta">{action}</span>
            </div>
            <span className="service-arrow">
              <ArrowUpRight size={25} />
            </span>
          </GlowSurface>
      </Reveal>)}</div>
      <Reveal className="service-foot">
        <span>UMA VISÃO INTEGRADA. MÚLTIPLAS POSSIBILIDADES.</span>
        <Asterisk size={25} />
      </Reveal>
    </div>
  </section>
}
