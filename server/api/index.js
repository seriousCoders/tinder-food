const router = require('express').Router()
const yelp = require('yelp-fusion')
module.exports = router

const client = yelp.client(process.env.YELP_APP_ID)

router.get('/nearby', async (req, res, next) => {
  const testData = await client.search({
    term: 'restaurants',
    latitude: 40.705086,
    longitude: -74.009151,
    radius: 1600,
    open_now: true,
    sort_by: 'rating'
  })
  res.json(testData)
})
