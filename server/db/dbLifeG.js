const connection = require('./connection')

function getLifeG(db = connection) {
  return db('life_guidance').select()
}

module.exports = { getLifeG }
