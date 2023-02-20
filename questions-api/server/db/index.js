const mysql = require('mysql2');
const Promise = require('bluebird');

const connection = mysql.createConnection({
  host:'18.191.57.215',
  port:'3306',
  user: 'api',
  password:'Hr@202301',
  // host: '127.0.0.1',
  // user:'root',
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

// const redis = require("redis");
// let redisClient;

// (async () => {
//   redisClient = redis.createClient();

//   redisClient.on("error", (error) => console.error(`Error : ${error}`));

//   await redisClient.connect();
// })();
// const redisAsync: any = Promise.promisifyAll(redis);
// const client = redis.createClient(
//   {
//   host: process.env.REDIS_HOST,
//   port: parseInt(process.env.REDIS_PORT),
//   password: process.env.REDIS_PASSWORD,
// }
// );

// redis.js doesn't support async utils as of writing this article
// we can use the recommended workaround
// export const getAsync = promisify(client.get).bind(client);
// export const setAsync = promisify(client.set).bind(client);
// const getAsync = Promise.promisify(client.get);
// const setAsync = Promise.promisify(client.set);
// const clientAsync = Promise.promisifyAll(client);
// module.exports = {db, getAsync, setAsync};
// module.exports = {db, clientAsync};
module.exports = {db};