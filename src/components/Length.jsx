import PropTypes from 'prop-types'
import { ArrowDown, ArrowUp } from 'react-bootstrap-icons'

function Length ({ id, types, time, dispatch }) {
  const dispatchDecre = () => {
    return () => dispatch({ type: types[0] })
  }

  const dispatchIncre = () => {
    return () => dispatch({ type: types[1] })
  }

  return (
    <div>
      <h5
        id={`${id}-label`}
        className="mb-2 text-center text-xl capitalize"
      >{`${id} Length`}</h5>
      {/* Buttons */}
      <div className="join flex flex-row items-center justify-center">
        <button
          id={`${id}-decrement`}
          className="btn-sm join-item btn px-1 btn-neutral hover:text-white"
          onClick={dispatchDecre()}
        >
          <ArrowDown className="h-5 w-5" />
        </button>
        <button
          id={`${id}-length`}
          className="btn-sm join-item btn px-1 text-base font-medium text-white btn-neutral"
        >
          {time}
        </button>
        <button
          id={`${id}-increment`}
          className="btn-sm join-item btn px-1 btn-neutral hover:text-white"
          onClick={dispatchIncre()}
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}

Length.propTypes = {
  id: PropTypes.string.isRequired,
  types: PropTypes.array.isRequired,
  time: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired
}

Length.defaultProps = {
  id: 'Default',
  time: 60
}

export default Length
