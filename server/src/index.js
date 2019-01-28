var express = require('express'),
  ejwt = require('express-jwt'),
  morgan = require('morgan'),
  constants = require('./constants.js');
  fs = require('fs');

var app = express();

var r = module.exports.r = require('rethinkdbdash')({ db: 'danielblog' });

app.enable('trust proxy');

app.use(express.json());
app.use(morgan('dev'));

app.use(ejwt({ secret: constants.JWT_PRIVATE, credentialsRequired: false }), async (req, res, next) => {
  if (!req.user) return next();
  var id = parseInt(req.user, 10);
  var user = await r.table('users').get(id).run();
  req.user = user;
  next();
});

app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/posts', require('./routes/posts.js'));
app.use('/api/users', require('./routes/users.js'));

app.listen(constants.PORT, () => console.log('blog api listening on port ' + constants.PORT));
