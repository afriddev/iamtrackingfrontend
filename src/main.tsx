import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import AppContext from './utils/AppContext.tsx'

createRoot(document.getElementById('root')!).render(
    <AppContext> <App /> </AppContext>
)
