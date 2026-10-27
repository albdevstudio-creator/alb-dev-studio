import BrandLogo from './BrandLogo'

export default function Brand({ light = false }) {
  return (
    <a href="#inicio" aria-label="ALB Studio Dev — voltar ao início" className={`brand ${light ? 'brand-light' : ''}`}>
      <BrandLogo decorative />
    </a>
  )
}
