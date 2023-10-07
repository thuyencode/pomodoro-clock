import { Github } from 'react-bootstrap-icons'

export default function NavBar() {
  return (
    <nav className='absolute top-0 z-10 flex w-full justify-center p-2'>
      <a
        className='btn btn-outline font-medium capitalize text-white dark:text-gray-950'
        href='https://github.com/thuyencode/pomodoro-clock'
      >
        <Github className='h-6 w-6' />
        <span>Star me on Github</span>
      </a>
    </nav>
  )
}
