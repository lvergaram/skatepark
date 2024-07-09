import express from 'express'
import 'dotenv/config'
import userRouter from './src/Users/user.routes.js'
import appRouter from './src/app/app.routes.js'
import { engine } from 'express-handlebars'
import fileUploadConfig from './src/utils/fileUploadConfig.js'

const app = express()
const __dirname = import.meta.dirname

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(fileUploadConfig)

// routes
app.use('/usuarios', userRouter)
app.use('/', appRouter)

// handlebars
app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(` app listening on port ${PORT} `)
})
