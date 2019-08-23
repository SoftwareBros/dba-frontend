import React, { Component } from 'react';
import { Modal, StyleSheet, Text, View, Button, TouchableHighlight, Alert, ScrollView } from 'react-native';
import { LinearGradient } from 'expo';
import { SafeAreaView } from 'react-navigation';
import Header from '../components/Header';
import Title from '../components/Title';
import TopGroup from '../components/TopGroup';
import Listings from '../components/Listings';
import AsyncStorage from '@react-native-community/async-storage';
import { query } from '../helpers/query';
import { moveToExchangeHub } from '../helpers/changeScreens';

type Props = { navigation: { navigate: Function } };
type State = {};
export default class Exchange extends Component<Props, State> {
  state: { venue: any; modalVisible: boolean; sellers: any[]; seller: any[]; };
  constructor(props: any) {
    super(props);
    this.state = {
      venue: this.props.navigation.state.params.venue,
      id: this.props.navigation.state.params.id,
      modalVisible: false,
      sellers: [],
      seller: { name: "place", discount: "holder", id: "test" },
      status: "unsent"
    }
  }
  componentDidMount = () => {
    this.getSellers();
    this.sellerPingId = window.setInterval(this.getSellers, 1000);
  }

  checkAsBuyer = () => {
    const body = {
      'id': this.state.id
    };
    query("PUT", body, "checkBuyerTrans", (res, that) => {
      if (res.accepted) {
        window.clearInterval(this.requestId);
        this.setState({ status: "Accepted!" });
      }
      else if (res.status === "no requests pending") {
        window.clearInterval(this.requestId);
        this.setState({
          status: "Seller declined offer :("
        });
      }
    });
  }

  getSellers = () => {
    const body = {
      'name': this.state.venue
    };
    query("PUT", body, "sellerList", (res, that) => {
      if (res.status === "success") {
        this.setState({
          sellers: res.sellers
        });
      }
      else {
        console.log("seller list failed")
        console.log(res.status);
      }
    });
  }


 

  tryConnect = () => {
    const body = {
      'bId': this.state.id,
      'sId': this.state.seller.id,
      'exchange': this.state.venue
    };
    query("POST", body, "connectBuyer", (res, that) => {
      if (res.status === "success") {
        this.intervalId = window.setInterval(this.checkAsBuyer, 1000);
        this.setState({
          status: "pending",
        });
      }
      else {
        this.setState({ status: res.status });
      }
    });
  }
  closeModal = () => {
    this.setState({
      modalVisible: false,
      status: "unsent"
    })
    window.clearInterval(this.requestId);
  }
  triggerModal = (item) => {
    this.setState({
      modalVisible: !this.state.modalVisible,
      seller: item
    });
  }
  render = () => {
    return (
      <View style={{ height: '100%' }}>
        <TopGroup title={this.state.venue} />
        <View style={{ height: '80%' }}>
          <View style={{ height: '80%', backgroundColor: 'orange' }}>
            <Listings data={this.state.sellers} callback={this.triggerModal} />
          </View>
          <View style={{ height: '20%', backgroundColor: 'blue' }}>
            <Button
              title='Back to Exchange Hub'
              onPress={() => { window.clearInterval(this.sellerPingId); moveToExchangeHub(this, this.state.id) }}
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
              <Text>Name: {this.state.seller.name}</Text>
              <Text>Discount: {this.state.seller.discount}</Text>
              <TouchableHighlight
                onPress={this.closeModal}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
              <Button
                title='Connect'
                onPress={this.tryConnect}
              />
              <Text>{this.state.status}</Text>
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

