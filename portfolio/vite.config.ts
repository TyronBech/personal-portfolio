import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import { fileURLToPath } from 'url'
import tailwindcss from '@tailwindcss/vite'
import chatHandler from './api/chat'
import type { VercelRequest, VercelResponse } from "@vercel/node"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ mode }) => {
  // Load environment variables from the root folder (loads GEMINI_API_KEY, SANITY_PROJECT_ID, etc.)
  const env = loadEnv(mode, process.cwd(), '')
  process.env.GEMINI_API_KEY = env.GEMINI_API_KEY || ''
  process.env.SANITY_PROJECT_ID = env.SANITY_PROJECT_ID || 'ubpspdu3'
  process.env.SANITY_DATASET = env.SANITY_DATASET || 'production'

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'api-chat-middleware',
        configureServer(server) {
          server.middlewares.use('/api/chat', (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Method not allowed. Only POST is supported.' }));
              return;
            }

            let body = '';
            req.on('data', (chunk) => {
              body += chunk;
            });

            req.on('end', async () => {
              try {
                const parsedBody = JSON.parse(body);

                // Mock VercelRequest and VercelResponse for our handler
                const vercelReq = {
                  method: req.method,
                  headers: req.headers,
                  body: parsedBody,
                } as unknown as VercelRequest;

                const vercelRes = {
                  statusCode: 200,
                  headers: {} as Record<string, string>,
                  setHeader(name: string, value: string) {
                    res.setHeader(name, value);
                    return this;
                  },
                  status(code: number) {
                    res.statusCode = code;
                    return this;
                  },
                  json(data: unknown) {
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(data));
                    return this;
                  },
                  end() {
                    res.end();
                    return this;
                  }
                } as unknown as VercelResponse;

                await chatHandler(vercelReq, vercelRes);
              } catch (err: unknown) {
                const errorMessage = err instanceof Error ? err.message : String(err);
                console.error('Error in local API dev middleware:', err);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({
                  error: 'Internal Server Error in development API simulation.',
                  details: errorMessage
                }));
              }
            });
          });
        }
      }
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  }
})

