const bcrypt = require('bcrypt');

const router = require('express').Router();

const Users = require('../users/users.model');

router.post('/register', (req, res) => {
  let user = req.body;

  const hash = bcrypt.hashSync(user.password, 14);

  user.password = hash;

  Users.add(user)
    .then(saved => res.status(201).json(saved))
    .catch(error => res.status(500).json(error));
})

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
  .first()
  .then(user => {
    user
      ? res.status(200).json({ message: `Welcome ${user.username}` })
      : res.status(401).json({ error: 'Invalid Credentials' })
  })
  .catch(error => res.status(500).json(error));
})

module.exports = router;
