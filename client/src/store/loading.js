// ACTIONS

const CHANGED_FILTER = 'CHANGED_FILTER'
const LOADED_DATA = 'LOADED_DATA'
const CHANGED_PRICE = `CHANGED_PRICE`
const CHANGED_RADIUS = 'CHANGED_RADIUS'

// ACTION CREATORS

const loadedData = () => ({
  type: LOADED_DATA
})

// THUNK

export const loadData = () => dispatch => {
  dispatch(loadedData())
}

const initialState = false

export default function(state = initialState, action) {
  switch (action.type) {
    case CHANGED_FILTER:
      return false
    case CHANGED_PRICE:
      return false
    case CHANGED_RADIUS:
      return false
    case LOADED_DATA:
      return true
    default:
      return state
  }
}
