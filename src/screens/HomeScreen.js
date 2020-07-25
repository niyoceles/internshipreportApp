import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Posts from '../components/posts/Posts';
import ViewPost from '../components/posts/ViewPost';
import ProfileScreen from './ProfileScreen';

const Stack = createStackNavigator();

function HomeScreen() {
  return (
    <Stack.Navigator init>
      <Stack.Screen
        name="Posts"
        component={Posts}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ViewPost"
        component={ViewPost}
        options={ViewPost.navigationOptions}
      />  
      <Stack.Screen
        name="FirstStep"
        component={ViewPost}
        options={{
          title: 'let People get your love',
        }}
      />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

export default HomeScreen;
