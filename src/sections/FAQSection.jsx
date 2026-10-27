import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Reveal } from '../components/animation/Motion'
import SectionTitle from '../components/ui/SectionTitle'
import { faq } from '../data/faq'
export default function FAQSection() {
  const [opened, setOpened] = useState(0)
  return <section id="faq" className="section section-light faq-section studio-section studio-faq">
    <div className="container faq-container">
      <SectionTitle eyebrow="06 / Dúvidas frequentes" title="Clareza antes de começar." />
      <div className="faq-items">{faq.map((f, i) => <Reveal className={`faq-item ${opened === i ? 'faq-open' : ''}`} key={f.q}>
          <h3>
            <button id={`faq-question-${i}`} type="button" aria-expanded={opened === i} aria-controls={`faq-answer-${i}`} onClick={() => setOpened(opened === i ? -1 : i)}>
              <span className="faq-index">0{i + 1}</span>
              <span>{f.q}</span>
              <Plus size={20} />
            </button>
          </h3>
          <div className="faq-answer" id={`faq-answer-${i}`} role="region" aria-labelledby={`faq-question-${i}`} aria-hidden={opened !== i}>
            <div>
              <p>{f.a}</p>
            </div>
          </div>
      </Reveal>)}</div>
    </div>
  </section>
}
