// Generates favicons, app icons and the Open Graph image from the logo sources.
// Run with: npm run icons
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = new URL('../', import.meta.url);
const path = (p) => fileURLToPath(new URL(p, root));

const BRAND = '#003399';
const SKY = '#0172be';

// Take the mark's paths (without wordmark) from public/favicon.svg
const faviconSvg = await readFile(path('public/favicon.svg'), 'utf8');
const markPaths = [...faviconSvg.matchAll(/<path d="([^"]+)"/g)].map((m) => m[1]);
const logoSvg = await readFile(path('src/assets/logo.svg'), 'utf8');

/** The mark on an (optionally coloured) square background. */
function markSvg({ size, fill = BRAND, background = null, padding = 0 }) {
  // Bounding box of the mark in favicon coordinates: x 13.875–84.08, y 5–105
  const box = { x: 13.875, y: 5, w: 70.2, h: 100 };
  const inner = 100 - padding * 2;
  const scale = inner / box.h;
  const tx = 50 - (box.x + box.w / 2) * scale;
  const ty = 50 - (box.y + box.h / 2) * scale;
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">` +
      (background ? `<rect width="100" height="100" fill="${background}"/>` : '') +
      `<g transform="translate(${tx} ${ty}) scale(${scale})" fill="${fill}">` +
      markPaths.map((d) => `<path d="${d}"/>`).join('') +
      `</g></svg>`,
  );
}

const png = (svg) => sharp(svg).png({ compressionLevel: 9 }).toBuffer();

// favicon.ico (16/32/48 px, PNG-encoded)
async function ico(sizes) {
  const images = await Promise.all(sizes.map((s) => png(markSvg({ size: s, padding: 4 }))));
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = 6 + 16 * images.length;
  const entries = images.map((img, i) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(sizes[i] % 256, 0);
    e.writeUInt8(sizes[i] % 256, 1);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(img.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += img.length;
    return e;
  });
  return Buffer.concat([header, ...entries, ...images]);
}

await writeFile(path('public/favicon.ico'), await ico([16, 32, 48]));
// Apple & Android: white background with some padding (safe zone)
await writeFile(
  path('public/apple-touch-icon.png'),
  await png(markSvg({ size: 180, background: '#ffffff', padding: 18 })),
);
for (const size of [192, 512]) {
  await writeFile(
    path(`public/icon-${size}.png`),
    await png(markSvg({ size, background: '#ffffff', padding: 20 })),
  );
}

// Open Graph image 1200×630: sky colour, white logo, panorama at the bottom
const W = 1200;
const H = 630;
const whiteLogo = logoSvg.replace(/fill="#[0-9a-f]+"/gi, 'fill="#ffffff"');
const logo = await sharp(Buffer.from(whiteLogo)).resize({ width: 520 }).png().toBuffer();
const logoMeta = await sharp(logo).metadata();
const pano = await sharp(path('src/assets/panorama.jpg'))
  .resize({ width: W * 1.35 })
  .extract({ left: 120, top: 0, width: W, height: Math.round((W * 1.35 * 500) / 2266) })
  .toBuffer();
const panoMeta = await sharp(pano).metadata();

await sharp({ create: { width: W, height: H, channels: 3, background: SKY } })
  .composite([
    { input: pano, top: H - panoMeta.height, left: 0 },
    { input: logo, top: 110, left: Math.round((W - logoMeta.width) / 2) },
  ])
  .jpeg({ quality: 85, mozjpeg: true })
  .toFile(path('public/og-image.jpg'));

console.log('Icons and OG image generated.');
