import { ArrowDown, ArrowUp } from 'react-bootstrap-icons'

type LengthProps = {
  id: string
  time?: number
  increase: () => void
  decrease: () => void
}

function Length({ id = 'Default', time = 60, increase, decrease }: LengthProps) {
  return (
    <div>
      <h5
        id={`${id}-label`}
        className='mb-2 text-center text-xl capitalize'
      >{`${id} Length`}</h5>
      {/* Buttons */}
      <div className='join flex flex-row items-center justify-center'>
        <button
          id={`${id}-decrement`}
          className='btn btn-neutral join-item btn-sm px-1 hover:text-white'
          onClick={decrease}
        >
          <ArrowDown className='h-5 w-5' />
        </button>
        <button
          id={`${id}-length`}
          className='btn btn-neutral join-item btn-sm px-1 text-base font-medium text-white'
        >
          {time}
        </button>
        <button
          id={`${id}-increment`}
          className='btn btn-neutral join-item btn-sm px-1 hover:text-white'
          onClick={increase}
        >
          <ArrowUp className='h-5 w-5' />
        </button>
      </div>
    </div>
  )
}

export default Length
