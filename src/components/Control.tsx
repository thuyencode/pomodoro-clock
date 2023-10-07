import { useAppContext } from '@/hooks/useAppContext'
import {
  ArrowCounterclockwise,
  PauseFill,
  PlayFill,
} from 'react-bootstrap-icons'

export default function Control() {
  const { timerOn, dispatch, setPercent } = useAppContext()

  function pauseOrResume() {
    dispatch({ type: 'pause_resume' })
  }

  function reset() {
    const beep = document.getElementById('beep') as HTMLAudioElement

    dispatch({ type: 'reset' })
    setPercent(100)

    if (beep == null) return
    // The only way I know to work around that "User Story #28"
    beep.pause()
    beep.currentTime = 0
  }

  return (
    <div className='join justify-center'>
      <button
        id='start_stop'
        className='btn btn-neutral join-item btn-sm hover:text-white'
        onClick={pauseOrResume}
      >
        {timerOn ? (
          <PauseFill className='h-6 w-6' />
        ) : (
          <PlayFill className='h-6 w-6' />
        )}
      </button>
      <button
        id='reset'
        className='btn btn-neutral join-item btn-sm hover:text-white'
        onClick={reset}
      >
        <ArrowCounterclockwise className='h-6 w-6' />
      </button>
    </div>
  )
}
