import { Reveal } from '../components/animation/Motion'
import SectionTitle from '../components/ui/SectionTitle'
import { differentials } from '../data/differentials'

export default function DifferentialsSection() {
  return <section id="diferenciais" className="section section-dark studio-section studio-differentials">
    <div className="container differential-layout">
      <div className="differential-intro">
        <SectionTitle eyebrow="04 / O que faz a diferença" title="Pensado como um todo." />
      </div>
      <div className="differential-list">
        {differentials.map(({ title, description }, index) => <Reveal className="differential-row" key={title} delay={index * .06}>
          <span className="differential-number">0{index + 1}</span>
          <div><h3>{title}</h3><p>{description}</p></div>
        </Reveal>)}
      </div>
    </div>
  </section>
}
