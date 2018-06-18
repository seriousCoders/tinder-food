import axios from 'axios'

const getRestaurants = async (location, filter, price, radius, isOpen) => {
  const [latitude, longitude] = location
  const isFilter = filter ? `&categories=${filter}` : ''
  const isPrice = price ? `&price=${price}` : '&price=1,2,3,4'
  const isRadius = radius ? `&radius=${radius}` : `&radius=${1600}`
  const openNow = isOpen ? `&open_now=${isOpen}` : `&open=${false}`

  const { data } = await axios.get(
    `/api/yelp/nearby?latitude=${latitude}&longitude=${longitude}${isFilter}${isPrice}${isRadius}${openNow}`
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
  if (businesses[0]) {
    const output = []
    let i = 0
    while (i < 10) {
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
      const address = location.display_address
      output.push({
        yelpId: id,
        name,
        imageUrl: image_url,
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        address,
        price,
        photos
      })
    }
    return output
  } else {
    return false
  }
}

export default async (location, filter, price, radius) => {
  const delayedAxios = delay(axios.get.bind(axios))
  const restaurants = await getRestaurants(location, filter, price, radius)
    .then(businesses => getDetails(businesses, delayedAxios, 1))
    .then(results => results)
  return restaurants
}
