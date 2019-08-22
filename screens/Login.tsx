import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import socketIO from 'socket.io-client';
import Header from '../components/Header';
import Title from '../components/Title';
import TopGroup from '../components/TopGroup';
import AsyncStorage from '@react-native-community/async-storage';

type Props = { navigation: { navigate: Function } };
type State = {};
export default class Login extends Component<Props, State> {
  moveToSettings = (id) => {
    this.props.navigation.navigate('ProfileSettings', { id: id });
  }
  moveToExchangeHub = () => {
    this.props.navigation.navigate('ExchangeHub');
  }
  componentDidMount = () => {
    /*
    this.getData().then(res => {
      console.log(res);
      this.saveId("fjfiewofjewoifjewoifjewoi", () => { this.getData().then((res) => { console.log(res); }) })
    });
    */
  }
  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@id')
      return value;
    } catch (e) {
      console.log(e);
    }
  }
  saveId = async (id, callback) => {
    try {
      await AsyncStorage.clear(async (err) => {
        try {
          await AsyncStorage.setItem('@id', id, callback);
        }
        catch (e) {
          console.log(e);
        }
      })
    } catch (e) {
      console.log(e);
    }
  }
  tryLogin = () => {
    const id = this.id._lastNativeText;
    let data = {
      method: 'POST',
      body: JSON.stringify({
        'id': id
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }
    const that = this;
    return fetch("http://10.0.2.2:1408/login", data).then(function (response: any) {
      return response.json();
    })
      .then(function (res: any) {
        console.log(res);
        if (res.status === "success") {
          that.saveId(id, that.moveToExchangeHub)
        }
        else {
          console.log("failed login")
          console.log(res.status);
          that.moveToSettings(id);
        }
      }).catch((e) => {
        console.log(e);
      });
  }
  getText = input => {
    console.log(input);
  }
  render = () => {
    return (
      <View style={{ height: '100%' }}>
        <TopGroup title="Login" />
        <View style={{ height: '80%' }}>
          <Text>Please enter your Dartmouth ID</Text>
          <TextInput
            style={{ borderColor: 'gray', borderWidth: 1 }}
            ref={(ref) => { this.id = ref; }}
          />
          <Button
            title='Try login'
            onPress={this.tryLogin}
          />
        </View>

      </View>
    );
  }
  input: any;

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

