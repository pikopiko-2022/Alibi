const connection = require('./connection')

// TODO change to getFlatmates? and look only for users that match your flat_id
function getUsers(flat_id = 1, db = connection) {
  return db('users').where('flat_id', flat_id).select()
}

function addUser(newUser, db = connection) {
  return db('users')
    .insert(newUser)
    .then(() => getUsers())
}

function userExists(username, db = connection) {
  return db('users')
    .where('name', username)
    .then((usersFound) => usersFound.length > 0)
}

function getUser(auth0_id, db = connection) {
  return db('users')
    .join('flats', 'users.flat_id', '=', 'flats.id')
    .select('users.*', 'flats.name as flatName', 'flats.address as flatAddress')
    .where('users.auth0_id', '=', auth0_id)
    .first()
}

function getUserIdByAuth0Id(auth0_id, db = connection) {
  return db('users').select('id as userId').where({ auth0_id }).first()
}

function updateUserScore(userId, score, db = connection) {
  return db('users')
    .where('id', userId)
    .update({ rating: db.raw(`rating + ${score}`) })
}

module.exports = {
  getUsers,
  addUser,
  userExists,
  getUser,
  getUserIdByAuth0Id,
  updateUserScore,
}
