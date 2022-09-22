import { combineReducers } from 'redux'

//import reducers
import users from './users'
import loggedInUser from './loggedInUser'

export default combineReducers({
  //reducer variable
  users,
  loggedInUser,
})
