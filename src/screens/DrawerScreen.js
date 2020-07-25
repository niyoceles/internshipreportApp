import * as React from 'react';
import { Alert } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import AddInternship from '../components/internships/AddInternship';
import MyProfile from '../components/profile/MyProfile';
import Tabs from './Tabs';
import UserInfo from '../components/UserInfo';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <React.Fragment>
      <UserInfo />
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Contact us"
          onPress={() => Alert.alert('Celestin', 'niyoceles3@gmail.com')}
        />
      </DrawerContentScrollView>
    </React.Fragment>
  );
}

export default function DrawerScreen() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawerContent {...props} initialRouteName="Home" />
      )}
    >
      <Drawer.Screen name="Home" component={Tabs} />
      <Drawer.Screen name="Add Internship" component={AddInternship} />
      <Drawer.Screen name="My Internship" component={MyProfile} />
      <Drawer.Screen name="My Account" component={MyProfile} />
    </Drawer.Navigator>
  );
}
