import React, { Component } from 'react';
import { Modal, StyleSheet, Text, View, Button, TouchableHighlight, Alert, ScrollView } from 'react-native';
import { LinearGradient } from 'expo';
import { SafeAreaView } from 'react-navigation';
import Header from '../components/Header';
import Title from '../components/Title';
import TopGroup from '../components/TopGroup';
import Listings from '../components/Listings';

type Props = { navigation: { navigate: Function } };
type State = {};
export default class Exchange extends Component<Props, State> {
  state: { venue: any; modalVisible: boolean; sellers: any[]; };
  constructor(props: any) {
    super(props);
    this.state = {
      venue: this.props.navigation.state.params.venue,
      modalVisible: false,
      sellers: [],
    }
    this.getSellers = this.getSellers.bind(this);
  }
  getSellers = () => {
    console.log("pinged getSellers");
    let data = {
      method: 'PUT',
      body: JSON.stringify({
        'name': this.state.venue
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }
    const that = this;
    fetch("http://10.0.2.2:1408/sellerList", data).then(function (response: any) {
      return response.json();
    })
      .then(function (res: any) {
        console.log(res);
        if (res.status === "success") {
          that.setState({
            sellers: res.sellers
          });
        }
        else {
          console.log("seller list failed")
          console.log(res.status);
        }
      }).catch((e) => {
        console.log(e);
      });
  }
  componentDidMount = () => {
    window.setInterval(() => {
      const self = this;
      self.getSellers()
    }, 1000);
  }
  moveToBecomeSeller = () => {
    this.props.navigation.navigate('ProfileSettings');
  }
  triggerModal = () => {
    console.log("triggered modal");
    this.setState({ modalVisible: !this.state.modalVisible });
  }
  render = () => {
    const people = [
      { name: "Henry Foster", amount: 20 },
      { name: "Alec Rossi", amount: 30 },
      { name: "Sasha Rich", amount: 15 },
      { name: "Henry Foster", amount: 20 },
      { name: "Alec Rossi", amount: 30 },
      { name: "Sasha Rich", amount: 15 },
      { name: "Henry Foster", amount: 20 },
      { name: "Alec Rossi", amount: 30 },
      { name: "Sasha Rich", amount: 15 },
      { name: "Henry Foster", amount: 20 },
      { name: "Alec Rossi", amount: 30 },
      { name: "Sasha Rich", amount: 15 },
      { name: "Henry Foster", amount: 20 },
      { name: "Alec Rossi", amount: 30 },
      { name: "Sasha Rich", amount: 15 },
      { name: "Henry Foster", amount: 20 },
      { name: "Alec Rossi", amount: 30 },
      { name: "Sasha Rich", amount: 15 },
      { name: "Jordan Martinez", amount: 45 }
    ];
    return (
      <View style={{ height: '100%' }}>
        <TopGroup title={this.state.venue} />
        <View style={{ height: '80%' }}>
          <View style={{ height: '80%', backgroundColor: 'orange' }}>
            <Listings data={this.state.sellers} />
          </View>
          <View style={{ height: '20%', backgroundColor: 'blue' }}>
            <Button
              title='To Connect'
              onPress={this.triggerModal}
            />
            <Button
              title='To Become a Seller'
              onPress={this.moveToBecomeSeller}
            />
          </View>

        </View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{ marginTop: 22 }}>
            <View>
              <Text>Connect Screen</Text>

              <TouchableHighlight
                onPress={this.triggerModal}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
Exchange.navigationOptions = {
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

