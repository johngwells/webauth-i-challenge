const router = require('express').Router();

const Users = require('./users-model');

const requiresAuth = require('../middleware/require-auth');

router.get('/', (req, res) => {
  Users.find()
    .then(users => {
      res.json(users)
    })
    .catch(err => res.send(err));
});

module.exports = router;
