import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '../components/animation/Motion'
import SectionTitle from '../components/ui/SectionTitle'
import { engagements } from '../data/engagements'
import { whatsappLink } from '../data/contact'

export default function EngagementSection() {
  return <section id="contratacao" className="section section-dark studio-section studio-engagements">
    <div className="container">
      <SectionTitle eyebrow="05 / Formatos de contratação" title="Uma solução para cada momento da sua marca." desc="Diferentes formas de começar. O mesmo cuidado em cada entrega." />
      <div className="engagement-list">
        {engagements.map(item => <Reveal as="article" className="engagement-row" key={item.id}>
          <span className="engagement-index">/{item.number}</span>
          <div className="engagement-heading"><span className="small-label">{item.format}</span><h3>{item.title}</h3><ul>{item.services.map(service => <li key={service}>{service}</li>)}</ul></div>
          <div className="engagement-description"><p>{item.description}</p><a className="text-link" href={whatsappLink(item.request)} target="_blank" rel="noreferrer">Solicitar orçamento <ArrowUpRight size={18} /></a></div>
        </Reveal>)}
      </div>
    </div>
  </section>
}
