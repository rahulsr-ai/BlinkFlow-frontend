
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import "./App.css"

createRoot(document.getElementById('root')!).render(

  <div className='main-app'>
    <App />
  </div>
)
