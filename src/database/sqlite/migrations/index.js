const sqliteConnection = require('../../sqlite')

const createUsers = require('./createUser')

async function migrationRun() {
  const schemas = [
    createUsers
  ].join('');

  sqliteConnection()
    .then(db => db.exec(schemas))
    .catch(error => console.log)
}


module.exports = migrationRun;