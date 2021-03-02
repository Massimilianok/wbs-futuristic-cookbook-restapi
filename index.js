require('dotenv').config();
const express = require('express');
const cors = require('cors');
const articles = require('./router/articles');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/articles', articles);

app.get('/', (req, res) => {
  res.send('Cookbook API');
});

app.all('*', (req, res) => {
  res.redirect('/');
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server is running on port: ${port}`));
