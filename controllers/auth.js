const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/test', (req, res) => {
    res.send('Auth router works')
})

router.get('/sign-up', (req, res) => {
    res.render('auth/sign-up.ejs')
})

router.get('/log-in', (req, res) => {
  res.render('auth/log-in')
})


router.post('/sign-up', async (req, res) => {
    try {
        const username = req.body.username
        const password = req.body.password
        const confirmPassword = req.body.confirmPassword
        if (password !== confirmPassword) {
            return res.send('Passwords do not match')
        }
        const userInDatabase = await User.findOne({ username }) //controlla se c è un utente con questo username
        if (userInDatabase) {
            return res.send('Username already taken')
        }
        const hashedPassword = bcrypt.hashSync(req.body.password, 10); //il 10 è il cost factor piu è alto, piu è lento, piu è sicuro
        req.body.password = hashedPassword;

        await User.create(req.body);

        res.redirect('/auth/sign-in');
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.post('/log-in', (req, res) => {
    console.log('LOG-IN BODY', req.body)
    res.send('Login form received')
})
    


module.exports = router 