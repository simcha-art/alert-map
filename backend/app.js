import express from 'express'
import { route as alertsRoute } from './router/alerts-route.js'
import env from 'dotenv'
env.config()

const PORT = process.env.PORT

const app = express()

app.use("/api/alerts", alertsRoute)

app.listen(PORT, () => console.log('listen to port: ', PORT))
