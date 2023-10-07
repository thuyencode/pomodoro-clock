import { useAppContext } from '@/hooks/useAppContext'
import Length from './Length'

export default function BreakLength() {
  const { dispatch, breakLength } = useAppContext()

  return (
    <Length
      id='break'
      time={breakLength}
      increase={() => dispatch({ type: 'increase_break_length' })}
      decrease={() => dispatch({ type: 'decrease_break_length' })}
    />
  )
}
