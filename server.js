const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

//Load env variables
dotenv.config({ path: './config/config.env' });

//Connect to Database
connectDB();

//route files
const bootcamps = require('./routes/bootcamps');

const app = express();

//To Use req.body object
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Mount routers
app.use('/api/v1/bootcamps', bootcamps);

//Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan(':url'));
}

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
