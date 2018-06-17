// ACTIONS

const CHANGED_FILTER = 'CHANGED_FILTER'

// ACTION CREATORS

const changedFilter = filter => ({
  type: CHANGED_FILTER,
  filter
})

// THUNK

export const changeFilter = filter => dispatch => {
  dispatch(changedFilter(filter))
}

const initialState = ''

export default function(state = initialState, action) {
  switch (action.type) {
    case CHANGED_FILTER:
      return action.filter
    default:
      return state
  }
}
