export default {
  async fetch(request: Request, env: any) {
    const url = new URL(request.url)
    
    const staticExtensions = ['.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.woff', '.woff2', '.ttf']
    const hasExtension = staticExtensions.some(ext => url.pathname.endsWith(ext))
    
    if (hasExtension) {
      return env.ASSETS.fetch(request)
    }
    
    const indexRequest = new Request(new URL('/index.html', url.origin), {
      method: request.method,
      headers: request.headers,
      body: request.body
    })
    
    return env.ASSETS.fetch(indexRequest)
  },
}
