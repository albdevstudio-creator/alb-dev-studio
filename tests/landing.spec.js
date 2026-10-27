import { test, expect } from '@playwright/test'

for (const width of [320, 390, 768, 1024, 1440, 1920, 2560]) {
  test(`layout stays within the viewport at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    const errors = []
    page.on('pageerror', error => errors.push(error.message))
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toHaveAccessibleName('Experiências digitais com identidade.')
    for (const selector of ['#inicio', '#sobre', '#servicos', '#projetos', '#projetos-no-ar', '#processo', '#contratacao', '.faq-section', '#contato']) {
      const section = page.locator(selector)
      await section.scrollIntoViewIfNeeded()
      await expect(section).toBeVisible()
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    }
    await expect(page.locator('.service-details p')).toHaveCount(4)
    await expect(page.locator('.concept-label')).toHaveCount(3)
    await expect(page.locator('.timeline-step')).toHaveCount(5)
    await expect(page.getByText(/R\$|Sob consulta|Investimento/)).toHaveCount(0)
    const viewport = await page.evaluate(() => document.documentElement.clientWidth)
    expect(await page.locator('.hero').evaluate(el => el.getBoundingClientRect().width)).toBe(viewport)
    expect(await page.locator('.hero').evaluate(el => el.getBoundingClientRect().height)).toBeGreaterThanOrEqual(900 - (width <= 760 ? 76 : 88))
    if (width >= 1920) expect(await page.locator('.header-inner').evaluate(el => el.getBoundingClientRect().width)).toBeGreaterThan(width * .9)
    expect(errors).toEqual([])
  })
}

test('mobile navigation supports keyboard dismissal and anchor navigation', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  const toggle = page.getByRole('button', { name: 'Abrir menu' })
  await toggle.click()
  await expect(page.getByRole('navigation', { name: 'Menu principal' })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(toggle).toBeFocused()
  await expect(toggle).toHaveAttribute('aria-expanded', 'false')
  await toggle.click()
  await page.getByRole('navigation', { name: 'Menu principal' }).getByRole('link', { name: 'Projetos', exact: true }).click()
  await expect(page).toHaveURL(/#projetos$/)
  await expect(toggle).toHaveAttribute('aria-expanded', 'false')
})

test('FAQ exposes its state and preserves commercial links', async ({ page }) => {
  await page.goto('/')
  const question = page.getByRole('button', { name: /Preciso ter textos, fotos/ })
  await question.click()
  await expect(question).toHaveAttribute('aria-expanded', 'true')
  await expect(page.locator('#faq-answer-1')).toBeVisible()
  await expect(page.locator('#faq-question-0')).toHaveAttribute('aria-expanded', 'false')
  await question.click()
  await expect(page.locator('#faq-answer-1')).not.toBeVisible()
  await expect(page.locator('#identidade')).toHaveCount(0)
  await expect(page.locator('#projetos').getByRole('link', { name: 'Visitar site DOMUS' })).toHaveAttribute('href', 'https://domus-imobiliaria-alb.vercel.app/')
  await expect(page.locator('#projetos').getByRole('link', { name: 'Visitar site AURA', exact: true })).toHaveAttribute('href', 'https://aura-skincare-alb.vercel.app/')
  for (const href of await page.locator('a[href^="https://wa.me/"]').evaluateAll(links => links.map(a => a.href))) {
    expect(href).toContain('https://wa.me/5581998857075?text=')
  }
  await expect(page.locator('.contact-email')).toHaveAttribute('href', 'mailto:laisaa275@gmail.com')
})

test('reduced motion leaves content visible and stops decorative loops', async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)
  expect(await page.evaluate(() => [...document.fonts].filter(f => f.status === 'loaded').map(f => f.family))).toEqual(expect.arrayContaining(['Space Grotesk Variable', 'DM Sans Variable']))
  expect(await page.locator('.alb-background').evaluate(el => getComputedStyle(el).animationName)).toBe('none')
  expect(await page.locator('.hero-title .word-mask > span').first().evaluate(el => getComputedStyle(el).transform)).toBe('none')
  await page.locator('#processo').scrollIntoViewIfNeeded()
  expect(await page.locator('.timeline-track > span').evaluate(el => getComputedStyle(el).transform)).toMatch(/matrix\(1, 0, 0, 1, 0, 0\)|none/)
})

test('animated page reveals headings and timeline without runtime errors', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.setViewportSize({ width: 1440, height: 1000 })
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('/')
  await expect(page.locator('.hero-title .word-mask > span').last()).toHaveCSS('opacity', '1')
  await page.screenshot({ path: 'test-results/desktop-hero.png' })
  for (const selector of ['#sobre', '#servicos', '#projetos', '#processo', '#contato']) {
    await page.locator(`${selector} h2`).scrollIntoViewIfNeeded()
    await expect(page.locator(`${selector} h2 .word-mask > span`).first()).toHaveCSS('opacity', '1')
  }
  expect(errors).toEqual([])
})
