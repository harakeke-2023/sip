import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './components/App'

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <Auth0Provider
      domain="https://harakeke-2023-jiho.au.auth0.com"
      clientId="Iem1PUoimSdF8RV1MWezvZu2JsDTtcI4"
      redirectUri={window.location.origin}
      audience="https://fruits/api"
    >
      <Router>
        <App />
      </Router>
    </Auth0Provider>
  )
})
