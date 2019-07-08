import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import socketIO from 'socket.io-client';

type Props = {navigation: {navigate: Function } };
type State = {};
export default class Login extends Component<Props, State> {
  moveToExchange = () => {
    this.props.navigation.navigate('Exchange');
  }
  render = () => {
    
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 45, fontWeight: 'bold' }}> Become Seller </Text>
        <Button
          title='Back to Exchange'
          onPress={this.moveToExchange}
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

