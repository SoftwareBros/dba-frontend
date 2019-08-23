import React from 'react';
import { Text, View, Image, ScrollView, List, FlatList } from 'react-native';

export default function Listings(props) {
  const amount = 10;
  return(
    <ScrollView style={{backgroundColor: 'green', height: '100%', width: '90%', marginLeft: '5%', flexDirection: 'column'}}>
          <FlatList
          data={props.data}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) =>
          <View style={{ padding: 5, backgroundColor: 'yellow', flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 20,}}>{item.name}</Text>
            <Text style={{fontSize: 20,textAlign: 'right'}}>{`$${item.discount*amount}`}</Text>
          </View>
          }
          keyExtractor={item => item.name}
        />
    </ScrollView>
  );
  /*
  return (
    <ScrollView style={{backgroundColor: 'green', height: '100%', flexDirection: 'column'}}>
      <List>
      <FlatList
        data={props.data}
        renderItem={({item}) => {
          return(
            <View style={{height: '100%', backgroundColor: 'orange', flexDirection: 'row'}}>
              <Text>{item.name}</Text>
              <Text>{`$${item.amount}`}</Text>
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
      </List>
    </ScrollView>
  );*/
}


