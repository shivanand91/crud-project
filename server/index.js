import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import route from './routes/user.routes.js'
import cors from 'cors'

dotenv.config()

const app = express()
app.use(bodyParser.json())
app.use(cors())

const port = process.env.PORT || 3000
const mongoDBURL = process.env.MONGODB_URI

mongoose.connect(mongoDBURL)
    .then(() =>
        app.listen(port, () => {
            console.log('Connected to MongoDB')
            console.log(`Server is running on PORT ${port}`)
        }))
    .catch((err) => console.error('Error connecting to MongoDB:', err))

app.use("/api", route)