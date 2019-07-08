import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import socketIO from 'socket.io-client';

type Props = {navigation: {navigate: Function } };
type State = {};
export default class HomeScreen extends Component<Props, State> {
  constructor(props: any){
    super(props);
    this.state = {
      status: "Unsent"
    }
  }
  moveToLogin = () => {
    this.props.navigation.navigate('Login');
  }
  moveToExchangeHub = () => {
    console.log("test2");
    this.props.navigation.navigate('ExchangeHub');
  }
  pingServer = () => {
    const that = this;
    return fetch("http://10.0.2.2:3000").then(function(response: any){
      return response.json();
    })
    .then(function(res: any){
      console.log(res);
      that.setState({status: res.status});
      if(that.state.status === "Success"){
        that.moveToExchangeHub();
      }
    }).catch((e)=>{
      console.log(e);
    });
  }
  componentDidMount = () =>{
    const socket = socketIO('http://10.0.2.2:3000', {      
    transports: ['websocket'], jsonp: false });   
    socket.connect(); 
    socket.on('connect', () => { 
      console.log('connected to socket server'); 
    }); 
    socket.on('welcome', msg=>{console.log(msg)})
    socket.emit('join exchange', "Henry", "Collis");

  }
  render = () => {
    
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 45, fontWeight: 'bold' }}> {`Status: ${this.state.status}`} </Text>
        <Button
          title='Send request'
          onPress={this.pingServer}
        />
        <Button
          title='Login'
          onPress={this.moveToLogin}
        />
      </View>
    );
}}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
