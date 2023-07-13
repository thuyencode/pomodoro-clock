import PropTypes from 'prop-types'
import formatTime from '../js/formatTime'

function Clock ({ percent, onSession, timeLeft }) {
  return (
    <div
      className="radial-progress text-center"
      style={{
        '--value': percent,
        '--size': '11rem',
        '--thickness': '4px'
      }}
    >
      <h4 id="timer-label" className="mb-2 text-2xl">
        {onSession ? 'Session' : 'Break'}
      </h4>
      <h2 id="time-left" className="text-4xl">
        {formatTime(timeLeft)}
      </h2>
    </div>
  )
}

Clock.propTypes = {
  percent: PropTypes.number.isRequired,
  onSession: PropTypes.bool.isRequired,
  timeLeft: PropTypes.number.isRequired
}

export default Clock
