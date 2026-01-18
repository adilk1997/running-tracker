const mongoose = require ('mongoose')

const runSchema = new mongoose.Schema({
    date: {type: Date, required: true},
    distance: {type: Number, required: true},
    time: {type:String, required: true},
})

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    runs: [runSchema],
})

const User = mongoose.model ('User', userSchema)

module.exports = User 