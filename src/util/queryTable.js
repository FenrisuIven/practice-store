const pool = require('../util/database');

module.exports.queryTable = async (queryText) => {
  // const dbClient = await setupClient;

  // const res = await dbClient.query(queryText).catch(err => err)
  // await dbClient.close();

  const res = await pool.query(queryText).catch(err => err);
  return res;
}