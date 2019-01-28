var express = require('express'),
  { r } = require('../index.js');
var router = express.Router();

router.get('/:id', async (req, res) => {
  var user = await r.table('users').get(req.params.id);
  delete user.email;
  res.json({ ok: true, user });
});

module.exports = router;