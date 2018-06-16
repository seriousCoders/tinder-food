import axios from 'axios'

const getRestaurants = async location => {
  const [latitude, longitude] = location
  const { data } = await axios.get(
    `/api/yelp/nearby?latitude=${latitude}&longitude=${longitude}`
  )
  const businesses = data.jsonBody.businesses
  return businesses
}

const delay = func => (time, ...args) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(func(...args))
    }, time)
  })

const getDetails = async (businesses, func, time) => {
  const output = []
  let i = 0
  while (i < 3) {
    const rest = await func(time, `/api/yelp/${businesses[i].id}`)
    i++
    const {
      id,
      name,
      image_url,
      location,
      coordinates,
      price,
      photos
    } = rest.data.jsonBody
    output.push({
      yelpId: id,
      name,
      imageUrl: image_url,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      address: JSON.stringify(location),
      price,
      photos
    })
  }
  return output
}

export default async location => {
  const businesses = await getRestaurants(location)
  const delayedAxios = delay(axios.get.bind(axios))
  const restaurants = await getDetails(businesses, delayedAxios, 1)
  return restaurants
}
