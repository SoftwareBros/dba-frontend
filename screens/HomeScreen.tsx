import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import socketIO from 'socket.io-client';
import TopGroup from '../components/TopGroup';
import AsyncStorage from '@react-native-community/async-storage';
type Props = {navigation: {navigate: Function } };
type State = {};
export default class HomeScreen extends Component<Props, State> {
  constructor(props: any){
    super(props);
    this.state = {
      status: "Unsent"
    }
  }
  tryLogin = () => {
    this.getData().then(
      (id)=>{
        let data = {
          method: 'POST',
          body: JSON.stringify({
            'id': `${id}`
          }),
          headers: {
            "Content-Type": "application/json"
          }
        }
        const that = this;
        return fetch("http://10.0.2.2:1408/login", data).then(function(response: any){
          return response.json();
        })
        .then(function(res: any){
          console.log(res);
          if(res.status === "success"){
            that.moveToExchangeHub();
          }
          else{
            console.log("failed login")
            console.log(res.status);
            that.moveToLogin();
          }
        }).catch((e)=>{
          console.log(e);
        });
      }
    )
  }
  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@id')
      return value;
    } catch(e) {
      console.log(e);
    }
  }
  moveToLogin = () => {
    this.props.navigation.navigate('Login');
  }
  moveToExchangeHub = () => {
    console.log("test2");
    this.props.navigation.navigate('ExchangeHub');
  }
  componentDidMount = () =>{
    this.tryLogin();
  }
  render = () => {
    
    return (
      <View style={{height:'100%'}}>
        <View style={{height: '80%'}}>
          <Text style={{ fontSize: 45, textAlign: 'center', fontWeight: 'bold' }}> {"Loading"} </Text>
          
        </View>
      </View>
    );
}}
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
