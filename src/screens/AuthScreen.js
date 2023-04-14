import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';
import SignupSupervisor from '../components/auth/SignupSupervisor';

const Stack = createStackNavigator();
function AuthScreen() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name='Login'
				component={Login}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name='Signup'
				component={Signup}
				options={Signup.navigationOptions}
			/>
			<Stack.Screen
				name='SignupSupervisor'
				component={SignupSupervisor}
				options={SignupSupervisor.navigationOptions}
			/>
		</Stack.Navigator>
	);
}

export default AuthScreen;
