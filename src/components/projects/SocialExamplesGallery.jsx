import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowUpRight, ChevronLeft, ChevronRight, Images, Layers, LoaderCircle, Maximize2, Minus, Plus, RotateCcw, Smartphone, X } from 'lucide-react'
import { socialProjects } from '../../data/socialProjects'
import { whatsappLink } from '../../data/contact'

const formats = [
  { id: 'post', label: 'Post estático', icon: Images },
  { id: 'carousel', label: 'Carrossel', icon: Layers },
  { id: 'story', label: 'Story', icon: Smartphone },
]

function GalleryArtwork({ image }) {
  const [loadedSource, setLoadedSource] = useState(null)
  const [failedSource, setFailedSource] = useState(null)
  const [attempt, setAttempt] = useState(0)
  const status = failedSource === image.src ? 'error' : loadedSource === image.src ? 'ready' : 'loading'

  return <div className="social-gallery-artwork" aria-busy={status === 'loading'}>
    {status === 'loading' && <span className="social-gallery-loading" role="status"><LoaderCircle size={22} aria-hidden="true" />Carregando arte…</span>}
    {status === 'error' && <div className="social-gallery-error" role="alert"><p>Não foi possível carregar esta arte.</p><button type="button" onClick={() => { setFailedSource(null); setLoadedSource(null); setAttempt(value => value + 1) }}>Tentar novamente</button></div>}
    <img key={attempt} className={status === 'ready' ? 'is-ready' : ''} src={image.src} alt={image.alt} width={image.width} height={image.height}
      hidden={status === 'error'} decoding="async" draggable="false" onLoad={event => setLoadedSource(event.currentTarget.getAttribute('src'))} onError={event => setFailedSource(event.currentTarget.getAttribute('src'))} />
  </div>
}

function ExpandedArtwork({ image, project, format, onBack, onClose, backButton }) {
  const viewport = useRef(null)
  const [size, setSize] = useState({ width: 0, height: 0 })
  const [zoom, setZoom] = useState(1)
  const scale = Math.max(.001, Math.min((size.width - 32) / image.width, (size.height - 32) / image.height, 1))
  const width = image.width * scale * zoom
  const height = image.height * scale * zoom

  useEffect(() => {
    const element = viewport.current
    function measure() {
      setSize(previous => previous.width === element.clientWidth && previous.height === element.clientHeight ? previous : { width: element.clientWidth, height: element.clientHeight })
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const element = viewport.current
    element.scrollTo({ left: (element.scrollWidth - element.clientWidth) / 2, top: (element.scrollHeight - element.clientHeight) / 2 })
  }, [zoom, size])

  return <div className="social-art-zoom">
    <header className="social-zoom-header">
      <button ref={backButton} className="social-zoom-back" type="button" onClick={onBack} aria-label="Voltar à galeria"><ChevronLeft size={19} aria-hidden="true" /><span>Voltar à galeria</span></button>
      <div><h2 id="social-zoom-title">Arte ampliada</h2><p id="social-zoom-description">{project.name} · {format.label}</p></div>
      <button className="social-gallery-close" type="button" aria-label="Fechar exemplos de artes" onClick={onClose}><X size={21} aria-hidden="true" /></button>
    </header>
    <div className="social-zoom-toolbar">
      <div role="group" aria-label="Zoom da arte">
        <button type="button" aria-label="Diminuir zoom" disabled={zoom === 1} onClick={() => setZoom(value => Math.max(1, value - .5))}><Minus size={18} aria-hidden="true" /></button>
        <span role="status" aria-live="polite">{zoom.toLocaleString('pt-BR')}×</span>
        <button type="button" aria-label="Aumentar zoom" disabled={zoom === 4} onClick={() => setZoom(value => Math.min(4, value + .5))}><Plus size={18} aria-hidden="true" /></button>
        <button type="button" aria-label="Restaurar enquadramento" onClick={() => setZoom(1)}><RotateCcw size={16} aria-hidden="true" /></button>
      </div>
      <p id="social-zoom-help">Aumente o zoom e role para explorar os detalhes.</p>
    </div>
    <div ref={viewport} className="social-zoom-viewport" tabIndex={0} role="region" aria-label="Arte ampliada" aria-describedby="social-zoom-help">
      <div className="social-zoom-canvas" style={{ width: Math.max(size.width, width + 32), height: Math.max(size.height, height + 32) }}>
        <div className="social-zoom-image" style={{ width, height }}><GalleryArtwork image={{ ...image, src: image.fullSrc }} /></div>
      </div>
    </div>
  </div>
}

function SocialGalleryDialog({ onClose, returnFocusRef, initialBrand }) {
  const dialog = useRef(null)
  const brandTabs = useRef([])
  const swipeStart = useRef(null)
  const backdropStart = useRef(false)
  const expandButton = useRef(null)
  const backButton = useRef(null)
  const wasExpanded = useRef(false)
  const [selected, setSelected] = useState(initialBrand)
  const [format, setFormat] = useState('post')
  const [page, setPage] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const project = socialProjects[selected]
  const images = project.formats[format]
  const activeFormat = formats.find(item => item.id === format)
  const isCarousel = images.length > 1
  const nextSource = images[page + 1]?.src
  const formatSummary = isCarousel ? `${activeFormat.label} · ${images.length} páginas` : `${activeFormat.label} · ${format === 'story' ? 'Vertical' : 'Feed'}`

  useEffect(() => {
    const element = dialog.current
    const opener = returnFocusRef.current
    const rootOverflow = document.documentElement.style.overflow
    const bodyOverflow = document.body.style.overflow
    element.showModal()
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    return () => {
      element.close()
      document.documentElement.style.overflow = rootOverflow
      document.body.style.overflow = bodyOverflow
      opener?.focus({ preventScroll: true })
    }
  }, [returnFocusRef])

  useEffect(() => {
    if (expanded) {
      backButton.current?.focus({ preventScroll: true })
      wasExpanded.current = true
    } else if (wasExpanded.current) {
      expandButton.current?.focus({ preventScroll: true })
      wasExpanded.current = false
    }
  }, [expanded])

  useEffect(() => {
    if (!nextSource || expanded) return
    const next = new Image()
    next.decoding = 'async'
    next.src = nextSource
  }, [nextSource, expanded])

  function selectBrand(index) {
    setSelected(index)
    setPage(0)
  }

  function changeBrandWithKeyboard(event, index) {
    const count = socialProjects.length
    const next = { ArrowRight: (index + 1) % count, ArrowLeft: (index + count - 1) % count, Home: 0, End: count - 1 }[event.key]
    if (next === undefined) return
    event.preventDefault()
    selectBrand(next)
    brandTabs.current[next]?.focus({ preventScroll: true })
  }

  function movePage(next) {
    setPage(Math.max(0, Math.min(images.length - 1, next)))
  }

  function changePageWithKeyboard(event) {
    if (!isCarousel) return
    const next = { ArrowRight: page + 1, ArrowLeft: page - 1, Home: 0, End: images.length - 1 }[event.key]
    if (next === undefined) return
    event.preventDefault()
    movePage(next)
  }

  function keepFocusInDialog(event) {
    if (event.key !== 'Tab') return
    const targets = [...dialog.current.querySelectorAll('button:not(:disabled), a[href], [tabindex="0"]')]
      .filter(element => element.tabIndex >= 0 && element.getClientRects().length > 0)
    const first = targets[0]
    const last = targets[targets.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last?.focus({ preventScroll: true })
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first?.focus({ preventScroll: true })
    }
  }

  function finishSwipe(event) {
    const start = swipeStart.current
    swipeStart.current = null
    if (!start || start.pointerId !== event.pointerId || !isCarousel) return
    const dx = event.clientX - start.x
    const dy = event.clientY - start.y
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.2) movePage(page + (dx < 0 ? 1 : -1))
  }

  return createPortal(<dialog ref={dialog} id="social-examples-dialog" className={`social-gallery${expanded ? ' is-expanded' : ''}`} aria-labelledby={expanded ? 'social-zoom-title' : 'social-gallery-title'} aria-describedby={expanded ? 'social-zoom-description' : 'social-gallery-description'}
    style={{ '--gallery-accent': project.accent }} onCancel={event => { event.preventDefault(); if (expanded) setExpanded(false); else onClose() }} onKeyDown={keepFocusInDialog}
    onPointerDown={event => { backdropStart.current = event.target === event.currentTarget }}
    onClick={event => { if (backdropStart.current && event.target === event.currentTarget) onClose() }}>
    {expanded ? <ExpandedArtwork image={images[page]} project={project} format={activeFormat} onBack={() => setExpanded(false)} onClose={onClose} backButton={backButton} /> : <div className="social-gallery-shell">
      <header className="social-gallery-header">
        <div><span className="social-gallery-eyebrow">SELEÇÃO ALB / REDES SOCIAIS</span><h2 id="social-gallery-title">Exemplos de artes.</h2><p id="social-gallery-description">Escolha uma marca e explore cada formato.</p></div>
        <button className="social-gallery-close" type="button" aria-label="Fechar exemplos de artes" onClick={onClose} autoFocus><X size={21} aria-hidden="true" /></button>
      </header>
      <div className="social-gallery-controls">
        <div className="social-gallery-brands" role="tablist" aria-label="Escolher marca">
          {socialProjects.map((item, index) => <button key={item.id} ref={element => { brandTabs.current[index] = element }} type="button" role="tab"
            id={`social-gallery-tab-${item.id}`} aria-selected={selected === index} aria-controls="social-gallery-project" tabIndex={selected === index ? 0 : -1}
            onClick={() => selectBrand(index)} onKeyDown={event => changeBrandWithKeyboard(event, index)}><span aria-hidden="true">0{index + 1}</span>{item.name}</button>)}
        </div>
        <div className="social-gallery-formats" role="group" aria-label="Formato da arte">
          {formats.map(({ id, label, icon: Icon }) => <button key={id} type="button" aria-pressed={format === id} onClick={() => { setFormat(id); setPage(0) }}><Icon size={15} aria-hidden="true" />{label}</button>)}
        </div>
      </div>
      <div id="social-gallery-project" className="social-gallery-project" role="tabpanel" aria-labelledby={`social-gallery-tab-${project.id}`} tabIndex={0}>
        <div className="social-gallery-preview" role={isCarousel ? 'region' : undefined} aria-roledescription={isCarousel ? 'carrossel' : undefined}
          aria-label={`${project.name} — ${activeFormat.label}`} tabIndex={isCarousel ? 0 : undefined} onKeyDown={changePageWithKeyboard}
          onPointerDown={event => {
            if (event.pointerType !== 'touch' || !isCarousel || event.target.closest('button')) return
            swipeStart.current = { x: event.clientX, y: event.clientY, pointerId: event.pointerId }
          }} onPointerUp={finishSwipe} onPointerCancel={() => { swipeStart.current = null }}>
          <div className="social-gallery-art-toolbar"><span>{formatSummary}</span><button ref={expandButton} type="button" onClick={() => setExpanded(true)}><Maximize2 size={15} aria-hidden="true" />Ampliar arte</button></div>
          <GalleryArtwork image={images[page]} />
          {isCarousel && <div className="social-gallery-carousel-controls"><div className="social-gallery-navigation" role="group" aria-label="Páginas do carrossel">
            <button className="social-gallery-arrow" type="button" aria-label="Página anterior" disabled={page === 0} onClick={() => movePage(page - 1)}><ChevronLeft size={20} aria-hidden="true" /></button>
            <div className="social-gallery-pages">{images.map((image, index) => <button key={image.src} type="button" aria-label={`Ver página ${index + 1}`} aria-current={page === index ? 'true' : undefined} onClick={() => setPage(index)}><span /></button>)}</div>
            <span className="social-gallery-page-count" aria-hidden="true">{page + 1} / {images.length}</span>
            <button className="social-gallery-arrow" type="button" aria-label="Próxima página" disabled={page === images.length - 1} onClick={() => movePage(page + 1)}><ChevronRight size={20} aria-hidden="true" /></button>
          </div><p className="social-gallery-swipe-hint">Deslize para explorar</p></div>}
        </div>
        <footer className="social-gallery-footer">
          <div><span className="social-gallery-brand-name">{project.name}</span><span className="social-gallery-category">{project.category}</span></div>
          <a className="social-gallery-contact" href={whatsappLink(`criação de artes para minha marca no formato ${activeFormat.label.toLowerCase()} (referência: exemplos de ${project.name})`)} target="_blank" rel="noopener noreferrer">Quero artes para minha marca<ArrowUpRight size={17} aria-hidden="true" /></a>
        </footer>
      </div>
      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">{project.name}, {activeFormat.label}{isCarousel ? `, página ${page + 1} de ${images.length}. Use as setas do teclado ou deslize para navegar.` : '.'}</p>
    </div>}
  </dialog>, document.body)
}

export default function SocialExamplesGallery() {
  const [open, setOpen] = useState(false)
  const [initialBrand, setInitialBrand] = useState(0)
  const opener = useRef(null)

  function openGallery(event, index = 0) {
    opener.current = event.currentTarget
    setInitialBrand(index)
    setOpen(true)
  }

  function revealCard(event) {
    const card = event.currentTarget
    const row = card.parentElement
    if (row.scrollWidth <= row.clientWidth || !card.matches(':focus-visible')) return
    row.scrollTo({ left: row.scrollLeft + card.getBoundingClientRect().left - row.getBoundingClientRect().left - 2 })
  }

  return <div className="social-examples-entry">
    <div className="social-examples-heading">
      <h4>Explore nossas criações</h4>
      <p id="social-examples-description" className="social-examples-description">Escolha uma marca para ver posts, carrosséis e stories.</p>
    </div>
    <div className="social-examples-thumbnails" role="group" aria-label="Prévia das marcas" aria-describedby="social-examples-description">
      {socialProjects.map((project, index) => <button key={project.id} className="social-example-card" type="button" aria-label={`Ver exemplos da ${project.name}`} aria-haspopup="dialog" aria-expanded={open && initialBrand === index} aria-controls={open && initialBrand === index ? 'social-examples-dialog' : undefined} onFocus={revealCard} onClick={event => openGallery(event, index)} style={{ '--thumbnail-accent': project.accent }}>
        <img src={project.thumbnail} srcSet={`${project.thumbnail} 240w, ${project.formats.post[0].src} 810w`} sizes="(max-width: 760px) 70vw, (max-width: 1200px) 20vw, 180px" alt="" width={240} height={300} loading="lazy" decoding="async" />
        <span className="social-example-caption"><strong>{project.name}</strong><span className="social-example-action">Ver artes <ArrowUpRight size={14} aria-hidden="true" /></span></span>
      </button>)}
    </div>
    <p id="social-examples-scroll-hint" className="social-examples-scroll-hint">Deslize para conhecer as marcas <ChevronRight size={14} aria-hidden="true" /></p>
    {open && <SocialGalleryDialog initialBrand={initialBrand} onClose={() => setOpen(false)} returnFocusRef={opener} />}
  </div>
}
