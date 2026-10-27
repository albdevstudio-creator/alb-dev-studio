import { ArrowUpRight, Asterisk } from 'lucide-react'
import Brand from '../brand/Brand'
import { footerNavigation } from '../../data/navigation'
import { services } from '../../data/services'
import { contact, whatsappLink } from '../../data/contact'

export default function Footer() {
  return <footer className="footer section-dark studio-footer">
    <div className="container">
      <div className="footer-main">
        <div className="footer-studio"><Brand light /><p>Design gráfico, redes sociais<br />e desenvolvimento web.</p><a className="footer-back" href="#inicio">Voltar ao topo <ArrowUpRight size={17} /></a></div>
        <nav className="footer-column" aria-label="Links do rodapé"><span className="small-label">EXPLORE</span>{footerNavigation.map(({ label, href }) => <a key={href} href={href}>{label}</a>)}</nav>
        <nav className="footer-column" aria-label="Serviços do estúdio"><span className="small-label">O QUE CRIAMOS</span>{services.map(service => <a key={service.number} href={whatsappLink(service.name)} target="_blank" rel="noreferrer">{service.name}</a>)}</nav>
        <div className="footer-column"><span className="small-label">VAMOS CONVERSAR</span><a href={`mailto:${contact.email}`}>{contact.email}</a><a href={whatsappLink()} target="_blank" rel="noreferrer">WhatsApp <ArrowUpRight size={13} /></a><a href={contact.behance} target="_blank" rel="noreferrer">Behance <ArrowUpRight size={13} /></a></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} ALB STUDIO DEV. TODOS OS DIREITOS RESERVADOS.</span><span>FEITO COM INTENÇÃO. <Asterisk size={13} /></span></div>
    </div>
  </footer>
}
