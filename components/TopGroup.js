import React from 'react';
import { Text, View, Image } from 'react-native';
import Header from '../components/Header';
import Title from '../components/Title';

export default function TopGroup(props) {
  return (
    <View style={{height:'20%'}}>
      <Header/>
      <Title text={props.title}/>
    </View>
  );
}