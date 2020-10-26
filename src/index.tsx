import Router from 'components/Router';
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import store from 'redux-saga/store';
import * as serviceWorker from './serviceWorker';
import 'react-toastify/dist/ReactToastify.css';
import 'react-pro-sidebar/dist/css/styles.css';
import { toast } from 'react-toastify';

const root = document.getElementById('root');
toast.configure();

const App = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

ReactDom.render(<App />, root);

serviceWorker.register();
