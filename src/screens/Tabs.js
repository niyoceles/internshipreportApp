import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from './HomeScreen';
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
            <MaterialCommunityIcons
              name="home-account"
              color={Theme.COLORS.ACTIVE}
              size={16}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Chats"
        component={MyProfile}
        options={{
          tabBarLabel: 'My Account',
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="account-card-details"
              color={Theme.COLORS.ACTIVE}
              size={16}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default Tabs;
