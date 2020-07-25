/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Image, Button, StyleSheet} from 'react-native';
import {Container, Content, Card, CardItem, Text} from 'native-base';

const DATA = [
  {
    id: '1',
    name: 'celestin',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
    post:
      'The kjkkidea with React Native Elements is more about component structure than actual design',
  },
  {
    id: '2',
    name: 'kazungu',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
    post:
      'The zeidea with React Native Elements is more about component structure than actual design',
  },
  {
    id: '3',
    name: 'oscar',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
    post:
      'The didea with React Native Elements is more about component structure than actual design',
  },
];

export class Stories extends Component {
  displayUsers = () => {
    return (
      <View>
        {DATA.map((u, i) => {
          return (
            <View key={i}>
              <CardItem style={styles.item}>
                <Image
                  source={{
                    uri: `${u.avatar}`,
                  }}
                  style={{
                    height: 50,
                    width: 50,
                    marginRight: 5,
                    borderRadius: 40,
                  }}
                />
                <Text style={styles.name}>
                  {u.name} {'\n'}
                  <Text style={styles.post}>{u.post}</Text>
                </Text>
              </CardItem>
            </View>
          );
        })}
      </View>
    );
  };
  render() {
    return (
      <Container>
        <Content>
          <Card style={{flex: 0}}>{this.displayUsers()}</Card>
          <Button
            title="Go"
            onPress={() => this.props.navigation.navigate('Home')}
          />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  name: {
    fontSize: 14,
  },
  post: {
    fontSize: 12,
    width: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    backgroundColor: '#d6d7da',
    textAlign: 'center',
    margin: 5,
  },
});

export default Stories;
