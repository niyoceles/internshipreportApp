import React, { Component } from 'react';
import { View, Thumbnail, Text } from 'native-base';
import Theme from '../constants/Theme';
import AsyncStorage from '@react-native-community/async-storage';

export class UserInfo extends Component {
  state = {
    userInfo: [],
  };
  async componentDidMount() {
    let obj = {};
    const userInfo = await AsyncStorage.getItem('userInfo');
    if (userInfo) {
      obj = JSON.parse(userInfo);
    }
    this.setState({
      userInfo: obj,
    });
  }
  render() {
    const { userInfo } = this.state;
    return (
      <View
        style={{
          backgroundColor: Theme.COLORS.PRIMARY,
          height: 140,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Thumbnail source={require('../assets/user.png')} />
        <Text style={{ color: 'white', fontSize: 16 }}>{userInfo.names}</Text>
        <Text style={{ color: 'white', fontSize: 16 }}>#{userInfo.email}</Text>
        <Text style={{ color: 'white', fontSize: 20 }}>I am {userInfo.role}</Text>
      </View>
    );
  }
}

export default UserInfo;
