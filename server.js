const dotenv = require ('dotenv')
dotenv.config ()
const express = require ('express')
const app = express()
const mongoose = require ('mongoose')
const methodOverride = require('method-override')
const morgan = require ('morgan')
const session = require ('express-session')
const authRouter = require ('./controllers/auth.js')
const runsRouter = require('./controllers/runs.js')


app.use(express.urlencoded({extended: true })) //quando arriva un form html, traducilo in un oggetto js in req.bbody
app.use(methodOverride('_method'))

app.use (
    session ({
        secret: process.env.SECRET_SESSION,
        resave: false, //non risalva la session se non cambia
        saveUninitialized: true,
    })
)

app.get('/', (req, res) => {
    res.redirect ('/runs')
})


app.set ('view engine', 'ejs')

app.use('/auth', authRouter)
app.use('/runs', runsRouter)

app.use(express.static('public'))
app.use(morgan('dev'))

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => {
    console.log('Connected to mongoDB')
})

app.listen(3000, () => {
    console.log('Server running on port 3000')
})