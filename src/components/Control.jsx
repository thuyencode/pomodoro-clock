import PropTypes from 'prop-types'
import { PauseFill, PlayFill } from 'react-bootstrap-icons'

function Control ({ className, dispatch, timerOn }) {
  return (
    <button
      className={className}
      id="start_stop"
      onClick={dispatch}
    >
      {timerOn
        ? (
        <PauseFill className="h-6 w-6" />
          )
        : (
        <PlayFill className="h-6 w-6" />
          )}
    </button>
  )
}

Control.propTypes = {
  className: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  timerOn: PropTypes.bool.isRequired
}

export default Control
