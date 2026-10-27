import { chromium } from '@playwright/test'
import fs from 'node:fs'
fs.mkdirSync('test-results', { recursive: true })
const browser = await chromium.launch({ channel: 'chrome', headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' })
await page.goto('http://127.0.0.1:5180/')
await page.evaluate(() => document.fonts.ready)
console.log(JSON.stringify(await page.evaluate(() => ({ fonts: [...document.fonts].filter(f => f.status === 'loaded').map(f => f.family) }))))
await page.screenshot({ path: 'test-results/desktop-hero.png' })
for (const [name, selector] of [['about','#sobre'],['services','#servicos'],['domus','.project-item-0'],['aura','.project-item-1'],['nexora','.project-item-2'],['process','#processo'],['identity','#identidade'],['faq','.faq-section'],['contact','#contato']]) {
  await page.locator(selector).screenshot({ path: `test-results/desktop-${name}.png` })
}
await page.setViewportSize({width:390,height:844})
await page.goto('http://127.0.0.1:5180/')
await page.evaluate(() => document.fonts.ready)
await page.screenshot({path:'test-results/mobile-hero.png'})
for (const [name, selector] of [['services','#servicos'],['domus','.project-item-0'],['aura','.project-item-1'],['identity','#identidade'],['contact','#contato']]) {
 await page.locator(selector).screenshot({ path: `test-results/mobile-${name}.png` })
}
await browser.close()
