const Restaurant = require('./Restaurant')
const User = require('./User')
const Like = require('./Like')

User.belongsToMany(Restaurant, { through: Like })
Restaurant.belongsToMany(User, { through: Like })

module.exports = { User, Restaurant, Like }
