const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

//route files
const bootcamps = require('./routes/bootcamps');

//Load env variables
dotenv.config({ path: './config/config.env' });

const app = express();

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