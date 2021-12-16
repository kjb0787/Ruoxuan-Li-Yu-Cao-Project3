const express = require('express');
const router = express.Router();
const Job = require('../model/jobModel');
const User = require('../model/userModel');
const authenticateToken = require('../util');

router.post('/', authenticateToken, async (req, res) => {
    const user = await User.findOne({ username: req.username });
    if (!user) {
        return res.status(401).send("Unauthorized");
    }
    if (!(req.body.title && req.body.companyName && req.body.location && req.body.description && req.body.contact)) {
        return res.status(400).send("Please provide all necessary information");
    }
    const job = new Job({
        title: req.body.title,
        companyName: req.body.companyName,
        location: req.body.location,
        description: req.body.description,
        contact: req.body.contact,
        website: req.body.website,
        postDate: new Date().toISOString().slice(0, 10),
        creatorName: user.username,
    });

    const newJob = await job.save();
    user.jobPosts.push(job._id);
    const updateUser = await user.save();
    if (newJob && updateUser) {
        return res.status(201).send({ jobId: job._id });
    } else {
        return res.status(500).send("Database errors");
    }
});

// user can modify jobs that they created
router.put('/:id', authenticateToken, async (req, res) => {
    const job = await Job.findOne({ _id: req.params.id });
    job.title = req.body.title;
    job.companyName = req.body.companyName;
    job.location = req.body.location;
    job.description = req.body.description;
    job.contact = req.body.contact;
    job.website = req.body.website;
    job.postDate = new Date().toISOString().slice(0, 10);
    const updatedJob = await job.save();
    if (updatedJob) {
        return res.status(201).send({ jobId: job._id });
    } else {
        return res.status(500).send({ message: "Can't update job information." });
    }
});

router.get('/:id', async (req, res) => {
    const job = await Job.findOne({ _id: req.params.id });
    if (job) {
        return res.status(200).send(job);
    }
    return res.status(404).send("Job doesn't exist.");
});


router.get('/:id/isfavorite', authenticateToken, async (req, res) => {
    const job = await Job.findOne({ _id: req.params.id });
    const user = await User.findOne({ username: req.username });
    if (job && user) {
        for (let i = 0; i < user.favorites.length; i++) {
            if (job._id.equals(user.favorites[i])) {
                return res.send(true);
            }
        }
        return res.send(false);
    }
    return res.status(404).send("Job doesn't exist.");
});

router.post('/:id/favorite', authenticateToken, async (req, res) => {
    const job = await Job.findOne({ _id: req.params.id });
    const user = await User.findOne({ username: req.username });
    if (job && user) {
        user.favorites.push(job._id);
        const updateUser = await user.save();
        return res.status(200).send("Add favorite successfully");
    }
    return res.status(404).send("Job doesn't exist.");
});


router.post('/:id/unfavorite', authenticateToken, async (req, res) => {
    const job = await Job.findOne({ _id: req.params.id });
    const user = await User.findOne({ username: req.username });
    if (job && user) {
        for (let i = 0; i < user.favorites.length; i++) {
            if (job._id.equals(user.favorites[i])) {
                user.favorites.splice(i, 1);
            }
        }
        const updateUser = await user.save();
        if (updateUser) {
            return res.status(200).send("Delete favorite successfully");
        }
        return res.status(404).send("Something run with user database");
    }
    return res.status(404).send("Job doesn't exist.");
});


router.delete('/:id', authenticateToken, async (req, res) => {
    const user = await User.findOne({ username: req.username });
    if (!user) {
        return res.status(401).send("Unauthorized");
    }
    const job = await Job.findOne({ _id: req.params.id });
    if (job) {
        for (let i = 0; i < user.jobPosts.length; i++) {
            if (user.jobPosts[i] === job._id) {
                user.jobPosts.splice(i, 1);
            }
        }
        await user.save();
        await job.remove();
        return res.send("Delete the job successfully. ");
    } else {
        return res.send("Job doesn't exist.");
    }
});

// search operation
router.get('/', async (req, res) => {
    const keyword = req.query.keyword;
    const jobs = await Job.find({ title: { $regex: keyword, $options: 'i' } });
    if (jobs) {
        return res.status(200).send(jobs);
    }
    return res.status(200).send("No matching jobs")
});


module.exports = router
