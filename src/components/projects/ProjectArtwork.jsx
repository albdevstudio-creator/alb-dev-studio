export default function ProjectArtwork({
  project
}) {
  return <div className={`project-art project-${project.theme}`} aria-hidden="true">
    <div className="project-art-meta">
      <span>{project.small}</span>
      <span>ALB / 2026</span>
    </div>
    <div className="project-composition">
    {project.theme === 'domus' && <>
      <div className="domus-architecture">
        <div className="architecture-shadow" />
        <div className="architecture-block block-back" />
        <div className="architecture-block block-front">
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="architecture-stairs" />
      </div>
      <div className="art-editorial">
        <span>UM NOVO OLHAR SOBRE O MORAR</span>
        <strong>domus<span>®</span>
        </strong>
        <p>Espaços para viver.<br />Design para sentir.</p>
        <span className="art-pill">EXPLORE OS ESPAÇOS ↗</span>
      </div>
</>}
    {project.theme === 'aura' && <>
      <div className="aura-halo" />
      <div className="art-editorial">
        <span>THE ART OF SLOW CARE</span>
        <strong>aura<span>®</span>
        </strong>
        <p>O essencial.<br />Em sua melhor forma.</p>
      </div>
      <div className="aura-products">
        <div className="aura-bottle bottle-tall">
          <span>aura.</span>
          <small>DAILY SERUM<br />30 ML / 1 FL.OZ</small>
        </div>
        <div className="aura-bottle bottle-small">
          <span>aura.</span>
          <small>ESSENTIAL CREAM<br />50 ML</small>
        </div>
      </div>
      <span className="aura-caption">EVERYDAY RITUALS, REIMAGINED.</span>
</>}
    {project.theme === 'nexora' && <>
      <div className="nexora-rings">
        <span />
        <span />
        <span />
      </div>
      <div className="art-editorial">
        <span>INTELLIGENCE. WITHOUT LIMITS.</span>
        <strong>nexora<span>↗</span>
        </strong>
        <p>O próximo possível<br />começa agora.</p>
        <span className="art-pill">NEXT DIGITAL FRONTIER</span>
      </div>
      <span className="nexora-coordinate">[ 0.001 — ∞ ]<br />HUMAN IDEAS. DIGITAL POSSIBILITIES.</span>
</>}
    </div>
    <div className="project-art-meta project-art-bottom">
      <span>ALB STUDIO DEV — SELECTED WORK</span>
      <span>{project.theme === 'domus' ? '01' : project.theme === 'aura' ? '02' : '03'} / 03</span>
    </div>
  </div>
}
