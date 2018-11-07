import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from 'src/Containers/App/App';
import 'src/index.css';
import store from 'src/Redux/createStore';
import registerServiceWorker from 'src/registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
