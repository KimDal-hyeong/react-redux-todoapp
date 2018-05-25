import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import 'todomvc-common/base.css';
import 'todomvc-app-css/index.css';

import Root from './containers/Root';

ReactDOM.render(<Root />, document.getElementById('root'));
