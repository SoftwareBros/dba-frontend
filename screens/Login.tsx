import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import TopGroup from '../components/TopGroup';
import AsyncStorage from '@react-native-community/async-storage';
import { query } from '../helpers/query';
import { moveToSettings, moveToExchangeHub } from '../helpers/changeScreens';
import { saveId } from '../helpers/saveId';

type Props = { navigation: { navigate: Function } };
type State = {};
export default class Login extends Component<Props, State> {
  tryLogin = () => {
    const id = this.id._lastNativeText;
    const body = {
      'id': `${id}`
    };
    query("GET", undefined, `login?id=${id}`, (res) => {
      if (res.status === "success") {
        saveId(id).then(()=>{moveToExchangeHub(this, id)})
      }
      else {
        moveToSettings(this, id);
      }
    });
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

