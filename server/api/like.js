const router = require('express').Router()
const { Restaurant } = require('../db/models')
const { Like } = require('../db/models')

module.exports = router

router.post(`/`, async (req, res, next) => {
  await Like.create(req.body)
  res.sendStatus(200)
})

// router.delete('/', async (req, res, next) => {
//   await Like.bul
// })
