import { combineReducers } from 'redux'

import flatmates from './flatmates'
import user from './user'
import questions from './questions'
import lifeG from './lifeG'
import answers from './answers'
import flats from './flats'
import issues from './issues'
import messages from './messages'

export default combineReducers({
  flatmates,
  user,
  questions,
  lifeG,
  answers,
  flats,
  issues,
  messages,
})
