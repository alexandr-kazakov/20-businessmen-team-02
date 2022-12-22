import { CacheableResponsePlugin } from 'workbox-cacheable-response'
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies'
import { registerRoute, Route } from 'workbox-routing'

// Handle google fonts:
const googleFontsRoute = new Route(
  ({ url }) => url.origin === 'https://fonts.googleapis.com' || url.origin === 'https://fonts.gstatic.com',
  new StaleWhileRevalidate({
    cacheName: 'google-fonts',
  })
)

// Handle images:
const imageRoute = new Route(
  ({ request }) => request.destination === 'image',
  new StaleWhileRevalidate({ cacheName: 'images' })
)

// Handle scripts:
const scriptsRoute = new Route(
  ({ request }) => request.destination === 'script',
  new CacheFirst({
    cacheName: 'scripts',
  })
)

// Handle styles:
const stylesRoute = new Route(({ request }) => request.destination === 'style', new CacheFirst({ cacheName: 'styles' }))

// Handle routes:
const routesRoute = new Route(
  ({ request }) => request.mode === 'navigate',
  new StaleWhileRevalidate({
    cacheName: 'pages',
    plugins: [new CacheableResponsePlugin({ statuses: [0, 200] })],
  })
)

registerRoute(routesRoute)
registerRoute(imageRoute)
registerRoute(scriptsRoute)
registerRoute(stylesRoute)
registerRoute(googleFontsRoute)
