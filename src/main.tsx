import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from 'sonner'
import Store from './store/store.tsx'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={Store}>
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
      <App />
    </Provider>

  </StrictMode>,
)
