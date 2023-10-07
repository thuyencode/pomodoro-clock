import {
  BREAK_LEN,
  MAX_LEN,
  MIN_LEN,
  SESSION_LEN,
  TIME_LEFT
} from '@/constants'
import { Action } from '../types/action'

type State = {
  breakLength: number
  sessionLength: number
  timeLeft: number
  timerOn: boolean
  onSession: boolean
}

export const initialState = {
  breakLength: BREAK_LEN,
  sessionLength: SESSION_LEN,
  timeLeft: TIME_LEFT,
  timerOn: false,
  onSession: true,
} as const

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'increase_break_length':
      // Prevent changing when it hits the max limit
      if (state.breakLength >= MAX_LEN) return state

      // If it's not on session then update 'timeLeft'
      return {
        ...state,
        breakLength: state.breakLength + 1,
        timeLeft: !state.onSession ? state.breakLength + 1 : state.timeLeft,
      }

    case 'decrease_break_length':
      // Prevent changing when it hits the min limit
      if (state.breakLength <= MIN_LEN) return state

      return {
        ...state,
        breakLength: state.breakLength - 1,
        timeLeft: !state.onSession
          ? (state.breakLength - 1) * 60
          : state.timeLeft,
      }

    case 'increase_session_length':
      if (state.sessionLength >= MAX_LEN) return state

      // If it's on session then update 'timeLeft'
      return {
        ...state,
        sessionLength: state.sessionLength + 1,
        timeLeft: state.onSession
          ? (state.sessionLength + 1) * 60
          : state.timeLeft,
      }

    case 'decrease_session_length':
      if (state.sessionLength <= MIN_LEN) return state

      return {
        ...state,
        sessionLength: state.sessionLength - 1,
        timeLeft: state.onSession
          ? (state.sessionLength - 1) * 60
          : state.timeLeft,
      }

    case 'countdown':
      // Switch status after counted to 0
      if (state.timeLeft <= 0) {
        return {
          ...state,
          onSession: !state.onSession,
          timeLeft: state.onSession
            ? state.breakLength * 60
            : state.sessionLength * 60,
        }
      }

      return {
        ...state,
        timeLeft: state.timeLeft - 1,
      }

    case 'pause_resume':
      return {
        ...state,
        timerOn: !state.timerOn,
      }

    case 'reset':
      return initialState

    default:
      return state
  }
}
