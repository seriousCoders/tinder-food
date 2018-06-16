const db = require('../db')
const Sequelize = require('sequelize')

const Like = db.define('like', {
  like: Sequelize.BOOLEAN
})

module.exports = Like
