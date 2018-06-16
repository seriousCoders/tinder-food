import axios from 'axios'

const GOT_RESTAURANTS = 'GOT_RESTAURANTS'
const REMOVE_RESTAURANT = 'REMOVE_RESTAURANT'

const intialState = []

const gotRestaurants = restaurants => ({ type: GOT_RESTAURANTS, restaurants })
const removedRestaurant = id => ({
  type: REMOVE_RESTAURANT,
  id
})

export const getRestaurant = userId => async dispatch => {
  try {
    // This is eagerLoading from Like table
    const { data } = await axios.get(`/restaurants?id=${userId}`)
    dispatch(gotRestaurants(data))
  } catch (err) {
    console.error(err)
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

export default function(state = intialState, action) {
  switch (action.type) {
    case GOT_RESTAURANTS:
      return action.restaurants
    case REMOVE_RESTAURANT: {
      const cp = [...state]
      const filtered = cp.filter(el => {
        return action.id !== el.id
      })
      return filtered
    }
    default:
      return state
  }
}

// export default restaurants
