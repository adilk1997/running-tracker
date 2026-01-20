const dotenv = require ('dotenv')
dotenv.config ()
const express = require ('express')
const app = express()
const mongoose = require ('mongoose')
const methodOverride = require('method-override')
const morgan = require ('morgan')
const session = require ('express-session')
const authRouter = require ('./controllers/auth.js')

app.use(express.urlencoded({extended: true }))
app.use(methodOverride('_method'))

app.use (
    session ({
        secret: process.env.SECRET_SESSION,
        resave: false, //non risalva la session se non cambia
        saveUninitialized: true,
    })
)

app.use('/auth', authRouter)

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => {
    console.log('Connected to mongoDB')
})

app.listen(3000, () => {
    console.log('Server running on port 3000')
})