import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Navbar from './components/Navbar';
//import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Navbar />, document.getElementById('root'));


serviceWorker.unregister();
