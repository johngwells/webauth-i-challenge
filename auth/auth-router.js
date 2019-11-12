const bcrypt = require('bcrypt');

const router = require('express').Router();

const Users = require('../users/users-model');
const validate = require('../middleware/validate-user');

router.post('/register', validate, (req, res) => {
  let user = req.body;

  const hash = bcrypt.hashSync(user.password, 14);

  user.password = hash;

  Users.add(user)
    .then(saved => res.status(201).json(saved))
    .catch(error => res.status(500).json(error));
});

router.post('/login', validate, (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
  .first()
  .then(user => {
    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.username = user.username;
      res.status(200).json({ message: `Welcome ${user.username}` })
    } else {
      res.status(401).json({ error: 'Invalid Credentials' })
    }
  })
  .catch(error => res.status(500).json(error));
});

// logout
router.get('/logout', (req, res) => {
  if (req.session.username) {
    req.session.destroy(err => {
      if (err) {
        res.send({ message: 'error logging out'})
      } else {
        res.json({ message: 'Logout successful' })
      }
    });
  } else {
    res.json({ message: 'Do you want to log back in?' })
  }
});

module.exports = router;
