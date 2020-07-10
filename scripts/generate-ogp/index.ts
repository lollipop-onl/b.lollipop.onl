import canvas from 'canvas';
import fs from 'fs';
import path from 'path';
import fg from 'fast-glob';
import { JSDOM } from 'jsdom';

const DIST_DIR = path.join(__dirname, '../../dist');

(async () => {
  const pages = fg.sync(path.join(DIST_DIR, '**/*.html'));
  const pageInfo = pages
    .map((page) => {
      const html = fs.readFileSync(page, 'utf-8');
      const { window } = new JSDOM(html);
      const $title = window.document.querySelector('meta[property="og:title"]');
      const basePath = page.replace(DIST_DIR, '');

      return $title
        ? {
          title: $title.getAttribute('content') || '',
          filePath: basePath.replace(/index\.html$/, 'ogp.png'),
        }
        : undefined;
    })
    .filter((info): info is NonNullable<typeof info> => !!info);
  const templateImage = await canvas.loadImage(path.join(__dirname, 'template.png'));

  canvas.registerFont(path.join(__dirname, 'togalite.otf'), {
    family: 'togalite',
  });

  pageInfo.forEach(({ title, filePath }) => {
    const cvs = canvas.createCanvas(960, 540);
    const ctx = cvs.getContext('2d');

    ctx.drawImage(templateImage, 0, 0, 960, 540);

    ctx.font = '50px togalite';

    let currentLine = 0;
    const lines: string[] = [];

    title.split('').forEach((char) => {
      const line = lines[currentLine];
      const m = ctx.measureText(line + char);

      if (m.width > 960 * 0.9) {
        currentLine += 1;
        lines[currentLine] = char;
      } else {
        lines[currentLine] += char;
      }
    });

    const baseY = 40 + ((540 - 20) / 2) - ((lines.length * 60 + 24) / 2);

    lines.forEach((line, i) => {
      const m = ctx.measureText(line);

      ctx.fillText(line, (960 - m.width) / 2, baseY + (m.emHeightAscent + 24) * i);
    });

    const buf = cvs.toBuffer();

    fs.writeFileSync(path.join(DIST_DIR, filePath), buf);
  });
})();
