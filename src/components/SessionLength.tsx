import { useAppContext } from '@/hooks/useAppContext'
import Length from './Length'

export default function SessionLength() {
  const { dispatch, sessionLength } = useAppContext()

  return (
    <Length
      id='session'
      time={sessionLength}
      increase={() => dispatch({ type: 'increase_session_length' })}
      decrease={() => dispatch({ type: 'decrease_session_length' })}
    />
  )
}
