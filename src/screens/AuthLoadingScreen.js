import React from 'react';
import {View, StatusBar, ActivityIndicator, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrap();
    this.state = {
      userInfo: '',
    };
  }

  _bootstrap = async () => {
    const userInfo = await AsyncStorage.getItem('userInfo');
    if (userInfo) {
      this.setState({
        userInfo: userInfo,
      });
    }
    const userIdToken = await AsyncStorage.getItem('userIdToken');
    console.log('Token on Loading:', userIdToken);
    this.props.navigation.navigate(userIdToken ? 'Drawer' : 'Auth');
  };

  render() {
    const {userInfo} = this.state;
    return (
      <View userInfo={userInfo} style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
