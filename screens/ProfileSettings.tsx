import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import socketIO from 'socket.io-client';
import Header from '../components/Header';
import TopGroup from '../components/TopGroup';
import Profile from '../components/Profile';

type Props = {navigation: {navigate: Function } };
type State = {};
export default class ProfileSettings extends Component<Props, State> {
  moveToExchangeHub = () => {
    this.props.navigation.navigate('ExchangeHub');
  }
  render = () => {
    
    return (
      <View style={{height: '100%'}}>
        <TopGroup title="Profile"/>
        <View style={{height: '80%'}}>
          <Profile picture={require("../imgs/snacc.jpg")} name="Henry Foster" maxDBA={100} discount={75}/>
          <Button
            title='To ExchangeHub'
            onPress={this.moveToExchangeHub}
          />
        </View>
        
      </View>
    );
  }

}
ProfileSettings.navigationOptions = {
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

