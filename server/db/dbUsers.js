const connection = require('./connection')

// TODO change to getFlatmates? and look only for users that match your flat_id
function getUsers(db = connection) {
  return db('users').select()
}

function getUser(auth0_id, db = connection) {
  return db('users')
    .join('flats', 'users.flat_id', '=', 'flats.id')
    .select('users.*', 'flats.name as flatName', 'flats.address as flatAddress')
    .where('users.auth0_id', '=', auth0_id)
    .first()
}

module.exports = { getUsers, getUser }
