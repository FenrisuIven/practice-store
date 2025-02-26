const pg = require('pg');

async function setupClient() {
  const dbClient = new pg.Client({
    user: 'local',
    password: 'local',
    database: 'practice-store'
  });
  await dbClient.connect().catch(err => {
    console.log(err);
  });
  return dbClient;
}

module.exports = setupClient();