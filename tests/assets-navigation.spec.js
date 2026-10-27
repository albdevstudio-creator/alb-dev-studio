import { test, expect } from '@playwright/test'

test('official logo, project images and navigation destinations resolve', async ({ page }) => {
  await page.goto('/')
  const logos = page.locator('.brand img')
  await expect(logos).toHaveCount(2)
  for (const image of await page.locator('img').all()) {
    await image.scrollIntoViewIfNeeded()
    await expect(image).toHaveJSProperty('complete', true)
    expect(await image.evaluate(element => element.naturalWidth)).toBeGreaterThan(0)
  }
  const logoSources = await logos.evaluateAll(images => images.map(image => image.src))
  expect(new Set(logoSources).size).toBe(1)
  expect(logoSources[0]).toMatch(/alb.*\.png$/)
  await expect(page.locator('link[rel="icon"]')).toHaveAttribute('href', /alb.*\.png$/)
  for (const link of await page.locator('nav a[href^="#"]').all()) {
    await expect(page.locator(await link.getAttribute('href'))).toHaveCount(1)
  }
  await expect(page.locator('header')).toHaveCount(1)
  await expect(page.locator('main > section')).toHaveCount(9)
  await expect(page.locator('footer')).toHaveCount(1)
  const themes = await page.locator('main > section').evaluateAll(sections => sections.map(el => el.classList.contains('section-light') ? 'light' : 'dark'))
  expect(themes).toEqual(['dark', 'light', 'dark', 'light', 'dark', 'light', 'dark', 'light', 'dark'])
})
