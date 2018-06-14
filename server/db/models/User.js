const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  facebookId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: Sequelize.STRING,
  imageUrl: Sequelize.STRING,
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = User
