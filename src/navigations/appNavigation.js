import React, { Component } from "react";
import {
  createAppContainer,
} from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack'

import Home from '../screens/home'
import Todo from '../screens/todo'
import Api from '../screens/api'
import Location from '../screens/location'

const AppNavigator = createStackNavigator(
  {
    Home,
    Todo,
    Api,
    Location
  },
  {
    initialRouteName: "Api",
    headerMode: "none"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return (
      <AppContainer />
    );
  }
}
