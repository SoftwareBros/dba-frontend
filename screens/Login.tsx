import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import socketIO from 'socket.io-client';
import Header from '../components/Header';
import Title from '../components/Title';
import TopGroup from '../components/TopGroup';
type Props = {navigation: {navigate: Function } };
type State = {};
export default class Login extends Component<Props, State> {
  moveToSettings = () => {
    this.props.navigation.navigate('ProfileSettings');
  }
  render = () => {
    
    return (
      <View style={{height:'100%'}}>
        <TopGroup title="Login"/>
        <View style={{height: '80%'}}>
          <Button
            title='To Settings'
            onPress={this.moveToSettings}
          />
        </View>
        
      </View>
    );
  }

}
Login.navigationOptions = {
  header: null,
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

