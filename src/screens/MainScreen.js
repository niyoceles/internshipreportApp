import * as React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {DrawerActions} from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from './HomeScreen';
import HeartScreen from './HeartScreen';
import NavHeader from '../components/posts/NavHeader';
// import Theme from '../constants/Theme';

const Tab = createMaterialTopTabNavigator();

class MainScreen extends React.Component {
  render() {
    return (
      <React.Fragment>
        <NavHeader
          navigateDrawer={() =>
            this.props.navigation.dispatch(DrawerActions.openDrawer())
          }
          navigateRequests={() =>
            this.props.navigation.navigate('Heart', {
              screen: 'Requests',
            })
          }
        />
        <Tab.Navigator initialRouteName="Home">
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Chats" component={HeartScreen} />
        </Tab.Navigator>
      </React.Fragment>
    );
  }
}

export default MainScreen;
