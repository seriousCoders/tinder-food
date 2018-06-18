// ACTIONS

const CHANGED_FILTER = 'CHANGED_FILTER'
const GOT_NEARBY = 'GOT_NEARBY'
const LOADED_DATA = 'LOADED_DATA'
const CHANGED_PRICE = `CHANGED_PRICE`
const CHANGED_RADIUS = 'CHANGED_RADIUS'

// ACTION CREATORS

export const loadData = () => ({
  type: LOADED_DATA
})

const initialState = false

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADED_DATA:
    case GOT_NEARBY:
      return true
    case CHANGED_FILTER:
    case CHANGED_PRICE:
    case CHANGED_RADIUS:
      return false
    default:
      return state
  }
}
