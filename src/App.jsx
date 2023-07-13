import { useEffect, useReducer, useRef, useState } from 'react'
import clockBeep from './assets/audio/mixkit-alarm-clock-beep-988.wav'
import Clock from './components/Clock'
import Control from './components/Control'
import Length from './components/Length'
import Reset from './components/Reset'
import {
  COUNTDOWN,
  DECRE_BREAK_LEN,
  DECRE_SESSION_LEN,
  INCRE_BREAK_LEN,
  INCRE_SESSION_LEN,
  RESET,
  START_PAUSE
} from './js/actionTypes'
import { BREAK, SESSION } from './js/default-values'
import initState from './js/initState'
import INTERVAL_ID from './js/intervalId'
import reducer from './js/reducer'

function App () {
  const ref = useRef(null)
  const [
    { breakLength, sessionLength, timeLeft, timerOn, onSession },
    dispatch
  ] = useReducer(reducer, initState)
  const [percent, setPercent] = useState(100)

  useEffect(() => {
    const beep = ref.current

    // Pause and rewound
    const pauseSound = () => {
      beep.pause()
      beep.currentTime = 0
    }

    // https://developer.chrome.com/blog/play-request-was-interrupted/
    const playSound = () => {
      const playPromise = beep.play()

      if (playPromise !== undefined) {
        playPromise.then((_) => {}).catch((error) => console.error(error))
      }
    }

    // My stupid trick to bypass
    // "DOMException: The play method is not allowed by the user agent"
    document.addEventListener(
      'click',
      () => {
        playSound()
        pauseSound()
      },
      { once: true }
    )

    const pauseSoundAfter = () => {
      if (beep.currentTime >= 3) pauseSound()
    }

    // Auto pause after 3 secs
    beep.addEventListener('timeupdate', pauseSoundAfter)

    if (timeLeft <= 1) playSound()
    return () => {
      beep.removeEventListener('timeupdate', pauseSoundAfter)
    }
  }, [timeLeft])

  useEffect(() => {
    let interval

    const currentLen = onSession ? sessionLength * 60 : breakLength * 60

    if (timerOn) {
      // Auto run every 1 sec
      interval = setInterval(() => {
        let per

        if (timeLeft === 1) per = 0
        else if (timeLeft <= 0) per = 100
        else per = (100 / currentLen) * (timeLeft - 1)

        setPercent(per)

        return dispatch({ type: COUNTDOWN })
      }, 1000)

      // Save it to local store so it can be cleared in 'reducer.js'
      localStorage.setItem(INTERVAL_ID, interval)
    } else {
      clearInterval(interval)
      localStorage.clear()
    }

    return () => {
      clearInterval(interval)
      localStorage.clear()
    }
  }, [breakLength, onSession, sessionLength, timeLeft, timerOn])

  return (
    <div
      className={`flex h-screen flex-col items-center justify-center space-y-8 font-body ${
        onSession ? 'bg-gray-950 text-gray-50' : 'bg-gray-50 text-gray-950'
      }`}
    >
      <audio id="beep" src={clockBeep} ref={ref} hidden />
      <h1 className="text-5xl">25 + 5 Clock</h1>
      <div className="flex flex-col items-center space-y-8 sm:flex-row sm:space-x-8 sm:space-y-0">
        <div className="flex flex-col space-y-4">
          {/* Radial Progress */}
          <Clock
            percent={percent}
            size={'11rem'}
            thickness={'4px'}
            onSession={onSession}
            timeLeft={timeLeft}
          />

          {/* Control buttons */}
          <div className="join justify-center">
            {/* Start, pause */}
            <Control
              className="btn-neutral btn-sm join-item btn hover:text-white"
              dispatch={() => dispatch({ type: START_PAUSE })}
              timerOn={timerOn}
            />

            {/* Reset */}
            <Reset
              className="btn-neutral btn-sm join-item btn hover:text-white"
              dispatch={() => {
                dispatch({ type: RESET })
                setPercent(100)
                // The only way I know to pass that mf "User Story #28"
                document.getElementById('beep').pause()
                document.getElementById('beep').currentTime = 0
              }}
            />
          </div>
        </div>
        <div className="flex items-center justify-between space-x-4 sm:flex-col sm:space-x-0 sm:space-y-4">
          <Length
            id={BREAK}
            types={[DECRE_BREAK_LEN, INCRE_BREAK_LEN]}
            time={breakLength}
            dispatch={dispatch}
          />
          <Length
            id={SESSION}
            types={[DECRE_SESSION_LEN, INCRE_SESSION_LEN]}
            time={sessionLength}
            dispatch={dispatch}
          />
        </div>
      </div>
    </div>
  )
}

export default App
