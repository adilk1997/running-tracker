const express = require('express')
const router = express.Router()
const bcrypt = require ('bcrypt')
const User = require('../models/user')

router.get('/test', (req, res) => {
    res.send('Auth router works')
})

router.get('/sign-up', (req, res) => {
    res.render('auth/sign-up.ejs')
})

router.get('/log-in', (req, res) => {
  res.render('auth/log-in', { error: req.query.error})
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
        // req.body.password = hashedPassword;

        await User.create({
            username,
            password: hashedPassword,
        });

        return res.redirect('/auth/log-in')
      } catch (error) {
        console.log(error);
        return res.redirect('/');
    }
});

router.post('/log-in', async (req, res) => {
    try {
        const username = req.body.username
        const password = req.body.password
        const userInDatabase = await User.findOne ({username}) 
        if (!userInDatabase) {
            return res.redirect('/auth/log-in?error=1')
        }
        const validPassword = bcrypt.compareSync (password, userInDatabase.password)
        if (!validPassword) {
            return res.send('Login failed')
        }
        req.session.user = {
            _id: userInDatabase._id,
            username: userInDatabase.username,
        }
        req.session.save(() => {
        return res.redirect ('/runs')
        })
    }   catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

router.get('/log-out', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/auth/log-in')
  })
})


module.exports = router 