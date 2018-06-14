const Restaurant = require('./Restaurant')
const User = require('./User')

User.belongsToMany(Restaurant, { through: 'UserRestaurant' })
Restaurant.belongsToMany(User, { through: 'UserRestaurant' })

module.exports = { User, Restaurant }
