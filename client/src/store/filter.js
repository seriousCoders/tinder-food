// ACTIONS

const CHANGED_FILTER = 'CHANGED_FILTER'
const CHANGED_PRICE = 'CHANGED_PRICE'
const CHANGED_RADIUS = 'CHANGED_RADIUS'
const CHANGED_OPEN = 'CHANGED_OPEN'

// ACTION CREATORS

const changedFilter = filter => ({
  type: CHANGED_FILTER,
  filter
})

export const changedPrice = price => ({
  type: CHANGED_PRICE,
  price
})

export const changedRadius = radius => ({
  type: CHANGED_RADIUS,
  radius
})

export const changeOpen = isOpen => ({
  type: CHANGED_OPEN,
  isOpen: !!isOpen
})
// THUNK

export const changeFilter = filter => dispatch => {
  dispatch(changedFilter(filter))
}

const initialState = {
  filter: '',
  price: '',
  radius: 1600,
  isOpen: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case CHANGED_FILTER:
      return { ...state, filter: action.filter }
    case CHANGED_PRICE:
      return { ...state, price: action.price }
    case CHANGED_RADIUS:
      return { ...state, radius: action.radius }
    case CHANGED_OPEN:
      return { ...state, isOpen: action.isOpen }
    default:
      return state
  }
}
