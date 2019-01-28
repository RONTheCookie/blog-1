var express = require('express'),
    { r } = require('../index.js'),
    Joi = require('joi');
var router = express.Router();

var newPostRequest = Joi.object().keys({
  title: Joi.string().max(45).min(1).required(),
  content: Joi.string().max(50000).required()
}).required();

router.get('/', async (req, res) => {
  var limit = req.query.limit || 10;
  var posts = await r.table('posts').limit(limit);
  res.json({ posts });
});

module.exports = router;