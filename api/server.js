// Vercel Node.js serverless function — wraps TanStack Start's Web-API fetch handler
import server from '../dist/server/server.js'

export default async function handler(req, res) {
  const proto = (req.headers['x-forwarded-proto'] ?? 'https').split(',')[0].trim()
  const host = req.headers['x-forwarded-host'] ?? req.headers['host'] ?? 'localhost'
  const url = new URL(req.url, `${proto}://${host}`)

  // Convert Node.js headers to Web API Headers
  const reqHeaders = new Headers()
  for (const [key, val] of Object.entries(req.headers)) {
    if (val == null) continue
    if (Array.isArray(val)) val.forEach((v) => reqHeaders.append(key, v))
    else reqHeaders.set(key, val)
  }

  // Read request body
  const chunks = []
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
  }
  const body = Buffer.concat(chunks)

  const request = new Request(url.toString(), {
    method: req.method,
    headers: reqHeaders,
    body: body.length > 0 && req.method !== 'GET' && req.method !== 'HEAD' ? body : undefined,
  })

  // Minimal Cloudflare-ctx shim — TanStack Start may call waitUntil
  const ctx = {
    waitUntil: (p) => p.catch(console.error),
    passThroughOnException: () => {},
  }

  const response = await server.fetch(request, {}, ctx)

  // Stream response back to Vercel
  res.writeHead(response.status, Object.fromEntries(response.headers.entries()))
  res.end(Buffer.from(await response.arrayBuffer()))
}
