import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes'
import '../styles/global.css'
import '../styles/shell.css'
import '../styles/weekly.css'
import '../styles/radar.css'
import '../styles/library.css'

export function App() {
  return (
    <BrowserRouter useTransitions={false}>
      <AppRoutes />
    </BrowserRouter>
  )
}
