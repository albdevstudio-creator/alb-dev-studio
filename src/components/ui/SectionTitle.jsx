import { Reveal, TextReveal } from '../animation/Motion'
import Eyebrow from './Eyebrow'
export default function SectionTitle({
  eyebrow,
  title,
  desc
}) {
  return <div className="section-heading">
    <Reveal>
      <Eyebrow>{eyebrow}</Eyebrow>
    </Reveal>
    <TextReveal text={title} />{desc && <Reveal delay={.12}>
      <p>{desc}</p>
  </Reveal>}</div>
}
