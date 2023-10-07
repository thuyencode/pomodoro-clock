import clockBeepSound from '@/assets/audio/mixkit-alarm-clock-beep-988.wav'
import { initialState, reducer } from '@/reducers'
import { Action } from '@/types/action'
import {
  Dispatch,
  ReactElement,
  SetStateAction,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react'

type ContextType = {
  breakLength: number
  sessionLength: number
  percent: number
  setPercent: Dispatch<SetStateAction<number>>
  onSession: boolean
  timeLeft: number
  timerOn: boolean
  dispatch: Dispatch<Action>
}

export const Context = createContext<ContextType | null>(null)

export function ContextProvider({ children }: { children: ReactElement }) {
  const ref = useRef<HTMLAudioElement | null>(null)
  const [
    { breakLength, sessionLength, timeLeft, timerOn, onSession },
    dispatch,
  ] = useReducer(reducer, initialState)
  const [percent, setPercent] = useState(100)

  const currentLen = useMemo(() => {
    return onSession ? sessionLength * 60 : breakLength * 60
  }, [breakLength, onSession, sessionLength])

  useEffect(() => {
    if (onSession) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [onSession])

  // My trick to work around the following exception
  // "DOMException: The play method is not allowed by the user agent"
  useEffect(() => {
    function clickToGetPassTheException() {
      playSound()
      pauseSound()
    }

    document.addEventListener('click', clickToGetPassTheException, {
      once: true,
    })

    return () => {
      document.removeEventListener('click', clickToGetPassTheException)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const playSound = useCallback(() => {
    const beep = ref.current

    if (beep == null) return

    // https://developer.chrome.com/blog/play-request-was-interrupted/
    const playPromise = beep.play()

    if (playPromise !== undefined) {
      playPromise.catch((error) => console.error(error))
    }
  }, [])

  const pauseSound = useCallback(() => {
    const beep = ref.current

    if (beep == null) return

    beep.pause()
    beep.currentTime = 0
  }, [])

  useEffect(() => {
    let interval: number

    if (timerOn) {
      // Auto run every 0.999 sec
      interval = window.setInterval(() => {
        let per

        if (timeLeft === 1) per = 0
        else if (timeLeft <= 0) per = 100
        else per = (100 / currentLen) * (timeLeft - 1)

        setPercent(per)
        dispatch({ type: 'countdown' })
      }, 999)

      return () => clearInterval(interval)
    }
  })

  useEffect(() => {
    const beep = ref.current
    if (beep == null) return

    if (timeLeft <= 1) playSound()
    if (beep.currentTime < 3) pauseSound()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft])

  return (
    <>
      <audio id='beep' src={clockBeepSound} ref={ref} hidden />
      <Context.Provider
        value={{
          breakLength,
          sessionLength,
          percent,
          setPercent,
          onSession,
          timeLeft,
          timerOn,
          dispatch,
        }}
      >
        {children}
      </Context.Provider>
    </>
  )
}
