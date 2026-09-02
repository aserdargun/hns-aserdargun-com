import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes'
import '../styles/global.css'
import '../styles/shell.css'
import '../styles/weekly.css'
import '../styles/radar.css'

export function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
