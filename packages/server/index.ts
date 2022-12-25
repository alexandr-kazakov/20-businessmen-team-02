import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()
import express from 'express'
import { createClientAndConnect } from './db'

const app = express()
app.use(cors())
const port = Number(process.env.SERVER_PORT) || 3001

createClientAndConnect()

// app.get('/', (_, res) => {
//   // res.json('👋 Howdy from the server :)')
//   res.sendFile(path.join(__dirname, "dist", "index.html"));
// })

/*TODO: удалить в дальнейшем, добавил что бы тестировать собранное приложение + service-worker */
app.use(express.static('../client/dist'))

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
})
