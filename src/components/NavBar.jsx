import PropTypes from 'prop-types'
import { Github } from 'react-bootstrap-icons'

function NavBar ({ onSession }) {
  const switchTheme = () => {
    return onSession ? 'text-white' : 'text-gray-950'
  }

  return (
    <nav className="absolute top-0 z-10 flex w-full justify-center p-2">
      <a
        className={`btn-outline btn font-medium capitalize ${switchTheme()}`}
        href="https://github.com/thuyencode/pomodoro-clock"
      >
        <Github className="h-6 w-6" />
        <span>Star me on Github</span>
      </a>
    </nav>
  )
}

NavBar.propTypes = {
  onSession: PropTypes.bool.isRequired
}

export default NavBar
