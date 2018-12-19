// Polyfills
import 'react-app-polyfill/ie9';
import "@babel/polyfill";

// react
import React from 'react';
import ReactDOM from 'react-dom';

// App
import App from './Containers/App/App';
// redux
import { Provider } from 'react-redux';
import store from './store';
// serviceworker

import * as serviceWorker from './serviceWorker';

// normalize
import './Vendor/normalize.css';
import './index.css';


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));

serviceWorker.register();
