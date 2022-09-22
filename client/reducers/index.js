import { combineReducers } from 'redux'

//import reducers
import users from './users'
import create from './create'

export default combineReducers({
  //reducer variable
  users,
  create,
})
