var express = require('express'),
    config = require('../../config.json'),
    constants = require('../constants.js'),
    Octokit = require('@octokit/rest'),
    { r } = require('../index.js'),
    queryString = require('querystring'),
    jwt = require('jsonwebtoken'),
    fetch = require('node-fetch');
var router = express.Router();

router.get('/github/login', (req, res) => {
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${config.githubClientId}&redirect_uri=${encodeURIComponent(constants.API_BASE + '/api/auth/github/callback')}&scope=user:email`);
});

router.get('/github/callback', async (req, res) => {
  if (!req.query.code) return res.status(400).json({ error: 'Missing code querystring' });
  var _res = await fetch(`https://github.com/login/oauth/access_token?client_id=${config.githubClientId}&client_secret=${config.githubClientSecret}&code=${encodeURIComponent(req.query.code)}`)
  var _queryString = await _res.text();
  var json = queryString.parse(_queryString);
  var token = json.access_token;
  if (!token) return res.status(400).json({ ok: false, error: 'Invalid code' });
  var authClient = new Octokit({ auth: `token ${token}` });
  var { data } = await authClient.users.getAuthenticated({});
  var emails = await authClient.users.listEmails({});
  var primaryEmail = emails.data.filter((e) => e.primary === true)[0].email;
  var user = await r.table('users').get(data.id).run();
  if (user) {
    await r.table('users').update({
      id: data.id,
      avatar_url: data.avatar_url,
      username: data.username,
      location: data.location,
      email: primaryEmail
    });
  } else {
    await r.table('users').insert({
      id: data.id,
      avatar_url: data.avatar_url,
      username: data.username,
      created_at: data.created_at,
      location: data.location,
      flags: [],
      email: primaryEmail
    });
  }
  var jwtToken = await jwt.sign(data.id, constants.JWT_PRIVATE);
  res.send(`
      <script>opener.postMessage('${jwtToken}', '${constants.HTML_BASE}'); close();</script>
  `);
});

module.exports = router;