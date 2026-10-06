import express from 'express'
import { route as alertsRoute } from './router/alertsRoute.js'
import {route as usersRoute} from "./router/usersRoute.js"
import env from 'dotenv'
import { logger } from './middleware/logger.ts'
import { errorHandler } from './middleware/errorHandler.ts'
import cors from 'cors'


env.config()

const PORT = process.env.PORT

const app = express()

app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true
}))
app.use(express.json())
app.use(logger)


app.use("/api/alerts", alertsRoute)
app.use("/api/auth", usersRoute)

app.use(errorHandler)

app.listen(PORT, () => console.log('listen to port: ', PORT))
