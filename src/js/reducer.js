import {
  COUNTDOWN,
  DECRE_BREAK_LEN,
  DECRE_SESSION_LEN,
  INCRE_BREAK_LEN,
  INCRE_SESSION_LEN,
  RESET,
  START_PAUSE
} from './actionTypes'

import initState from './initState'
import INTERVAL_ID from './intervalId'
import { MAX_LEN, MIN_LEN } from './default-values'

function reducer (state, { type }) {
  switch (type) {
    case INCRE_BREAK_LEN:
      // Prevent changing when it hits the max limit
      if (state.breakLength >= MAX_LEN) return state

      // If it's not on session then update 'timeLeft'
      return {
        ...state,
        breakLength: state.breakLength + 1,
        timeLeft: !state.onSession
          ? state.breakLength + 1
          : state.timeLeft
      }

    case DECRE_BREAK_LEN:
      // Prevent changing when it hits the min limit
      if (state.breakLength <= MIN_LEN) return state

      return {
        ...state,
        breakLength: state.breakLength - 1,
        timeLeft: !state.onSession
          ? (state.breakLength - 1) * 60
          : state.timeLeft
      }

    case INCRE_SESSION_LEN:
      if (state.sessionLength >= MAX_LEN) return state

      // If it's on session then update 'timeLeft'
      return {
        ...state,
        sessionLength: state.sessionLength + 1,
        timeLeft: state.onSession
          ? (state.sessionLength + 1) * 60
          : state.timeLeft
      }

    case DECRE_SESSION_LEN:
      if (state.sessionLength <= MIN_LEN) return state

      return {
        ...state,
        sessionLength: state.sessionLength - 1,
        timeLeft: state.onSession
          ? (state.sessionLength - 1) * 60
          : state.timeLeft
      }

    case COUNTDOWN:
      // Switch status after counted to 0
      if (state.timeLeft <= 0) {
        return {
          ...state,
          onSession: !state.onSession,
          timeLeft: state.onSession
            ? state.breakLength * 60
            : state.sessionLength * 60
        }
      }

      return {
        ...state,
        timeLeft: state.timeLeft - 1
      }

    case START_PAUSE:
      return {
        ...state,
        timerOn: !state.timerOn
      }

    case RESET:
      clearInterval(localStorage.getItem(INTERVAL_ID))
      localStorage.clear()

      return initState
  }
}

export default reducer
