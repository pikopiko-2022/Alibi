import { combineReducers } from 'redux'

import users from './users'
import questions from './questions'
import lifeG from './lifeG'
import answers from './answers'
import flats from './flats'
import create from './create'


export default combineReducers({
  users,
  questions,
  lifeG,
  answers,
  flats,
  create,
})
