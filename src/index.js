import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import './i18n';

import 'semantic-ui-css/semantic.min.css';

ReactDOM.render(
  <Suspense fallback="">
    <Provider store={store}>
      <App />
    </Provider>
  </Suspense>,
  document.getElementById('root')
);

serviceWorker.unregister();
