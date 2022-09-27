import { combineReducers } from 'redux'

import flatmates from './flatmates'
import user from './user'
import questions from './questions'
import lifeG from './lifeG'
import answers from './answers'
import flat from './flat'
import issues from './issues'
import messages from './messages'
import complaints from './complaints'

export default combineReducers({
  flatmates,
  user,
  questions,
  lifeG,
  answers,
  flat,
  issues,
  messages,
  complaints,
})
