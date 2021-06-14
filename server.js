require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const Url = require('./models/URL');
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((error) => {
    console.error(`error connecting to mongodb ${error.message}`);
  });

// Basic Configuration
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/shorturl', async (req, res) => {
  const regex = new RegExp('https?://www.');
  if (regex.test(req.body.url)) {
    const myUrl = await Url.find({ original_url: req.body.url });
    if (myUrl.length === 1) {
      res.json(myUrl);
    } else {
      const all = await Url.find({});
      const newShortUrl = all.length + 1;
      const newUrl = new Url({
        original_url: req.body.url,
        short_url: newShortUrl,
      });
      newUrl.save();
      res.json(newUrl);
    }
  } else {
    res.status(406).json({ error: 'invalid url' });
  }
});
app.get('/api/shorturl/:id', async (req, res) => {
  const shortUrl = Number(req.params.id);
  console.log(shortUrl);
  const myUrl = await Url.findOne({ short_url: shortUrl });
  console.log(myUrl);

  if (myUrl) {
    res.redirect(myUrl.original_url);
  } else {
    res.status(404).json({ error: 'invalid short url' });
  }
});
// Your first API endpoint
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
