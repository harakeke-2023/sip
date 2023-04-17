import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import { BrowserRouter as Router } from 'react-router-dom'
import { StateContext } from './context/StateContext'

import App from './components/App'

// Set the API key on the window object





document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <StateContext>
      <Auth0Provider
        domain="https://sip.au.auth0.com"
        clientId="81hjW6odpA6T8deM3U48MW1jtj4Dya9u"
        audience="https://sip-auth/api"
        redirectUri={window.location.origin}
      >
        <Router>
          <App />
        </Router>
      </Auth0Provider>
    </StateContext>
  )
})
