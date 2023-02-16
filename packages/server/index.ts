import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import * as fs from 'fs'
import * as path from 'path'
import { createServer as createViteServer } from 'vite'
import type { ViteDevServer } from 'vite'
import { dbConnect } from './db'
import routers from './routers'
import cookieParser from './middleware/cookie'

dotenv.config()

const PORT = Number(process.env.SERVER_PORT) || 3001
const isDev = () => process.env.NODE_ENV === 'development'

const startServer = async () => {
  let vite: ViteDevServer | undefined

  const app = express()
  const srcPath = path.dirname(require.resolve('client'))
  const distClientPath = path.dirname(require.resolve('client/dist/index.html'))
  const distSsrClientPath = require.resolve('client/dist-ssr/ssr.cjs')

  await dbConnect()

  app.use(cors())
  app.use(express.json())
  app.use(cookieParser)

  app.use(helmet.xssFilter())

  app.use('/api', routers)

  if (isDev()) {
    vite = await createViteServer({
      root: srcPath,
      server: { middlewareMode: true },
      appType: 'custom',
    })

    app.use(vite.middlewares)
  }

  if (!isDev()) {
    app.use('/assets', express.static(path.resolve(distClientPath, 'assets')))
  }

  app.use('/service-worker.js', express.static(path.resolve(distClientPath, 'service-worker.js')))

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl

    try {
      let template: string
      let render: (store: any, url: string) => Promise<string>
      let createStore: (preloadedState: any) => any

      if (isDev()) {
        template = fs.readFileSync(path.resolve(srcPath, 'index.html'), 'utf-8')
        template = await vite!.transformIndexHtml(url, template)
        render = (await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx'))).render
        createStore = (await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx'))).createStore
      } else {
        template = fs.readFileSync(path.resolve(distClientPath, 'index.html'), 'utf-8')
        render = (await import(distSsrClientPath)).render
        createStore = (await import(distSsrClientPath)).createStore
      }

      const store = createStore(undefined)

      const appHtml = await render(store, req.url)

      const state = store.getState()

      const stateHtml = `<script>window.__PRELOADED_STATE__=${JSON.stringify(state).replace(/</g, '\\u003c')}</script>`

      const html = template.replace(`<!--ssr-outlet-->`, appHtml + stateHtml)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (error) {
      if (isDev()) {
        vite!.ssrFixStacktrace(error as Error)
      }

      next(error)
    }
  })

  app.listen(PORT, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${PORT}`)
  })
}

startServer()
