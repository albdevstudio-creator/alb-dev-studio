import { test, expect } from '@playwright/test'

test('portfolio selection works with keyboard and real image assets', async ({ page }) => {
  await page.goto('/')
  const portfolio = page.locator('#projetos')
  await expect(portfolio.locator('article')).toHaveCount(5)
  const aura = portfolio.getByRole('button', { name: 'Destacar projeto AURA', exact: true })
  await aura.focus()
  await page.keyboard.press('Enter')
  await expect(aura).toHaveAttribute('aria-pressed', 'true')
  await expect(portfolio.getByRole('button', { name: 'Destacar projeto DOMUS', exact: true })).toHaveAttribute('aria-pressed', 'false')
  await expect(aura.locator('img')).toHaveAttribute('src', /aura.*\.webp/)
  await expect(portfolio.locator('.concept-label')).toHaveCount(3)
  await expect(portfolio.locator('a[target="_blank"]')).toHaveCount(6) // Five live sites and the Behance profile.
})

test('commercial formats, FAQ and contact expose the configured channels', async ({ page }) => {
  await page.goto('/')
  const liveProjects = page.locator('#projetos-no-ar')
  await expect(liveProjects.locator('article')).toHaveCount(5)
  const urls = ['https://aura-skincare-alb.vercel.app/', 'https://nexora-ai-alb.vercel.app/', 'https://domus-imobiliaria-alb.vercel.app/', 'https://institutoaveloz.vercel.app/', 'https://pdvcore.vercel.app/landing']
  for (const [index, url] of urls.entries()) {
    const link = liveProjects.locator('.live-project-link').nth(index)
    await expect(link).toHaveAttribute('href', url)
    await expect(link).toHaveAttribute('target', '_blank')
    await link.focus()
    await expect(link).toBeFocused()
  }
  const formats = page.locator('#contratacao')
  await expect(formats.locator('article')).toHaveCount(3)
  for (const link of await formats.getByRole('link', { name: 'Solicitar orçamento' }).all()) {
    await expect(link).toHaveAttribute('href', /^https:\/\/wa\.me\/5581998857075\?text=/)
  }
  const question = page.getByRole('button', { name: /Domínio, hospedagem e ferramentas/ })
  await question.click()
  await expect(question).toHaveAttribute('aria-expanded', 'true')
  await expect(page.locator('#faq-answer-4')).toBeVisible()
  await expect(page.locator('#contato').getByRole('link', { name: 'Solicitar orçamento' })).toHaveAttribute('href', /^mailto:laisaa275@gmail.com\?subject=/)
  await expect(page.locator('#contato').getByRole('link', { name: 'Falar no WhatsApp' })).toHaveAttribute('href', /^https:\/\/wa\.me\/5581998857075/)
  await expect(page.locator('footer').getByRole('link', { name: 'Behance', exact: true })).toHaveAttribute('href', 'https://www.behance.net/')
})

for (const width of [320, 390]) {
  test(`mobile portfolio composition keeps its text within the frame at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 })
    await page.goto('/')
    const note = page.locator('.portfolio-mobile-note')
    await note.scrollIntoViewIfNeeded()
    expect(await note.evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true)
    const bounds = await note.boundingBox()
    const frame = await page.locator('.portfolio-mobile-frame').boundingBox()
    expect(bounds.x + bounds.width).toBeLessThanOrEqual(frame.x + frame.width)
  })
}
