import React, { Component } from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {Provider} from 'react-redux'

import store from './redux/store'

import Home from './pages/Home'
import Login from './pages/Login'

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={Login} />
          </Switch>
        </BrowserRouter>
      </Provider>
    )
  }
}
