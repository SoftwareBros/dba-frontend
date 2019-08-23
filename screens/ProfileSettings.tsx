import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import socketIO from 'socket.io-client';
import Header from '../components/Header';
import TopGroup from '../components/TopGroup';
import Profile from '../components/Profile';
import AsyncStorage from '@react-native-community/async-storage';


type Props = {navigation: {navigate: Function } };
type State = {};
export default class ProfileSettings extends Component<Props, State> {
  moveToExchangeHub = () => {
    this.props.navigation.navigate('ExchangeHub');
  }
  tryRegister = () => {
    const name = this.name._lastNativeText;
    const email = this.email._lastNativeText;
    const amountToSell = this.amount._lastNativeText;
    const discount = this.discount._lastNativeText;
    const id = this.props.navigation.state.params.id;
    let data = {
      method: 'POST',
      body: JSON.stringify({
        'id': id,
        'name': name,
        'email': email,
        'seller': (Boolean(amountToSell) && Boolean(discount)),
        'sellerSettings': (Boolean(amountToSell) && Boolean(discount)) ? {'amountToSell': amountToSell, 'discount': discount}:null
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }
    console.log(Boolean(amountToSell) && Boolean(discount));
    const that = this;
    return fetch("http://10.0.2.2:1408/signup", data).then(function(response: any){
      return response.json();
    })
    .then(function(res: any){
      console.log(res);
      if(res.status === "success"){
        that.saveId(id, that.moveToExchangeHub);
      }
      else{
        console.log("failed login")
        console.log(res.status);
      }
    }).catch((e)=>{
      console.log(e);
    });
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
  render = () => {
    
    return (
      <View style={{height: '100%'}}>
        <TopGroup title="Profile"/>
        <View style={{height: '80%'}}>
          <Profile picture={require("../imgs/snacc.jpg")} name="Henry Foster" maxDBA={100} discount={75}/>
          <Text>Please enter your Name</Text>
          <TextInput
            style={{borderColor: 'gray', borderWidth: 1}}
            ref={(ref) => { this.name = ref; }}
          />
          <Text>Please enter your Email</Text>
          <TextInput
            style={{borderColor: 'gray', borderWidth: 1}}
            ref={(ref) => { this.email = ref; }}
          />
          <Text>If applicable, how much DBA would you like to sell</Text>
          <TextInput
            style={{borderColor: 'gray', borderWidth: 1}}
            ref={(ref) => { this.amount = ref; }}
          />
          <Text>If applicable, how what discount would you like to sell it at (ie discount of .2 on $10 = $8)</Text>
          <TextInput
            style={{borderColor: 'gray', borderWidth: 1}}
            ref={(ref) => { this.discount = ref; }}
          />
          <Button
            title='Register Account'
            onPress={this.tryRegister}
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

