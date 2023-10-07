import { useAppContext } from '@/hooks/useAppContext'
import formatTime from '@/utils/formatTime'
import { RadialProgress } from 'react-daisyui'

export default function Clock() {
  const { percent, onSession, timeLeft } = useAppContext()

  return (
    <RadialProgress
      className='text-center'
      size='11rem'
      thickness='4px'
      value={percent}
    >
      <>
        <h4 id='timer-label' className='mb-2 text-2xl capitalize'>
          {onSession ? 'session' : 'break'}
        </h4>
        <h2 id='time-left' className='text-4xl'>
          {formatTime(timeLeft)}
        </h2>
      </>
    </RadialProgress>
  )
}
