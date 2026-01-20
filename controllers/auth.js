const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/test', (req, res) => {
    res.send('Auth router works')
})

router.get('/sign-up', (req, res) => {
    res.render('auth/sign-up.ejs')
})

router.post('/sign-up', async (req, res) => {
    try {
        const username = req.body.username
        const password = req.body.password
        const confirmPassword = req.body.confirmPassword
        if (password !== confirmPassword) {
            return res.send('Passwords do not match')
        }
        const userInDatabase = await User.findOne({ username })
        if (userInDatabase) {
            return res.send('Username already taken')
        }
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        req.body.password = hashedPassword;

        // All ready to create the new user!
        await User.create(req.body);

        res.redirect('/auth/sign-in');
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});
    


module.exports = router 