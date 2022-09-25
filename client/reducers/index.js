import { combineReducers } from 'redux'

import users from './users'
import user from './user'
import questions from './questions'
import lifeG from './lifeG'
import answers from './answers'
import flats from './flats'
import create from './create'
import messages from './messages'

export default combineReducers({
  users,
  user,
  questions,
  lifeG,
  answers,
  flats,
  create,
  messages,
})
