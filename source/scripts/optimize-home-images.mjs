// Run from source/: node scripts/optimize-home-images.mjs
// English homepage derivatives only; preserve every full-size gallery original.
import fs from "node:fs/promises";
import sharp from "sharp";
const dest = "public/images/home";
await fs.mkdir(dest, { recursive: true });
const gallery = (await fs.readFile("lib/galleryData.ts", "utf8")).replace(/\/\*[\s\S]*?\*\//g, "");
const entries = [...gallery.matchAll(/\{([^{}]*labelKey:\s*"[^"]+"[^{}]*)\}/g)].map(([, body]) => ({ key: body.match(/labelKey:\s*"([^"]+)"/)[1], file: body.match(/(?:\bfile|afterFile):\s*"([^"]+)"/)?.[1] }));
const registry = await fs.readFile("lib/treatments.ts", "utf8");
const report = [];
for (const [, slug, key, category] of registry.matchAll(/slug:\s*"([^"]+)",\s*key:\s*"([^"]+)",\s*category:\s*"([^"]+)"/g)) {
 const entry = entries.find(e => e.key === key && e.file);
 if (!entry) continue;
 const input = `public/images/${category}/${entry.file}`;
 const output = `${dest}/treatment-${slug}-128.webp`;
 await sharp(input).rotate().resize(128,128,{fit:"cover"}).webp({quality:85,effort:6}).toFile(output);
 report.push({input,output,before:(await fs.stat(input)).size,after:(await fs.stat(output)).size});
}
for (let i=1;i<=3;i++) {
 const input = `public/images/hero/hero-${i}-mobile.webp`;
 const output = `${dest}/hero-${i}-mobile-600.webp`;
 await sharp(input).resize({width:600}).webp({quality:85,effort:6}).toFile(output);
 report.push({input,output,before:(await fs.stat(input)).size,after:(await fs.stat(output)).size});
}
console.log(JSON.stringify(report,null,2));
// AVIF hero alternatives preserve pixel dimensions and framing; WebP stays as fallback.
for (let i=1;i<=3;i++) {
 for (const kind of ["mobile", "desktop"]) {
  const input = `public/images/hero/hero-${i}${kind === "mobile" ? "-mobile" : ""}.webp`;
  const output = `${dest}/hero-${i}-${kind}.avif`;
  await sharp(input).avif({quality:45,effort:6}).toFile(output);
  console.log(JSON.stringify({input,output,before:(await fs.stat(input)).size,after:(await fs.stat(output)).size}));
 }
}
