import axios from 'axios'
// import history from '../history'

const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

const defaultUser = {}

export const getUser = user => ({ type: GET_USER, user })
export const removeUser = () => ({ type: REMOVE_USER })

export const me = () => async dispatch => {
  try {
    const { data } = await axios.get('/auth/me')
    if (data.id) dispatch(getUser(data))
  } catch (err) {
    console.error(err)
  }
}

export const logout = () => dispatch =>
  axios
    .post('/auth/logout')
    .then(_ => {
      dispatch(removeUser())
    })
    .catch(err => console.log(err))

export const deleteUser = id => dispatch =>
  axios
    .delete(`/api/user/${id}`)
    .then(_ => {
      dispatch(removeUser())
    })
    .catch(err => console.log(err))

export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
