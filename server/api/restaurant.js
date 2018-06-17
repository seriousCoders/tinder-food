const router = require('express').Router()
const { Restaurant, User } = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (!req.query.id) {
      const restaurants = await Restaurant.findAll()
      res.json(restaurants)
    } else {
      const userResturants = await User.findOne({
        where: {
          id: req.query.id
        },
        include: [{ model: Restaurant }]
      })
      res.json(userResturants)
    }
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findOrCreate({
      where: { yelpId: req.body.id },
      defaults: req.body
    }).spread(result => result)
    res.json(restaurant)
  } catch (err) {
    next(err)
  }
})

router.put('/:restaurantId', async (req, res, next) => {
  try {
    const [_, restaurant] = await Restaurant.update(req.body, {
      returning: true,
      where: {
        id: req.params.restaurantId
      }
    })
    res.send(restaurant[0].dataValues)
  } catch (err) {
    next(err)
  }
})

router.delete('/:restaurantId', async (req, res, next) => {
  try {
    await Restaurant.destroy({
      where: {
        id: req.params.restaurantId
      }
    })
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})
