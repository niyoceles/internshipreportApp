import * as React from 'react';
import { Alert } from 'react-native';
import {
	createDrawerNavigator,
	DrawerContentScrollView,
	DrawerItemList,
	DrawerItem,
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-community/async-storage';

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
					label='Contact us'
					onPress={() => Alert.alert('Yvonne', '0785569511')}
				/>
			</DrawerContentScrollView>
		</React.Fragment>
	);
}

export default function DrawerScreen() {
	const [data, dataSet] = React.useState(null);

	React.useEffect(() => {
		async function fetchMyAPI() {
			let response = await AsyncStorage.getItem('userInfo');
			response = await JSON.parse(response);
			dataSet(response.role);
		}
		fetchMyAPI();
	}, []);
	return (
		<Drawer.Navigator
			drawerContent={props => (
				<CustomDrawerContent {...props} initialRouteName='Home' />
			)}
		>
			<Drawer.Screen name='Home' component={Tabs} />

			{data === 'student' ? (
				<Drawer.Screen name='Add Internship' component={AddInternship} />
			) : null}
			{/* <Drawer.Screen name="My Internship" component={MyProfile} /> */}
			<Drawer.Screen name='My Account' component={MyProfile} />
		</Drawer.Navigator>
	);
}
