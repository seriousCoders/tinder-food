const router = require('express').Router()
const { Like } = require('../db/models')

module.exports = router

router.post(`/`, async (req, res, next) => {
  await Like.create(req.body)
  res.sendStatus(200)
})

router.delete('/', async (req, res, next) => {
  try {
    await Like.destroy({
      where: {
        restaurantId: req.body.restaurantId,
        userId: req.body.userId
      }
    })
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})
