const express = require('express');
const app = express();
// const {db} = require('./db');
const router = require('./routes.js');


app.use(express.json());


app.use('/', router);
app.get('/loaderio-ad5d1d407e7504a7b0732c822f4a0af1.txt', (req, res) => {
  res.status(200).download('./loaderio-ad5d1d407e7504a7b0732c822f4a0af1.txt')
});

const sum =(a, b) => {
  return a + b;
};
module.exports = {app,sum};
