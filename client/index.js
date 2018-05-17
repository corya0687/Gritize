import { AppRegistry } from 'react-native';
import React, { Component } from 'react';
import App from './App';
import {Provider} from "react-redux"
import store from './store/store'
import {connect} from 'react-redux'

GritizeApp = connect()(App)

const Root = () => (
  <Provider store={store}>
    <GritizeApp/>
  </Provider>
)

AppRegistry.registerComponent('gritize', () => Root );
