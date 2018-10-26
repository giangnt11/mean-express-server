// Import dependencies
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// MongoDB URL from the docker-compose file
const dbHost = 'mongodb://mongo-db:27017/mongo';

// Connect to mongodb
mongoose.connect(dbHost);

// create mongoose schema
const userSchema = new mongoose.Schema({
  name: String,
  age: Number
});

// create mongoose model
const User = mongoose.model('User', userSchema);


/* GET api listing. */
router.get('/', (req, res) => {
        res.send('api works');
});
/* Heavy task for test. */
router.get('/heavytask', (req, res) => {

    try {
        var i = 0;
        while (i < 1000000) {
            i++;
        }
      res.send('Success')
    } catch (e) {
      res.status(400).send(e)
    }
});

/* GET all users. */
router.get('/users', (req, res) => {
    User.find({}, (err, users) => {
        if (err) res.status(500).send(error)

        res.status(200).json(users);
    });
});

/* GET one users. */
router.get('/users/:id', (req, res) => {
    User.findById(req.param.id, (err, users) => {
        if (err) res.status(500).send(error)

        res.status(200).json(users);
    });
});

/* Create a user. */
router.post('/users', (req, res) => {
    let user = new User({
        name: req.body.name,
        age: req.body.age
    });

    user.save(error => {
        if (error) res.status(500).send(error);

        res.status(201).json({
            message: 'User created successfully'
        });
    });
});

module.exports = router;