const express = require('express');
const bodyParser = require('body-parser');
const googleSheets = require('gsa-sheets');
const path = require('path');
const exphbr = require('express-handlebars');
const { genId, validateId, genPrompt } = require('./src/helper');
// TODO(you): Update the contents of privateSettings accordingly, as you did
// in HW5, then uncomment this line.
const key = require('./privateSettings.json');

// TODO(you): Change the value of this string to the spreadsheet id for your
// GSA spreadsheet, as you did in HW5, then uncomment these lines.
const SPREADSHEET_ID = '1XKk2RWkj6PSkvKqP-5y3ZVgHzk6jaE_EjPfNJGbIPkk';
const sheet = googleSheets(key.client_email, key.private_key, SPREADSHEET_ID);

const jsonParser = bodyParser.json();
const app = express();
const hbs = exphbr.create();
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static('public'));

async function onGetStart(req, res) {
  res.render('index', {
    title: 'Create a Diary Journal',
  });
}
app.get('/', onGetStart);

// TODO(you): Add at least 1 GET route and 1 POST route.
async function onGetEditor(req, res) {
  const { id } = req.params;
  if(!validateId(id)) res.redirect(genId());
  else {
    const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    res.render('editor', {
      title: 'Diary Editor' + id,
      date: today,
      prompt: genPrompt(),
    });
  }
}
app.get('/id/:id', onGetEditor);

async function onGetNewId(req, res) {
  res.redirect(genId());
}
app.get('/id/', onGetNewId);

// Please don't change this; this is needed to deploy on Heroku.
const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Server listening on port ${port}!`);
});
