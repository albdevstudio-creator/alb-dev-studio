import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { chromium } from '@playwright/test'

// Generate delivery assets without changing the supplied PNG originals.
const assets = new URL('../src/assets/', import.meta.url)
const browser = await chromium.launch({ channel: 'chrome', headless: true })
let originalBytes = 0
let previewBytes = 0
let thumbnailBytes = 0

try {
  const page = await browser.newPage()
  for (const brand of ['nexora', 'aura', 'domus']) {
    const destination = new URL(`social-previews/${brand}/`, assets)
    await mkdir(destination, { recursive: true })
    for (const file of ['feed', 'carrosel1', 'carrosel2', 'carrosel3', 'story']) {
      const original = await readFile(new URL(`${brand}/${file}.png`, assets))
      originalBytes += original.length
      for (const variant of [{ suffix: '', width: 810, quality: .86 }, ...(file === 'feed' ? [{ suffix: '-thumb', width: 240, quality: .8 }] : [])]) {
        const encoded = await page.evaluate(async ({ source, width, quality }) => {
          const image = new Image()
          image.src = `data:image/png;base64,${source}`
          await image.decode()
          const canvas = document.createElement('canvas')
          canvas.width = Math.min(width, image.naturalWidth)
          canvas.height = Math.round(canvas.width * image.naturalHeight / image.naturalWidth)
          const context = canvas.getContext('2d')
          context.imageSmoothingQuality = 'high'
          context.drawImage(image, 0, 0, canvas.width, canvas.height)
          return canvas.toDataURL('image/webp', quality)
        }, { source: original.toString('base64'), width: variant.width, quality: variant.quality })
        if (!encoded.startsWith('data:image/webp;base64,')) throw new Error('WebP encoding is unavailable in this browser.')
        const bytes = Buffer.from(encoded.split(',')[1], 'base64')
        await writeFile(new URL(`${file}${variant.suffix}.webp`, destination), bytes)
        if (variant.suffix) thumbnailBytes += bytes.length
        else previewBytes += bytes.length
      }
    }
  }
  console.log(`Generated previews in ${fileURLToPath(new URL('social-previews/', assets))}`)
  console.log(JSON.stringify({ originalBytes, previewBytes, thumbnailBytes, reduction: `${(100 * (1 - previewBytes / originalBytes)).toFixed(1)}%` }))
} finally {
  await browser.close()
}
