import { MessageCircle, PanelsTopLeft } from 'lucide-react'
import { Reveal } from '../animation/Motion'
import { whatsappLink } from '../../data/contact'

export default function HeroButtons() {
  return <div className="alb-actions">
    <Reveal delay={.42}><a className="alb-button alb-button-primary" href={whatsappLink()} target="_blank" rel="noreferrer">Entrar em contato <span><MessageCircle size={18} aria-hidden="true" /></span></a></Reveal>
    <Reveal delay={.52}><a className="alb-button alb-button-secondary" href="#projetos-no-ar">Ver projetos <span><PanelsTopLeft size={18} aria-hidden="true" /></span></a></Reveal>
  </div>
}
