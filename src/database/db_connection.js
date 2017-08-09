// Add code below to connect to your database
const {Pool} = require('pg'),
      url = require('url');
require('env2')('./src/config.env');

if(!process.env.DB_URL){
  throw new Error('environment variable DB_URL is not found');
}

//parse DB_URL, split it
const params = url.parse(process.env.DB_URL);
const [username, password] = params.auth.split(':');


//db_url = 'postgres://username:password@localhost:5432/mydb'
const options = {
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  max: process.env.DB_MAX_CONNECTIONS || 2,
  user: username,
  password, //ES6
  ssl: params.hostname !== 'localhost'
};

module.exports = new Pool(options);
