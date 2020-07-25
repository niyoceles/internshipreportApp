import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './HomeScreen';
// import HeartScreen from './HeartScreen';
// import AddPostProfile from '../components/profile/AddPostProfile';
// import MyProfile from '../components/profile/MyProfile';
import Theme from '../constants/Theme';
import MyProfile from '../components/profile/MyProfile';

const Tab = createMaterialBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor={Theme.COLORS.ACTIVE}
      inactiveColor={Theme.COLORS.TERTIERY}
      barStyle={{ backgroundColor: Theme.COLORS.PRIMARY }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => (
            <Ionicons name="home" color={Theme.COLORS.ACTIVE} size={16} />
          ),
        }}
      />
      <Tab.Screen
        name="Chats"
        component={MyProfile}
        options={{
          tabBarLabel: 'Chats',
          tabBarIcon: () => (
            <Ionicons name="message" color={Theme.COLORS.ACTIVE} size={16} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default Tabs;
