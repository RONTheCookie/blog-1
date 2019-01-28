var express = require('express'),
    { r } = require('../index.js'),
    { handleJoi, slugify } = require('../util.js'),
    sanitize = require('sanitize-html'),
    Joi = require('joi');
var router = express.Router();

var newPostRequest = Joi.object().keys({
  title: Joi.string().max(60).min(1).required(),
  content: Joi.string().max(50000).required(),
  subtitle: Joi.string().max(35)
}).required();

router.get('/', async (req, res) => {
  var limit = req.query.limit || 10;
  var posts = await r.table('posts').limit(limit);
  res.json({ ok: true, posts });
});

router.post('/', async (req, res) => {
  if (!req.user) return res.status(403).json({ error: 'You are not authenticated' });
  if (!(req.user.flags.includes('canPost')) || req.user.flags.includes('admin')) return res.status(403).json({ error: 'You are not authorized to make new posts' });
  if (!await handleJoi(newPostRequest, req, res)) return;
  var date = new Date();
  var safeTitle = sanitize(req.body.title, { allowedTags: [], allowedAttributes: {} });
  var insert = await r.table('posts').insert({
    title: safeTitle,
    subtitle: req.body.subtitle ? sanitize(req.body.subtitle, { allowedTags: [], allowedAttributes: {} }) : null,
    content: sanitize(req.body.content, { allowedTags: [], allowedAttributes: {} }),
    created_at: Date.now(),
    date_string: [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-'),
    slug: slugify(safeTitle),
    author_id: req.user.id,
    liked_by: [],
    comments: [],
    hidden: false
  });
  res.json({ post: await r.table('posts').get(insert.generated_keys[0]).run() });
});

module.exports = router;