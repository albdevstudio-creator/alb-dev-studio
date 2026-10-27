import logo from '../../assets/alb.png'

// The source has transparent margins: display the entire image at its native ratio.
export default function BrandLogo({ className = '', decorative = false }) {
  return <img className={`brand-logo ${className}`} src={logo} alt={decorative ? '' : 'ALB Studio Dev'} width={2000} height={2000} draggable="false" />
}
