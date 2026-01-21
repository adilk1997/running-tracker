const express = require('express')
const router = express.Router()
const isSignedIn = require ('../middleware/is-signed-in')
const User = require ('../models/user')

router.get('/', isSignedIn, async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id)
        res.render ('runs/index', { runs: user.runs})
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

router.get('/new', isSignedIn, (req, res) => {
    res.render('runs/new')
})


router.post('/', isSignedIn, async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id)
        user.runs.push({
            date: req.body.date,
            distance: Number(req.body.distance),
            time: Number(req.body.time)
        })

        await user.save()
        return res.redirect('/runs')
      } catch (error) {
        console.log (error)
        return res.redirect ('/runs/new')
      }
})

module.exports = router