import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './Containers/App/App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
// import styled, {injectGlobal} from 'styled-components';

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();

// injectGlobal`
// body {
//   margin: 0;
//   padding: 0;
//   font-family: sans-serif;
// }`;
