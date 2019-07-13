import React from 'react';
import { Text, View, Image } from 'react-native';
import Title from './Title';
//import fitnessHome from './fitnessHome';
//import memoryHome from './memoryHome';

export default function Profile(props) {
  //const comps = {fitnessHome, memoryHome}
  return (
    <View style={{textAlign: 'center', height: '80%'}}>
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
        <View style={{flexDirection: 'column', }}>
          <Image source={props.picture} style={{width: 200, height: 200, borderRadius: 100}}/>
          <View style={{width: 200, marginTop: 3}}>
            <Text style={{backgroundColor: '#a4a4a4', color: 'white', borderRadius: 30, textAlign: 'center', margin: 2}}>{props.name}</Text>
            <Text style={{backgroundColor: '#a4a4a4', color: 'white', borderRadius: 30, textAlign: 'center', margin: 2}}>{`Max DBA: $${props.maxDBA}`}</Text>
            <Text style={{backgroundColor: '#a4a4a4', color: 'white', borderRadius: 30, textAlign: 'center', margin: 2}}>{`Discount: ${props.discount}%`}</Text>
          </View>
          
        </View>
      </View>
      
      
    </View>
  );
}
