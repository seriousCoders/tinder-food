import axios from 'axios'

const GOT_NEARBY = 'GOT_Nearby'
const REMOVED_NEARBY = 'REMOVE_RESTAURANT'
// const CREATED_NEARBY = 'CREATED_RESTAURANT'

const intialState = []

const gotNearby = nearby => ({ type: GOT_NEARBY, nearby })

// const removedNearby = id => ({
//   type: REMOVED_NEARBY,
//   id
// })

// const createdRestaurant = restaurant => ({
//   type: CREATED_RESTAURANT,
//   restaurant
// })

export const getNearby = nearby => async dispatch => {
  try {
    // This is eagerLoading from Like table
    dispatch(gotNearby(nearby))
  } catch (err) {
    console.error(err)
  }
}

// export const createRestaurant = (restaurant, userId) => async dispatch => {
//   try {
//     const { data } = await axios.post(`/restaurants`, restaurant)
//     await axios.post(`/like`, { userId, restaurantId: data.id })
//     dispatch(createdRestaurant(restaurant))
//   } catch (error) {
//     console.error(error)
//   }
// }

// export const removeRestaurant = id => async dispatch => {
//   try {
//     await axios.delete(`/restaurants/${id}`)
//     dispatch(removedRestaurant)
//   } catch (err) {
//     console.error(err)
//   }
// }

export default function(state = intialState, action) {
  switch (action.type) {
    case GOT_NEARBY:
      return action.nearby
    default:
      return state
  }
}
