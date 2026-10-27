import { MotionProvider } from './components/animation/Motion'
import HeroSection from './components/hero/HeroSection'
import AboutSection from './sections/AboutSection'
import ServicesSection from './sections/ServicesSection'
import ProcessSection from './sections/ProcessSection'
import FAQSection from './sections/FAQSection'
import ContactSection from './sections/ContactSection'
import Footer from './components/layout/Footer'
import LiveProjectsSection from './sections/LiveProjectsSection'
import EngagementSection from './sections/EngagementSection'
import Header from './components/layout/Header'
import PageScrollbar from './components/layout/PageScrollbar'

export default function App() {
  return (
    <MotionProvider>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo">
        <HeroSection />
        <LiveProjectsSection />
        <ServicesSection />
        <AboutSection />
        <ProcessSection />
        <EngagementSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
      <PageScrollbar />
    </MotionProvider>
  )
}
