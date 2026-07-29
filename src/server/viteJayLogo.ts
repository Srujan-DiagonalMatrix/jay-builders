import { readFileSync } from 'node:fs';
import type { Plugin } from 'vite';

const logoPath = '/assets/images/JayLogo.png';
const logoSource = new URL('../../requirements/image-assets/JayLogo.png.base64', import.meta.url);

function readLogo() {
  return Buffer.from(readFileSync(logoSource, 'utf8').replace(/\s/g, ''), 'base64');
}

export function jayLogoAsset(): Plugin {
  return {
    name: 'jay-logo-asset',
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        if (request.url?.split('?')[0] !== logoPath) return next();
        response.statusCode = 200;
        response.setHeader('Content-Type', 'image/png');
        response.setHeader('Cache-Control', 'public, max-age=3600');
        response.end(readLogo());
      });
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: logoPath.slice(1),
        source: readLogo(),
      });
    },
  };
}
