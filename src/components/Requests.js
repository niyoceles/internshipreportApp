import React, {Fragment} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native';
import {DATA} from './Data';
import Theme from '../constants/Theme';
import {Button, Text, Right} from 'native-base';

function UserItem({name, location, avatar}) {
  return (
    <TouchableOpacity style={styles.item}>
      <Image
        source={{
          uri: `${avatar}`,
        }}
        style={styles.userImage}
      />
      <View style={{flexDirection: 'column'}}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.name}>{location}</Text>
      </View>
      <Right>
        <View style={{flexDirection: 'row'}}>
          <Button danger style={{margin: 5}}>
            <Text>Refuse</Text>
          </Button>
          <Button success style={{margin: 5}}>
            <Text>Accept</Text>
          </Button>
        </View>
      </Right>
    </TouchableOpacity>
  );
}

function Requests() {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({item}) => (
          <Fragment>
            <UserItem
              name={item.name}
              location={item.location}
              avatar={item.avatar}
            />
          </Fragment>
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 2,
  },
  userImage: {
    height: 50,
    width: 50,
    marginRight: 5,
    borderRadius: 40,
  },
  name: {
    fontSize: 14,
  },
  item: {
    flexDirection: 'row',
    backgroundColor: Theme.COLORS.TERTIERY,
    padding: 10,
    marginVertical: 8,
    borderRadius: 10,
    marginHorizontal: 16,
  },
});

export default Requests;
