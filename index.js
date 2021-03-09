require('dotenv').config();
const express = require('express');
const cors = require('cors');
const home = require('./router/home');
const articles = require('./router/articles');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.use('/', home);
app.use('/api/articles', articles);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server is running on port: ${port}`));
