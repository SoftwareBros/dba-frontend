import React from 'react';
import { Text, View, Image } from 'react-native';

export default function Header(props) {
  return (
    <View style={{backgroundColor: '#003b55', height: '65%', marginTop: 0, flexDirection: 'row', justifyContent: 'center'}}>
      <Image source={require("../imgs/logo.png")} style={{width: 136, height: 80, marginTop: 10}}/>
    </View>
  );
}

