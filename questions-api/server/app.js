const express = require('express');
const app = express();
// const {db} = require('./db');
const router = require('./routes.js');


app.use(express.json());
app.use('/', router);

const sum =(a, b) => {
  return a + b;
};
module.exports = {app,sum};
