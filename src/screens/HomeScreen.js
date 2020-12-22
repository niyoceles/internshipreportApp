import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Internships from '../components/internships/Internships';
import ViewInternship from '../components/internships/ViewInternship';
import MyProfile from '../components/profile/MyProfile';

const Stack = createStackNavigator();

function HomeScreen() {
	return (
		<Stack.Navigator init>
			<Stack.Screen
				name='Internships'
				component={Internships}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name='ViewInternship'
				component={ViewInternship}
				options={ViewInternship.navigationOptions}
			/>
			<Stack.Screen
				name='FirstStep'
				component={ViewInternship}
				options={{
					title: 'let People get your comments',
				}}
			/>
			<Stack.Screen name='Profile' component={MyProfile} />
		</Stack.Navigator>
	);
}

export default HomeScreen;
