import axios from 'axios'
import { addFavourite } from './restaurants'
import loadRestaurants from '../components/LoadRestaurants'

const GOT_NEARBY = 'GOT_NEARBY'
const POPPED_NEARBY = 'POPPED_NEARBY'

const intialState = []

export const gotNearby = nearby => ({ type: GOT_NEARBY, nearby })
const poppedNearby = id => ({ type: POPPED_NEARBY, id })

export const getNearbyRestaurants = () => async (dispatch, getState) => {
  const { location, filter } = getState()
  const restaurants = await loadRestaurants(
    location,
    filter.filter,
    filter.price,
    filter.radius,
    filter.isOpen
  )
  dispatch(gotNearby(restaurants))
}

export const popNearbyLike = (restaurant, userId, like) => async dispatch => {
  try {
    const { data } = await axios.post(`/api/restaurant`, restaurant)
    await axios.post(`/api/like`, { restaurantId: data.id, userId, like })
    if (like) dispatch(addFavourite(data))
    dispatch(poppedNearby(data.yelpId))
  } catch (error) {
    console.error(error)
  }
}

export default function(state = intialState, action) {
  switch (action.type) {
    case GOT_NEARBY:
      return action.nearby
    case POPPED_NEARBY: {
      const cp = [...state]
      const filtered = cp.filter(el => {
        return action.id !== el.yelpId
      })
      return filtered
    }
    default:
      return state
  }
}
