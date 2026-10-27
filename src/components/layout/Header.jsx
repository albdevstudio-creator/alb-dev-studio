import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import Brand from '../brand/Brand'
import { navigation } from '../../data/navigation'
import { whatsappLink } from '../../data/contact'

export default function Header() {
  const [open, setOpen] = useState(false)
  const toggle = useRef(null)

  useEffect(() => {
    function escape(event) {
      if (event.key === 'Escape' && open) {
        setOpen(false)
        toggle.current?.focus()
      }
    }
    window.addEventListener('keydown', escape)
    return () => window.removeEventListener('keydown', escape)
  }, [open])

  return (
    <header className="site-header alb-header">
      <div className="container header-inner">
        <Brand light />
        <nav id="main-nav" className={`nav-links ${open ? 'nav-open' : ''}`} aria-label="Menu principal">
          {navigation.map(({ label, href }) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
          ))}
          <a className="nav-mobile-cta" href={whatsappLink()} target="_blank" rel="noreferrer">
            Vamos conversar <ArrowUpRight size={18} />
          </a>
        </nav>
        <a className="header-cta" href={whatsappLink()} target="_blank" rel="noreferrer">
          Vamos conversar <ArrowUpRight size={16} />
        </a>
        <button
          ref={toggle}
          className="menu-toggle"
          type="button"
          aria-controls="main-nav"
          aria-expanded={open}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen(value => !value)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  )
}
