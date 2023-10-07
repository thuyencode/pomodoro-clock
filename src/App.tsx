import Clock from '@/components/Clock'
import Control from '@/components/Control'
import BreakLength from '@/components/BreakLength'
import SessionLength from '@/components/SessionLength'
import { ContextProvider } from '@/contexts/ContextProvider'

function App() {
  return (
    <div className='font-body flex h-screen flex-col items-center justify-center space-y-8 bg-gray-50 text-gray-950 dark:bg-gray-950 dark:text-gray-50'>
      <h1 className='text-5xl'>25 + 5 Clock</h1>
      <div className='flex flex-col items-center space-y-8 sm:flex-row sm:space-x-8 sm:space-y-0'>
        <ContextProvider>
          <>
            <div className='flex flex-col space-y-4'>
              <Clock />
              <Control />
            </div>
            <div className='flex items-center justify-between space-x-4 sm:flex-col sm:space-x-0 sm:space-y-4'>
              <BreakLength />
              <SessionLength />
            </div>
          </>
        </ContextProvider>
      </div>
    </div>
  )
}

export default App
