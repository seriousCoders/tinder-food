const GET_LOCATION = 'GET_LOCATION'
const REMOVE_LOCATION = 'REMOVE_LOCATION'

const initialState = []

export const getLocation = location => ({ type: GET_LOCATION, location })
export const removeLocation = () => ({ type: REMOVE_LOCATION })

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_LOCATION:
      return action.location
    case REMOVE_LOCATION:
    default:
      return state
  }
}
