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
  View,
  Animated,
  Easing
} from 'react-native';
import HomeScreen from './screens/HomeScreen';
import Login from './screens/Login';
import ProfileSettings from './screens/ProfileSettings';
import ExchangeHub from './screens/ExchangeHub';
import Exchange from './screens/Exchange';

import { useScreens } from 'react-native-screens';

const AppNav = createStackNavigator(
  {
    HomeScreen: HomeScreen,
    Login: Login,
    ProfileSettings: ProfileSettings,
    ExchangeHub: ExchangeHub,
    Exchange: Exchange,
  },
  {
    transitionConfig : () => ({
      transitionSpec: {
        duration: 0,
        timing: Animated.timing,
        easing: Easing.step0,
        },
    }),
  }
);
const AppContainer = createAppContainer(AppNav);
export default class App extends React.Component{
  render() {
    return <AppContainer/>;
  }
};