import { defineConfig } from 'vite';
import { resolve, join, extname, dirname } from 'node:path';
import { existsSync, createReadStream, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const parentDir = resolve(__dirname, '..');

const MIME = {
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
  '.webp': 'image/webp', '.gif': 'image/gif', '.svg': 'image/svg+xml',
  '.js': 'application/javascript', '.json': 'application/json',
  '.css': 'text/css', '.woff2': 'font/woff2', '.woff': 'font/woff',
};

export default defineConfig({
  base: './',
  server: { port: 8080, host: '127.0.0.1' },
  build: { outDir: 'dist', emptyOutDir: true },
  plugins: [{
    name: 'serve-workspace-assets',
    configureServer(server) {
      const allowed = ['/data/', '/main_logo_des/', '/hor_logo_des/'];
      server.middlewares.use((req, res, next) => {
        const url = (req.url || '').split('?')[0];
        if (!allowed.some(p => url.startsWith(p))) return next();
        const filePath = join(parentDir, decodeURIComponent(url));
        if (!filePath.startsWith(parentDir) || !existsSync(filePath) || !statSync(filePath).isFile()) return next();
        const mime = MIME[extname(filePath).toLowerCase()] || 'application/octet-stream';
        res.setHeader('Content-Type', mime);
        res.setHeader('Cache-Control', 'public,max-age=3600');
        createReadStream(filePath).pipe(res);
      });
    }
  }]
});

