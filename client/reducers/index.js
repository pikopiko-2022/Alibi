import { combineReducers } from 'redux'

import users from './users'
import loggedInUser from './loggedInUser'
import questions from './questions'
import lifeG from './lifeG'
import answers from './answers'
import flats from './flats'
import create from './create'

export default combineReducers({
  users,
  loggedInUser,
  questions,
  lifeG,
  answers,
  flats,
  create,
})
