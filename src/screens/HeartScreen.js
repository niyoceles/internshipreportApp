import * as React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Requests from '../components/Requests';
// import InTouch from '../components/InTouch';
import MyLovers from './MyLovers';
import MyProfile from '../components/profile/MyProfile';
// import NavHeader from '../components/posts/NavHeader';

const Tab = createMaterialTopTabNavigator();

export default function HeartScreen() {
  return (
    <React.Fragment>
      <Tab.Navigator>
        <Tab.Screen name="Requests" component={Requests} />
        {/* <Tab.Screen name="InTouch" component={InTouch} /> */}
        <Tab.Screen name="InTouch" component={MyProfile} />
      </Tab.Navigator>
    </React.Fragment>
  );
}
