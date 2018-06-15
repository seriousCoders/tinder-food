const Sequelize = require('sequelize')
const db = require('../db')

const Restaurant = db.define('restaurant', {
  name: Sequelize.STRING,
  imageUrl: Sequelize.STRING,
  yelpId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  latitude: Sequelize.FLOAT,
  longitude: Sequelize.FLOAT,
  address: Sequelize.JSON,
  price: Sequelize.STRING,
  photos: Sequelize.ARRAY(Sequelize.STRING)
})

module.exports = Restaurant
