// One-off script to generate simple PWA icon PNGs without any image-processing
// dependency. Builds raw RGBA scanlines in memory and encodes a minimal PNG
// (IHDR/IDAT/IEND chunks) using Node's built-in zlib + crc32. Run with:
//   node scripts/generate-icons.mjs
import { deflateSync } from 'node:zlib'
import { writeFileSync, mkdirSync } from 'node:fs'

const BG = [15, 23, 42] // slate-900, matches theme_color
const CARD = [255, 255, 255]
const ACCENT = [56, 189, 248] // sky-400
const MUTED = [148, 163, 184] // slate-400
const DOT = [15, 23, 42]

function crc32(buf) {
  let c
  const table =
    crc32.table ??
    (crc32.table = (() => {
      const t = new Uint32Array(256)
      for (let n = 0; n < 256; n++) {
        c = n
        for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
        t[n] = c >>> 0
      }
      return t
    })())
  let crc = 0xffffffff
  for (let i = 0; i < buf.length; i++) crc = table[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8)
  return (crc ^ 0xffffffff) >>> 0
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii')
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length, 0)
  const crcBuf = Buffer.alloc(4)
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0)
  return Buffer.concat([len, typeBuf, data, crcBuf])
}

function buildPng(size, draw) {
  const raw = Buffer.alloc(size * (1 + size * 4))
  for (let y = 0; y < size; y++) {
    const rowStart = y * (1 + size * 4)
    raw[rowStart] = 0 // filter type: none
    for (let x = 0; x < size; x++) {
      const [r, g, b, a = 255] = draw(x, y)
      const px = rowStart + 1 + x * 4
      raw[px] = r
      raw[px + 1] = g
      raw[px + 2] = b
      raw[px + 3] = a
    }
  }

  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(size, 0)
  ihdr.writeUInt32BE(size, 4)
  ihdr[8] = 8 // bit depth
  ihdr[9] = 6 // color type RGBA
  ihdr[10] = 0
  ihdr[11] = 0
  ihdr[12] = 0

  const idat = deflateSync(raw)
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
  return Buffer.concat([signature, chunk('IHDR', ihdr), chunk('IDAT', idat), chunk('IEND', Buffer.alloc(0))])
}

function roundedRectHit(x, y, rx, ry, w, h, radius) {
  const left = x - rx
  const top = y - ry
  if (left < 0 || top < 0 || left >= w || top >= h) return false
  const cx = Math.min(Math.max(left, radius), w - radius)
  const cy = Math.min(Math.max(top, radius), h - radius)
  const dx = left - cx
  const dy = top - cy
  return dx * dx + dy * dy <= radius * radius
}

function makeIcon(size, { maskable = false } = {}) {
  // Maskable icons need content inside the ~80% "safe zone"; we simply scale
  // the card graphic down and keep the background full-bleed.
  const scale = maskable ? 0.72 : 0.92
  const cardW = size * scale
  const cardH = cardW * 0.62
  const cardX = (size - cardW) / 2
  const cardY = (size - cardH) / 2
  const cardRadius = cardW * 0.08

  const avatarR = cardW * 0.14
  const avatarCx = cardX + cardW * 0.24
  const avatarCy = cardY + cardH * 0.38

  const lineH = Math.max(2, cardW * 0.035)
  const lines = [
    { x: cardX + cardW * 0.46, y: cardY + cardH * 0.28, w: cardW * 0.34, color: ACCENT },
    { x: cardX + cardW * 0.46, y: cardY + cardH * 0.46, w: cardW * 0.34, color: MUTED },
    { x: cardX + cardW * 0.46, y: cardY + cardH * 0.64, w: cardW * 0.22, color: MUTED },
  ]
  const nameBar = { x: avatarCx - cardW * 0.16, y: cardY + cardH * 0.66, w: cardW * 0.32, color: DOT }

  return buildPng(size, (x, y) => {
    // background: rounded square for non-maskable, full bleed for maskable
    const bgRadius = maskable ? 0 : size * 0.18
    const insideBg = maskable || roundedRectHit(x + 0.5, y + 0.5, 0, 0, size, size, bgRadius)
    if (!insideBg) return [...BG, 0]

    if (roundedRectHit(x + 0.5, y + 0.5, cardX, cardY, cardW, cardH, cardRadius)) {
      const dx = x + 0.5 - avatarCx
      const dy = y + 0.5 - avatarCy
      if (dx * dx + dy * dy <= avatarR * avatarR) return DOT

      for (const line of [...lines, nameBar]) {
        if (x + 0.5 >= line.x && x + 0.5 <= line.x + line.w && y + 0.5 >= line.y && y + 0.5 <= line.y + lineH) {
          return line.color
        }
      }
      return CARD
    }

    return BG
  })
}

mkdirSync(new URL('../public/icons', import.meta.url), { recursive: true })

const targets = [
  { file: 'icon-192.png', size: 192, maskable: false },
  { file: 'icon-512.png', size: 512, maskable: false },
  { file: 'icon-maskable-512.png', size: 512, maskable: true },
]

for (const target of targets) {
  const png = makeIcon(target.size, { maskable: target.maskable })
  const dest = new URL(`../public/icons/${target.file}`, import.meta.url)
  writeFileSync(dest, png)
  console.log(`generated ${target.file} (${png.length} bytes)`)
}
