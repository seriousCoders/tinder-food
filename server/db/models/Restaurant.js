const Sequelize = require('sequelize')
const db = require('../db')

const Restaurant = db.define('restaurant', {
  name: Sequelize.STRING,
  imageUrl: Sequelize.STRING,
  yelpId: {
    type: Sequlize.STRING,
    allowNull: false
  },
  latitude: Sequelize.FLOAT,
  longitude: sequelize.FLOAT,
  address: Sequelize.JSON,
  price: Seqeulize.STRING
})

module.exports = Restaurant
