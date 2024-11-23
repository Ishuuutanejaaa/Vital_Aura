const express = require('express')
const router = express.Router()
const User = require('../models/newUser')
const bcrypt = require('bcryptjs')

// router.post('/register', async (req, res) => {
//     req.body.password = await bcrypt.hash(req.body.password, 10)
//     try {
//         const createdUser = await User.create(req.body)
//         console.log(createdUser, ' Created User')

//         res.send()
//     } catch (e) {
//         res.send(e)
//     }
// })

// router.post('/login', async (req, res) => {

//     //check if user exists
//     try {
//         const foundUser = await User.findOne({ username: req.body.username })
//         console.log(foundUser, ' foundUser')

//         //if user exists use bcrypt to check password valid
//         if (foundUser) {
//             if (bcrypt.compareSync(req.body.password, foundUser.password)) {
//                 req.session.userId = foundUser._id
//                 req.session.username = foundUser.username
//                 req.session.logged = true
//                 //add jwt token here
//                 console.log('valid user')
//                 res.send(req.session)

//             } else {
//                 req.session.message = 'Username or password is incorrect'
//                 res.status(401).send()
//                 console.log('invalid password')
//             }
//         } else {
//             req.session.message = 'Username or password is incorrect'
//             res.status(401).send()
//             console.log('user not found')
//         }
//     } catch (e) {
//         res.status(500).send()
//         //500 is internal server error
//         console.log(e)
//     }
// })


module.exports = router