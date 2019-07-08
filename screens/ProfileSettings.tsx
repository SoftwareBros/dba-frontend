import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import socketIO from 'socket.io-client';

type Props = {navigation: {navigate: Function } };
type State = {};
export default class ProfileSettings extends Component<Props, State> {
  moveToExchangeHub = () => {
    this.props.navigation.navigate('ExchangeHub');
  }
  render = () => {
    
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 45, fontWeight: 'bold' }}> Profile Settings </Text>
        <Button
          title='To ExchangeHub'
          onPress={this.moveToExchangeHub}
        />
      </View>
    );
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

