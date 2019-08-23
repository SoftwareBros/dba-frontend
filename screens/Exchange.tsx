import React, { Component } from 'react';
import { Modal, StyleSheet, Text, View, Button, TouchableHighlight, Alert, ScrollView } from 'react-native';
import { LinearGradient } from 'expo';
import { SafeAreaView } from 'react-navigation';
import Header from '../components/Header';
import Title from '../components/Title';
import TopGroup from '../components/TopGroup';
import Listings from '../components/Listings';
import AsyncStorage from '@react-native-community/async-storage';

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
    this.getSellers = this.getSellers.bind(this);
  }
  query = (type, body, endpoint, callback) => {
    let data = {
      method: type,
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    }
    // console.log(body);
    // console.log(data);
    const that = this;
    fetch(`http://10.0.2.2:1408/${endpoint}`, data).then(function (response: any) {
      // console.log(response);
      return response.json();
    })
      .then(function (res: any) {
        callback(res, that);
      }).catch((e) => {
        console.log(e);
      });
  }
  checkAsBuyer = () => {
    console.log("check as buyer");
    const body = {
      'id': this.state.id
    };
    this.query("PUT", body, "checkBuyerTrans", (res, that) => {
      console.log(res);
      if (res.accepted) {
        window.clearInterval(this.intervalId);
        this.setState({ status: "Accepted!" });
      }
      else if (res.status === "no requests pending") {
        window.clearInterval(this.intervalId);
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
    this.query("PUT", body, "sellerList", (res, that) => {
      if (res.status === "success") {
        that.setState({
          sellers: res.sellers
        });
      }
      else {
        console.log("seller list failed")
        console.log(res.status);
      }
    });
  }


  componentDidMount = () => {
    this.getData();
    window.setInterval(() => {
      const self = this;
      self.getSellers()
    }, 1000);
  }
  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@id')
      this.setState(
        {
          id: value
        }
      );
    } catch (e) {
      console.log(e);
    }
  }
  moveToBecomeSeller = () => {
    this.props.navigation.navigate('ProfileSettings');
  }

  tryConnect = () => {
    const body = {
      'bId': this.state.id,
      'sId': this.state.seller.id,
      'exchange': this.state.venue
    };
    console.log(body);
    console.log(this.state.seller);
    this.query("POST", body, "connectBuyer", (res, that) => {
      if (res.status === "success") {
        this.intervalId = window.setInterval(this.checkAsBuyer, 1000);
        this.setState({
          status: "pending",
        });
      }
      else {
        console.log(res.status);
      }
    });
  }
  triggerModal = (item) => {
    console.log("triggered modal");
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
              <Text>Name: {this.state.seller.name}</Text>
              <Text>Discount: {this.state.seller.discount}</Text>
              <TouchableHighlight
                onPress={this.triggerModal}>
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

