var express = require('express'),
    { r } = require('../index.js');
var router = express.Router();

router.get('/', async (req, res) => {
  var limit = req.query.limit || 10;
  var posts = await r.table('posts').limit(limit);
  res.json({ posts });
});

module.exports = router;