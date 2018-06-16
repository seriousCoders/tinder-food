import axios from 'axios'

// ACTIONS
const GOT_RESTAURANTS = 'GOT_RESTAURANTS'
const REMOVED_RESTAURANT = 'REMOVE_RESTAURANT'
const CREATED_RESTAURANT = 'CREATED_RESTAURANT'

//ACTION CREATORS
const gotRestaurants = restaurants => ({ type: GOT_RESTAURANTS, restaurants })

const removedRestaurant = id => ({
  type: REMOVED_RESTAURANT,
  id
})

const createdRestaurant = restaurant => ({
  type: CREATED_RESTAURANT,
  restaurant
})

// THUNKS
export const getRestaurant = userId => async dispatch => {
  try {
    // This is eagerLoading from Like table
    const { data } = await axios.get(`/restaurants?id=${userId}`)
    dispatch(gotRestaurants(data))
  } catch (err) {
    console.error(err)
  }
}

export const createRestaurant = (restaurant, userId) => async dispatch => {
  try {
    const { data } = await axios.post(`/restaurants`, restaurant)
    await axios.post(`/like`, { userId, restaurantId: data.id })
    dispatch(createdRestaurant(restaurant))
  } catch (error) {
    console.error(error)
  }
}

export const removeRestaurant = id => async dispatch => {
  try {
    await axios.delete(`/restaurants/${id}`)
    dispatch(removedRestaurant)
  } catch (err) {
    console.error(err)
  }
}

// INITIAL STATE
const intialState = []

// REDUCER
export default function(state = intialState, action) {
  switch (action.type) {
    case GOT_RESTAURANTS:
      return action.restaurants
    case REMOVED_RESTAURANT: {
      const cp = [...state]
      const filtered = cp.filter(el => {
        return action.id !== el.id
      })
      return filtered
    }
    case CREATED_RESTAURANT:
      return [...state, action.restaurant]

    default:
      return state
  }
}
