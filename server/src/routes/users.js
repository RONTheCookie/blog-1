var express = require('express'),
  { r } = require('../index.js');
var router = express.Router();

router.get('/:id', async (req, res) => {
  var user = await r.table('users').get(parseInt(req.params.id, 10));
  if (!user) return res.status(404).json({ ok: false, error: 'Unknown user' });
  delete user.email;
  res.json({ ok: true, user });
});

module.exports = router;