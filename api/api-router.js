const router = require('express').Router();

// Routes Here
const authRouter = require('../auth/auth-router');

router.use('/auth', authRouter);

router.get('/', (req, res) => {
  res.json({ api: 'Its alive' });
});

module.exports = router;
