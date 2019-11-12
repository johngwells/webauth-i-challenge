const router = require('express').Router();

// Routes Here
const authRouter = require('../auth/auth-router');
const usersRouter = require('../users/users-router');

router.use('/auth', authRouter);
router.use('/users', usersRouter);

router.get('/', (req, res) => {
  res.json({ api: 'Its alive' });
});

module.exports = router;
