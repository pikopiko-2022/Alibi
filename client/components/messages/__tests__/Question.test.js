import React from 'react'
import { Provider } from 'react-redux'
import { screen, render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Question from '../Question'
import { getAnswersByQuestionApi } from '../../../apis/answersApi'

jest.mock('../../../apis/answersApi')

getAnswersByQuestionApi.mockReturnValue(
  Promise.resolve([
    { id: 1, question_id: 2, answer: 'My name is Ben', is_alibi: 1 },
    { id: 2, question_id: 2, answer: 'My name is Brayden', is_bad: 1 },
    { id: 3, question_id: 2, answer: 'My name is Sarah' },
  ])
)

describe('<Question />', () => {
  const dispatch = jest.fn()
  const fakeStore = {
    subscribe: jest.fn(),
    dispatch,
    getState: () => ({
      user: {
        id: 1,
        token: 1,
      },
      questions: [
        { id: 1, question: 'How are you?' },
        { id: 2, question: 'What is your name?' },
        { id: 3, question: 'How old are you?' },
      ],
    }),
  }
  it('displays a question title and the date based on the id passed in message', async () => {
    render(
      <Provider store={fakeStore}>
        <Question
          message={{
            id: 200,
            question_id: 3,
            date_sent: new Date('2022-04-22 12:51:00'),
            answer_id: null,
          }}
        />
      </Provider>
    )
    const datetime = await screen.findByRole('time')
    expect(datetime.innerHTML).toContain('22 April 2022')
    const questionTitle = screen.getByText('How old are you?')
    expect(questionTitle).toBeDefined()
  })
  it('displays a list of answers based on the question id when clicked', async () => {
    render(
      <Provider store={fakeStore}>
        <Question
          message={{
            id: 200,
            question_id: 2,
            date_sent: new Date('2022-04-22 12:51:00'),
          }}
        />
      </Provider>
    )

    const buttons = await screen.findAllByRole('button')
    fireEvent.click(buttons[0])
    expect(buttons).toHaveLength(1)

    const buttonsExpanded = await screen.findAllByRole('button')
    expect(buttonsExpanded).toHaveLength(4)
    fireEvent.click(buttonsExpanded[1])

    expect(dispatch).toHaveBeenCalledTimes(3)
    expect(buttons).toHaveLength(1)
  })
})
