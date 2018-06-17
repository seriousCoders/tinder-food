import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import favourites from './restaurants'
import restaurants from './nearby'
import location from './location'
import loading from './loading'
import filter from './filter'

const reducer = combineReducers({
  user,
  restaurants,
  favourites,
  location,
  filter,
  loading
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)
const store = createStore(reducer, middleware)

export default store
