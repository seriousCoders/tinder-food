import axios from 'axios'

const GOT_NEARBY = 'GOT_NEARBY'
const REMOVED_NEARBY = 'REMOVE_RESTAURANT'
const POPPED_NEARBY = 'POPPED_NEARBY'

const intialState = []

export const gotNearby = nearby => ({ type: GOT_NEARBY, nearby })
const poppedNearby = () => ({ type: POPPED_NEARBY })

export const popNearbyLike = (restaurant, userId, isLike) => async dispatch => {
  try {
    const like = !!isLike
    const { data } = await axios.post(`api/restaurant`, restaurant)
    await axios.post(`api/like`, { restaurantId: data.id, userId, like })
    dispatch(poppedNearby())
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
      cp.pop()
      return cp
    }
    default:
      return state
  }
}
