const dotenv = require ('dotenv')
dotenv.config ()
const express = require ('express')
const app = express()
const mongoose = require ('mongoose')
const methodOverride = require('method-override')
const morgan = require ('morgan')
const session = require ('express-session')


app.use(express.urlencoded({extended: false }))
app.use(methodOverride('_method'))

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => {
    console.log('Connected to mongoDB')
})

app.listen(3000, () => {
    console.log('Server running on port 3000')
})