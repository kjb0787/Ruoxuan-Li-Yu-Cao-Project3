const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const authenticateToken = require('../util');


const User = require('../model/userModel');
const Job = require('../model/jobModel');


router.post('/register', async (req, res) => {
    if (!(req.body.username && req.body.password)) {
        return res.status(400).send("Please provide valid username and password.")
    }
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
        return res.status(409).send("Username is used.");
    }
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const user = new User({
        username: req.body.username,
        password: req.body.password,
    })
    const newUser = await user.save();
    const token = jwt.sign({ username: user.username }, "secret_token", { expiresIn: '14d' });
    if (newUser) {
        return res.cookie('token', token, { httpOnly: true }).status(201).send("User Id " + user._id);
    } else {
        return res.status(500).send("Database errors");
    }
});

router.post('/signin', async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (user && (await bcrypt.compare(req.body.password, user.password))) {
        const token = jwt.sign({ username: user.username }, "secret_token", { expiresIn: '14d' });
        return res.send({ token: token });
    }
    return res.status(401).send('Invalid username or password');
});

router.get('/favorites', authenticateToken, async (req, res) => {
    const user = await User.findOne({ username: req.username });
    if (!user) {
        return res.status(401).send("Unauthorized");
    }
    const jobs = [];
    for (let i = 0; i < user.favorites.length; i++) {
        jobs.push(await Job.findOne({ _id: user.favorites[i] }));
    }
    return res.status(200).send(jobs);
});


router.get('/posts', authenticateToken, async (req, res) => {
    const user = await User.findOne({ username: req.username });
    if (!user) {
        return res.status(401).send("Unauthorized");
    }
    return res.status(200).send(user.jobPosts);
})

module.exports = router
