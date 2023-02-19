const express = require('express');
const cors = require('cors')
const router = require('./api/routes/index');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const app = express()

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan('dev'));

app.use(router)

app.use((req, res, next) => {
  res.status(404).json({
    url: req.originalUrl,
    msg: "Sorry, that page does not exist",
  })
})
  
  // error handler
  
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    const status = err.statusCode || 500;
    const message = err.message || err;
    res.status(status).json({ message });
    console.error(err)
  });



module.exports = app