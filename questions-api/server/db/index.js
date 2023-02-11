const mysql = require('mysql2');
const Promise = require('bluebird');

const connection = mysql.createConnection({
  // host:'localhost',
  // port:'3306',
  // user: 'api',
  // password:'Hr@202301',
  host: '127.0.0.1',
  user:'root',
  database: 'test'



});

// connection.connect((err) => {
//   if(err){
//     console.log("unable to connect to the database");
//   }
//   console.log('Connection has been established successfully.');
// });
// try {
//   db.connect();
//   console.log('Connection has been established successfully.');
// } catch (error) {
//   console.error('Unable to connect to the database:', error);
// }
// db.query(
//   'SELECT * FROM `questions` WHERE `id` < 10',
//   function(err, results, fields) {
//     console.log(results); // results contains rows returned by server
//     // console.log(fields); // fields contains extra meta data about results, if available
//   }
// );

const db=Promise.promisifyAll(connection, {multiArgs: true});

db.connectAsync()
  .then(() => console.log(`Connected to MySQL as id: ${db.threadId}`))
  .catch((err) => console.log(err));

module.exports = {db};