import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from 'sonner'
import Store from './store/store.tsx'
import { Provider } from 'react-redux'
// import ApiContext from './context/Apicontext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={Store}>
      {/* <ApiContext> */}
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
      <App />
      {/* </ApiContext> */}
    </Provider>

  </StrictMode>,
)
