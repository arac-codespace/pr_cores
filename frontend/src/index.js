import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App.jsx';
import registerServiceWorker from './registerServiceWorker';
import {Route, Switch, BrowserRouter, Link} from 'react-router-dom';


ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();

if (module.hot) {
	module.hot.accept();
}