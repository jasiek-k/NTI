import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import PageDisplay from './components/PageDisplay'
import './styles/pageTheme.css' 
import './utils/fonts/stylesheet.css'
import {createStore} from 'redux'

const getWidth = () => {
  return {
    type: 'GET_WIDTH'
  }
}

const counter = (state, action) => {
  switch(action.type){
    case 'GET_WIDTH':
      return state 
  }
}

let store = createStore(counter)
store.subscribe(() => console.log(store.getState()))

store.dispatch(getWidth())

ReactDOM.render(
  <PageDisplay />, 
  document.getElementById('root'))

serviceWorker.unregister()
