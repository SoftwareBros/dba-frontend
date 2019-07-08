import React, { Component } from 'react';
import { Modal, StyleSheet, Text, View, Button, TouchableHighlight, Alert } from 'react-native';
import { LinearGradient } from 'expo';
import { SafeAreaView } from 'react-navigation';

type Props = {navigation: {navigate: Function}};
type State = {};
export default class Exchange extends Component<Props, State> {
  constructor(props: any){
    super(props);
    this.state = {
      venue: this.props.navigation.state.params.venue,
      modalVisible: false
    }
  }
  moveToBecomeSeller = () => {
    this.props.navigation.navigate('BecomeSeller');
  }
  triggerModal = () => {
    console.log("triggered modal");
    this.setState({modalVisible: !this.state.modalVisible});
  }
  render = () => {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 45, fontWeight: 'bold' }}>{ `Venue: ${this.state.venue}` }</Text>
        <Button
          title='To Connect'
          onPress={this.triggerModal}
        />
        <Button
          title='To Become a Seller'
          onPress={this.moveToBecomeSeller}
        />
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

