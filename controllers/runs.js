const express = require('express')
const router = express.Router()
const isSignedIn = require ('../middleware/is-signed-in')
const User = require ('../models/user')

router.get('/', isSignedIn, async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id)
        res.send (user.runs)
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

module.exports = router