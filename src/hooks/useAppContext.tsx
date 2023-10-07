import { Context } from '@/contexts/ContextProvider'
import { useContext } from 'react'

export function useAppContext() {
  const context = useContext(Context)

  if (context == null) {
    throw new Error('useContext must be used within a ContextProvider')
  }

  return context
}