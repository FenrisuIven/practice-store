const setupClient = require('../util/database');

module.exports.queryTable = async (queryText) => {
  const dbClient = await setupClient;

  const res = await dbClient.query(queryText).catch(err => err)
  await dbClient.end();

  return res;
}