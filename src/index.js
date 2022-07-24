import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

import { legacy_createStore } from 'redux';
import allReducers from './reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { Provider } from 'react-redux';

const store = legacy_createStore(allReducers, devToolsEnhancer());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </Router>
);
