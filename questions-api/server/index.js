
const {app} = require('./app.js');
// const redis = require("redis");
const PORT =  2600;
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

// let redisClient;

// (async () => {
//   redisClient = redis.createClient();

//   redisClient.on("error", (error) => console.error(`Error : ${error}`));

//   await redisClient.connect();
// })();



