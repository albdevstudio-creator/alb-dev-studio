import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Asterisk } from 'lucide-react'
import { Reveal } from '../components/animation/Motion'
import SectionTitle from '../components/ui/SectionTitle'
import BrandLogo from '../components/brand/BrandLogo'
export default function BrandSection() {
  const [mode, setMode] = useState('Principal')
  const [copied, setCopied] = useState('')
  const timer = useRef(null)
  useEffect(() => () => clearTimeout(timer.current), [])
  async function copyColor(color) {
    try {
      await navigator.clipboard.writeText(color)
      setCopied(`${color} copiado`)
    } catch {
      setCopied(`Código da cor: ${color}`)
    }
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(''), 3500)
  }
  return <section className="section section-dark identity-section studio-section studio-brand" id="identidade">
    <div className="container">
      <SectionTitle eyebrow="06 / Nossa identidade" title="Uma identidade construída em cada detalhe." desc="Uma assinatura que se estende às cores, aos movimentos e à forma como cada experiência é construída." />
      <Reveal className="brandbook">
        <div className="brandbook-top">
          <span className="small-label">ALB® / VISUAL IDENTITY SYSTEM</span>
          <div className="brand-controls" role="group" aria-label="Visualização da marca">{['Principal', 'Monograma', 'Construção'].map(label => <button type="button" disabled={label === 'Monograma'} title={label === 'Monograma' ? 'Aguardando variante oficial do monograma' : undefined} aria-pressed={mode === label} onClick={() => setMode(label)} key={label}>{label}</button>)}</div>
        </div>
        <div className={`brand-stage ${mode === 'Construção' ? 'show-construction' : ''}`} role="img" aria-label={`Marca ALB Studio Dev: ${mode.toLowerCase()}`}>
          <div className="brand-grid" aria-hidden="true" />
          <div className="brand-stage-glow" />
          <div className="identity-lockup" key={mode} aria-hidden="true">
            <BrandLogo className="brand-stage-logo" decorative />
          </div>
          <span className="brand-stage-note">FEITO COM INTENÇÃO</span>
          <Asterisk className="brand-stage-star" size={40} strokeWidth={1} />
        </div>
        <div className="brandbook-bottom">
          <div className="palette-panel">
            <span className="small-label">01 / PALETA PRINCIPAL</span>
            <div className="swatches">{['#090909', '#F6F3EE', '#C7F36B', '#8A8A8A'].map(color => <button type="button" key={color} onClick={() => copyColor(color)} aria-label={`Copiar cor ${color}`}>
                <span style={{
                  backgroundColor: color
                }} />
                <small>{color}</small>
            </button>)}</div>
            <span className="palette-status" role="status">{copied || 'CLIQUE EM UMA COR PARA COPIAR'}</span>
          </div>
          <div className="type-panel">
            <span className="small-label">02 / TIPOGRAFIA</span>
            <div className="type-specimen">
              <span>Aa</span>
              <div>
                <strong>Space Grotesk</strong>
                <small>PERSONALIDADE NOS TÍTULOS</small>
              </div>
            </div>
            <div className="type-specimen body-specimen">
              <span>Aa</span>
              <div>
                <strong>DM Sans</strong>
                <small>CLAREZA EM CADA PALAVRA</small>
              </div>
            </div>
          </div>
          <div className="graphic-panel">
            <span className="small-label">03 / ELEMENTOS</span>
            <div className="graphic-symbols" aria-hidden="true">
              <Asterisk />
              <ArrowUpRight />
              <span />
            </div>
            <small>SIMPLICIDADE QUE MARCA.</small>
          </div>
        </div>
      </Reveal>
      <div className="brand-applications" aria-label="Aplicações gráficas da identidade ALB">
        <Reveal className="brand-application brand-application-signature"><span>01 / ASSINATURA</span><BrandLogo /><small>ALB STUDIO DEV / ESTÚDIO CRIATIVO</small></Reveal>
        <Reveal className="brand-application brand-application-editorial" delay={.08}><span>02 / LINGUAGEM</span><p>Ideias com<br />identidade<span>.</span></p><small>DESIGN COM INTENÇÃO.</small></Reveal>
        <Reveal className="brand-application brand-application-graphic" delay={.16}><span>03 / MOVIMENTO</span><Asterisk size={88} strokeWidth={1} aria-hidden="true" /><small>CRIATIVIDADE EM CADA DIREÇÃO.</small></Reveal>
      </div>
    </div>
  </section>
}
