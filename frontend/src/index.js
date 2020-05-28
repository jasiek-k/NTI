import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import PageDisplay from './components/PageDisplay';
import './styles/pageTheme.css'; 

ReactDOM.render(<PageDisplay />, document.getElementById('root'));

serviceWorker.unregister();
