const router = require('express').Router()
const { User, Restaurant } = require('../db/models')

module.exports = router

router.get('/:userId', async (req, res, next) => {
  try {
    const user = User.findOne({
      where: { id: req.params.userId },
      include: [
        {
          model: Restaurant
        }
      ]
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll()
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId', async (req, res, next) => {
  try {
    const [_, user] = await User.update(req.body, {
      returning: true,
      where: {
        id: req.params.userId
      }
    })
    res.json(user[0].dataValues)
  } catch (err) {
    next(err)
  }
})

router.delete('/userId', async (req, res, next) => {
  try {
    await User.destroy({
      where: {
        id: req.params.userId
      }
    })
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})
