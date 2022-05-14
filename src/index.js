import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import * as React from 'react';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

window.COVID_EXPOSURE_SERVICE_ENDPOINT = (process.env.NODE_ENV === 'production') ? '' : 'http://localhost:5000';

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
