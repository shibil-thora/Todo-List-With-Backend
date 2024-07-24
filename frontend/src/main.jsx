import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import {store, perStore} from './Redux/store.js'
import { PersistGate } from 'redux-persist/integration/react' 
import {Provider} from 'react-redux' 
import {GoogleOAuthProvider} from '@react-oauth/google'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={perStore}>
        <BrowserRouter> 
        <GoogleOAuthProvider clientId='43780769223-4fg6f30sbeml8k0cpj6ja0n5d69774nf.apps.googleusercontent.com'>
          <App />
        </GoogleOAuthProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
