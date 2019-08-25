import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { query } from '../helpers/query';
import { moveToExchangeHub, moveToLogin } from '../helpers/changeScreens';

type Props = { navigation: { navigate: Function } };
type State = {};
export default class HomeScreen extends Component<Props, State> {
  tryLogin = (id) => {
    query("GET", undefined, `login?id=${id}`, (res) => {
      if (res.status === "success") {
        moveToExchangeHub(this, id);
      }
      else {
        moveToLogin(this);
      }
    });
  }
  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@id')
      return value;
    } catch (e) {
      console.log(e);
    }
  }
 
  componentDidMount = () => {
    this.getData().then((id) => { this.tryLogin(id) });
  }

  render = () => {

    return (
      <View style={{ height: '100%' }}>
        <View style={{ height: '80%' }}>
          <Text style={{ fontSize: 45, textAlign: 'center', fontWeight: 'bold' }}> {"Loading"} </Text>

        </View>
      </View>
    );
  }
}
HomeScreen.navigationOptions = {
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
