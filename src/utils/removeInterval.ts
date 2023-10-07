import { INTERVAL_ID } from '@/constants'

export default function removeInterval() {
  clearInterval(localStorage.getItem(INTERVAL_ID) as string)
  localStorage.removeItem(INTERVAL_ID)
}
