import { ArrowUpRight, Mail, MessageCircle, Send } from 'lucide-react'
import { Reveal, TextReveal } from '../components/animation/Motion'
import Eyebrow from '../components/ui/Eyebrow'
import BrandLogo from '../components/brand/BrandLogo'
import SectionAtmosphere from '../components/ui/SectionAtmosphere'
import { contact, whatsappLink } from '../data/contact'

export default function ContactSection() {
  return <section id="contato" className="contact-section section-dark studio-section studio-contact">
    <div className="contact-glow" aria-hidden="true" /><SectionAtmosphere />
    <div className="container contact-content">
      <Reveal className="contact-brand"><BrandLogo /></Reveal>
      <Reveal><Eyebrow>07 / Vamos conversar?</Eyebrow></Reveal>
      <TextReveal text="Vamos dar forma à sua próxima ideia?" className="contact-title" />
      <Reveal delay={.1}><p>Um site, artes para suas redes sociais ou uma campanha? Conte o que sua marca precisa e vamos criar uma solução com identidade.</p></Reveal>
      <div className="studio-contact-actions">
        <Reveal delay={.2}><a className="studio-pill studio-pill-lime" href={`mailto:${contact.email}?subject=${encodeURIComponent('Orçamento — ALB Studio Dev')}`}>Solicitar orçamento <Send size={18} aria-hidden="true" /></a></Reveal>
        <Reveal delay={.3}><a className="studio-pill studio-pill-paper" href={whatsappLink()} target="_blank" rel="noreferrer">Falar no WhatsApp <MessageCircle size={18} aria-hidden="true" /></a></Reveal>
      </div>
      <Reveal delay={.35}><a className="contact-email" href={`mailto:${contact.email}`}><Mail size={16} />{contact.email}<ArrowUpRight size={15} /></a></Reveal>
    </div>
  </section>
}
