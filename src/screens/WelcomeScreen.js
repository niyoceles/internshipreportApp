import _ from 'lodash';
import React from 'react';
import {StyleSheet, Text, View, Button, AsyncStorage} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

// import AuthScreen from './AuthScreen';
import Main from './Main';
class WelcomeScreenPage extends React.Component {
  openUpAuth = () => {
    this.props.navigation.navigate('Auth');
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Home Screen</Text>
        <Button onPress={this.openUpAuth} title="Login with Facebook" />
      </View>
    );
  }
}

class AuthScreen extends React.Component {
  render() {
    return (
      <View>
        <Text>Authentication</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const MainNavigator = createStackNavigator({
  Welcome: {screen: WelcomeScreenPage},
  Auth: {screen: AuthScreen},
  Home: {screen: Main},
});

const WelcomeScreen = createAppContainer(MainNavigator);

export default WelcomeScreen;
