const mongoose = require('mongoose');
const categories = require('./routes/categories');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:27017/categories')
  .then(() => console.log('Connected to MongoDB/categories...'))
  .catch(err => console.error('Could not connect to MongoDB/categories...'));
app.disable('etag');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));


app.use('/categories', categories);

const port = process.env.PORT || 2401;
app.listen(port, () => console.log(`Listening on port ${port}...`));
