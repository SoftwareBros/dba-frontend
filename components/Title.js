import React from 'react';
import { Text, View, Image } from 'react-native';

export default function Title(props) {
  return (
    <View style={{backgroundColor: 'red', height: '35%', marginTop: 0, marginBottom: 10}}>
      <Text style={{fontFamily: 'Roboto', fontSize: 40, fontWeight: 'bold', textAlign: 'center'}}>{props.text}</Text>
    </View>
  );
}

