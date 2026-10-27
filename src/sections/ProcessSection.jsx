import { Check } from 'lucide-react'
import { Reveal, Timeline } from '../components/animation/Motion'
import SectionTitle from '../components/ui/SectionTitle'
import { steps } from '../data/process'

export default function ProcessSection() {
  return <section id="processo" className="section section-light studio-section studio-process">
    <div className="container">
      <div className="process-intro"><SectionTitle eyebrow="04 / Como trabalhamos" title="Da ideia à experiência." desc="Boas perguntas. Decisões com intenção. Um caminho claro entre o que você imagina e o que colocamos no mundo." /><Reveal><span className="process-coordinate">IDEIA → DIREÇÃO → EXPERIÊNCIA<br /><span>CINCO ETAPAS. UMA VISÃO INTEGRADA.</span></span></Reveal></div>
      <Timeline>{steps.map(({ icon: Icon, name, desc }, index) => <Reveal as="li" className={`timeline-step ${index % 2 ? 'step-right' : 'step-left'}`} key={name}>
        <span className="timeline-dot" aria-hidden="true" />
        <div className="timeline-content"><span className="timeline-number">0{index + 1}</span><div><Icon size={23} strokeWidth={1.4} /><h3>{name}</h3><p>{desc}</p></div></div>
      </Reveal>)}</Timeline>
      <Reveal className="process-end"><Check size={15} /><span>DESIGN COM INTENÇÃO. ENTREGA COM CUIDADO.</span></Reveal>
    </div>
  </section>
}
