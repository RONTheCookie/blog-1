var express = require('express'),
    morgan  = require('morgan'),
    helmet  = require('helmet'),
    path    = require('path'),
    fs      = require('fs'),
    marked  = require('marked'),
    ejs     = require('ejs');
const PORT = process.env.PORT || 3000;

var app = express();

var renderer = new marked.Renderer();
require('marked-images')(renderer);

app.use(helmet());
app.use(morgan('dev'));

app.set('view engine', 'ejs');

app.get('/posts/:slug', (req, res) => {
  var slug = req.params.slug.toLowerCase();
  var file = path.resolve('posts', slug + (slug.endsWith('.md') ? '' : '.md'));
  if (!fs.existsSync(file)) return res.status(404).send('Post not found');
  var content = fs.readFileSync(file).toString();
  var lines = content.split('\n');
  var meta = lines[0];
  lines.shift();
  res.render('post', { content: marked(lines.join('\n').trim(), { renderer }), meta: JSON.parse(meta) });
});

app.listen(PORT, () => console.log('blog listening on ' + PORT));