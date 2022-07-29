import { connectDb } from "./service/db.js"
import { Router } from "./router/Router.js"
import express from "express"
import cors from "cors"

const app = express()
const port = 3000

app.use(express.json());
app.use(cors())

await connectDb()

new Router(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
