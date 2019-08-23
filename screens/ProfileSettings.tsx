import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import TopGroup from '../components/TopGroup';
import Profile from '../components/Profile';
import AsyncStorage from '@react-native-community/async-storage';
import { query } from '../helpers/query';
import { saveId } from '../helpers/saveId';
import { moveToExchangeHub } from '../helpers/changeScreens';


type Props = {navigation: {navigate: Function } };
type State = {};
export default class ProfileSettings extends Component<Props, State> {
  tryRegister = () => {
    const name = this.name._lastNativeText;
    const email = this.email._lastNativeText;
    const amountToSell = this.amount._lastNativeText;
    const discount = this.discount._lastNativeText;
    const id = this.props.navigation.state.params.id;
    const seller = Boolean(amountToSell)&&Boolean(discount);

    let body = {
        'id': id,
        'name': name,
        'email': email,
        'seller': seller,
        'sellerSettings': seller ? {'amountToSell': amountToSell, 'discount': discount}:null
      }
    query("POST", body, "signup", (res)=>{
      if(res.status === "success"){
        saveId(id).then(()=>{moveToExchangeHub(this, id)});
      }
      else{
        // ADD ERROR CASE
        console.log("failed login")
        console.log(res.status);
      }
    });
  }

  render = () => {
    
    return (
      <View style={{height: '100%'}}>
        <TopGroup title="Profile"/>
        <View style={{height: '80%'}}>
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

