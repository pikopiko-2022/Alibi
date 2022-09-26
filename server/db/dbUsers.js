const connection = require('./connection')

function addUser(newUser, db = connection) {
  return db('users').insert(newUser)
}

function userExists(username, db = connection) {
  return db('users')
    .where('name', username)
    .then((usersFound) => usersFound.length > 0)
}

function getUser(auth0_id, db = connection) {
  return db('users').select().where({ auth0_id }).first()
}

function getUserIdByAuth0Id(auth0_id, db = connection) {
  return db('users').select('id as userId').where({ auth0_id }).first()
}

function updateUserScore(userId, score, db = connection) {
  return db('users')
    .where('id', userId)
    .update({ rating: db.raw(`rating + ${score}`) })
}

function updateUserEnough(userId, db = connection) {
  return db('users').where('id', userId).update({ had_enough: true })
}

module.exports = {
  addUser,
  userExists,
  getUser,
  getUserIdByAuth0Id,
  updateUserScore,
  updateUserEnough,
}
