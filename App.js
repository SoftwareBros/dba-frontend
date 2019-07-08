/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * 
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 */

import React, { Component } from 'react';
import {
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import HomeScreen from './screens/HomeScreen';
import Login from './screens/Login';
import ProfileSettings from './screens/ProfileSettings';
import ExchangeHub from './screens/ExchangeHub';
import Exchange from './screens/Exchange';
import BecomeSeller from './screens/BecomeSeller';

import { useScreens } from 'react-native-screens';
//useScreens();

const AppNav = createStackNavigator(
  {
    HomeScreen: HomeScreen,
    Login: Login,
    ProfileSettings: ProfileSettings,
    ExchangeHub: ExchangeHub,
    Exchange: Exchange,
    BecomeSeller: BecomeSeller,
  }
);
const AppContainer = createAppContainer(AppNav);
export default class App extends React.Component{
  render() {
    return <AppContainer/>;
  }
};