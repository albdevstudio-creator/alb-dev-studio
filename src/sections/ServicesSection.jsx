import { ArrowUpRight, Asterisk, Wrench } from 'lucide-react'
import { Reveal } from '../components/animation/Motion'
import SectionTitle from '../components/ui/SectionTitle'
import { serviceGroups, maintenanceService } from '../data/services'
import { whatsappLink } from '../data/contact'
import SectionAtmosphere from '../components/ui/SectionAtmosphere'
import GlowSurface from '../components/ui/GlowSurface'

function ServiceIllustration({ type }) {
  if (type === 'web') return <div className="service-art service-art-web" aria-hidden="true">
    <div className="service-browser"><div className="service-browser-top"><span><i /><i /><i /></span><span>sua marca / seu espaço</span></div><div className="service-browser-content"><div><span className="service-art-eyebrow">FEITO PARA SER SEU</span><strong>Sua marca.<br />Seu espaço.</strong><span className="service-art-button">Conheça sua próxima presença ↗</span></div><div className="service-browser-art"><Asterisk size={70} strokeWidth={1} /><span>IDENTIDADE<br />EM CADA DETALHE</span></div></div></div>
  </div>
  return <div className="service-art service-art-social" aria-hidden="true">
    <div className="service-post service-post-back"><span>SUA MARCA / 01</span><Asterisk size={50} strokeWidth={1} /><small>PERSONALIDADE.</small></div>
    <div className="service-post service-post-main"><span>DESIGN COM INTENÇÃO</span><strong>Ideias que<br />conectam.</strong><div><i /><i /><i /></div><small>SUA MARCA / SUA LINGUAGEM</small></div>
    <div className="service-post service-post-front"><span>SUA MARCA / 03</span><strong>Uma<br />presença<br />única.</strong><small>FEITO SOB MEDIDA ↗</small></div>
  </div>
}

export default function ServicesSection() {
  return <section id="servicos" className="section section-dark services-section studio-section studio-services services-offering">
    <SectionAtmosphere />
    <div className="container">
      <SectionTitle eyebrow="02 / O que fazemos" title="Como sua marca pode ganhar presença?" desc="No seu próprio site ou em cada publicação. Criamos soluções sob medida para expressar sua identidade e aproximar sua marca das pessoas." />
      <div className="service-offering-grid">
        {serviceGroups.map(({ id, number, icon: Icon, tag, name, desc, includes, action, request, note }, index) => <Reveal as="article" key={id} delay={index * .08}>
          <GlowSurface className={`service-offering-card service-offering-${id}`}>
            <div className="service-offering-top"><span>/{number}</span><Icon size={25} strokeWidth={1.4} aria-hidden="true" /></div>
            <span className="service-offering-tag">{tag}</span>
            <h3>{name}</h3>
            <p className="service-offering-description">{desc}</p>
            <ServiceIllustration type={id} />
            <ul className="service-offering-includes" aria-label={`Entregas de ${name}`}>{includes.map(item => <li key={item}>{item}</li>)}</ul>
            <div className="service-offering-bottom"><span>{note}</span><a href={whatsappLink(request)} target="_blank" rel="noopener noreferrer">{action}<ArrowUpRight size={19} aria-hidden="true" /></a></div>
          </GlowSurface>
        </Reveal>)}
      </div>
      <Reveal className="service-maintenance-wrap" delay={.12}>
        <GlowSurface as="a" className="service-maintenance" href={whatsappLink(maintenanceService.name)} target="_blank" rel="noopener noreferrer">
          <span className="service-maintenance-icon"><Wrench size={24} strokeWidth={1.4} aria-hidden="true" /></span>
          <div className="service-maintenance-copy"><span>DEPOIS DA ENTREGA, O CUIDADO CONTINUA</span><h3>Seu site pode continuar evoluindo.</h3><p>Atualizações, melhorias e suporte, com escopo e frequência combinados para o que sua marca precisa.</p></div>
          <span className="service-maintenance-cta">Quero cuidar do meu site <ArrowUpRight size={19} aria-hidden="true" /></span>
        </GlowSurface>
      </Reveal>
    </div>
  </section>
}
