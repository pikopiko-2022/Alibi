const connection = require('./connection')

function getUsers(db = connection) {
  return db('users').select()
}

function addUser(newUser, db = connection) {
  return db('users').insert({newUser})
}

function userExists(username, db = connection) {
  return db('users')
    .where('name', username)
    .then((usersFound) => usersFound.length > 0)
}

module.exports = { getUsers, addUser, userExists }
