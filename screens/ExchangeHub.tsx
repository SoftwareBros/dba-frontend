import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableWithoutFeedback } from 'react-native';
import socketIO from 'socket.io-client';
import Header from '../components/Header';
import Title from '../components/Title';
import TopGroup from '../components/TopGroup';
import { moveToExchange } from '../helpers/changeScreens';
type Props = {navigation: {navigate: Function } };
type State = {};
export default class ExchangeHub extends Component<Props, State> {
  render = () => {
    const id = this.props.navigation.state.params.id;
    return (
      <View style={{height:'100%'}}>
        <TopGroup title="Explore Exchanges"/>
        <View style={{height:'80%'}}>
          <View style={{flexDirection: 'column'}}>
            <View style={{flexDirection: 'row', height: '50%'}}>
              <TouchableWithoutFeedback onPress={() => moveToExchange(this, "foco", id)}><View style={{width:'50%', backgroundColor: 'blue', flexDirection: 'column', justifyContent: 'center'}}><Text style={{textAlign: 'center',fontSize: 40, fontWeight: 'bold'}}>foco</Text></View></TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => moveToExchange(this, "collis", id)}><View style={{width:'50%', backgroundColor: 'green', flexDirection: 'column', justifyContent: 'center'}}><Text style={{textAlign: 'center',fontSize: 40, fontWeight: 'bold'}}>collis</Text></View></TouchableWithoutFeedback>
            </View>
            <View style={{flexDirection: 'row', height: '50%',}}>
              <TouchableWithoutFeedback onPress={() => moveToExchange(this, "kaf", id)}><View style={{width:'50%', backgroundColor: 'red', flexDirection: 'column', justifyContent: 'center'}}><Text style={{textAlign: 'center',fontSize: 40, fontWeight: 'bold'}}>kaf</Text></View></TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => moveToExchange(this, "hop", id)}><View style={{width:'50%', backgroundColor: 'yellow', flexDirection: 'column', justifyContent: 'center'}}><Text style={{textAlign: 'center',fontSize: 40, fontWeight: 'bold'}}>hop</Text></View></TouchableWithoutFeedback>
            </View>
          </View>
        </View>
      </View>
    );
  }

}
ExchangeHub.navigationOptions = {
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

