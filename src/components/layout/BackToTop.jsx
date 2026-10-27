import { ArrowUp } from 'lucide-react'

export default function BackToTop() {
  return <a className="back-to-top" href="#inicio" aria-label="Voltar ao topo" title="Voltar ao topo">
    <ArrowUp size={22} aria-hidden="true" />
  </a>
}
