const router = require('express').Router();

// Routes Here

router.get('/', (req, res) => {
  res.json({ api: 'Its alive' });
});

module.exports = router;
