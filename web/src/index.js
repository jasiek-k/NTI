import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import PageDisplay from './components/PageDisplay';

ReactDOM.render(<PageDisplay />, document.getElementById('root'));
//console.log(pageContent)

serviceWorker.unregister();
