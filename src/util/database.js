const pg = require('pg');

async function setupClient() {
  // const dbClient = new pg.Client({
  //   user: 'local',
  //   password: 'local',
  //   database: 'practice-store'
  // });
  // await dbClient.connect().catch(err => {
  //   console.log(err);
  // });
  // return dbClient;
}

const pool = new pg.Pool({
  host: 'localhost',
  user: 'local',
  password: 'local',
  database: 'practice-store'
});

module.exports = pool;