import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import socketIO from 'socket.io-client';

type Props = {navigation: {navigate: Function } };
type State = {};
export default class Exchange extends Component<Props, State> {
  moveToExchange = (venue) => {
    console.log(venue);
    this.props.navigation.navigate('Exchange',{venue: venue});
  }
  render = () => {
    
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 45, fontWeight: 'bold' }}> Exchange Hub </Text>
        <Button
          title='To Collis'
          onPress={() => this.moveToExchange("collis")}
        />
        <Button
          title='To Foco'
          onPress={() => this.moveToExchange("foco")}
        />
        <Button
          title='To Hop'
          onPress={() => this.moveToExchange("hop")}
        />
        <Button
          title='To KAF'
          onPress={() => this.moveToExchange("kaf")}
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

