import React from 'react'
import ReactModal from 'react-modal';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import './index.css'
import './app.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/fontawesome-free/js/all.min.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter } from 'react-router-dom'

ReactModal.setAppElement('#root');


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
