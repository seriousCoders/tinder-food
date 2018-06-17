// ACTIONS

const CHANGED_FILTER = 'CHANGED_FILTER'
const LOADED_DATA = 'LOADED_DATA'

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
    case LOADED_DATA:
      return true
    default:
      return state
  }
}
