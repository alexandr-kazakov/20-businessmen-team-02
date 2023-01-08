import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import * as fs from 'fs'
import * as path from 'path'
import { createServer as createViteServer } from 'vite'
// import { createClientAndConnect } from './db'
import type { ViteDevServer } from 'vite'

dotenv.config()

const isDev = () => process.env.NODE_ENV === 'development'

const startServer = async () => {
  let vite: ViteDevServer | undefined
  const app = express()
  const port = Number(process.env.SERVER_PORT) || 3001
  const srcPath = path.dirname(require.resolve('client'))
  const distClientPath = path.dirname(require.resolve('client/dist/index.html'))
  const distSsrClientPath = require.resolve('client/dist-ssr/client.cjs')

  app.use(cors())

  // createClientAndConnect()

  if (isDev()) {
    vite = await createViteServer({
      root: srcPath,
      server: { middlewareMode: true },
      appType: 'custom',
    })

    app.use(vite.middlewares)
  }

  app.get('/api', (_, res) => {
    res.json('👋 Howdy from the server :)')
  })

  if (!isDev()) {
    app.use('/assets', express.static(path.resolve(distClientPath, 'assets')))
  }

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl

    try {
      let template: string

      if (!isDev()) {
        template = fs.readFileSync(path.resolve(distClientPath, 'index.html'), 'utf-8')
      } else {
        template = fs.readFileSync(path.resolve(srcPath, 'index.html'), 'utf-8')
        template = await vite!.transformIndexHtml(url, template)
      }

      let render: () => Promise<string>

      if (!isDev()) {
        render = (await import(distSsrClientPath)).render
      } else {
        render = (await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx'))).render
      }

      // let createStore: () => Promise<string>

      // if (!isDev()) {
      //   createStore = (await import(distSsrClientPath)).createStore
      // } else {
      //   createStore = (await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx'))).createStore
      // }

      // console.log(createStore)

      // const store = createStore()

      // console.log('store', store)

      const appHtml = await render()

      // const state = store.getState()

      // const stateMarkup = `<script>window.__PRELOADED_STATE__=${JSON.stringify(state)}</script>`

      const html = template.replace(`<!--ssr-outlet-->`, /* stateMarkup + */ appHtml)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (error) {
      if (isDev()) {
        vite!.ssrFixStacktrace(error as Error)
      }

      next(error)
    }
  })

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}

startServer()
