const express = require ('express')
const router = express.Router()

router.get('/test', (req, res) => {
    res.send ('Auth router works')
})

router.get('/sign-up', (req, res) => {
    res.render('auth/sign-up.ejs')
})

router.post('/sign-up', (req, res) => {
    console.log('REQ.BODY:', req.body)
    res.send('Sing-up form received')
})



module.exports = router 