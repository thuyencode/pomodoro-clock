import PropTypes from 'prop-types'
import { ArrowCounterclockwise } from 'react-bootstrap-icons'

function Reset ({ className, dispatch }) {
  return (
    <button
      id="reset"
      className={className}
      onClick={dispatch}
    >
      <ArrowCounterclockwise className="h-6 w-6" />
    </button>
  )
}
Reset.propTypes = {
  className: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default Reset
