import 'react-native-gesture-handler';
import * as React from 'react';
import { AppLoading } from 'expo';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import store from './src/redux/store/index';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import HomeScreen from './screens/HomeScreen';
import AuthScreen from './src/screens/AuthScreen';
// import Tabs from './src/screens/Tabs';
import DrawerScreen from './src/screens/DrawerScreen';
import AuthLoadingScreen from './src/screens/AuthLoadingScreen';
import AsyncStorage from '@react-native-community/async-storage';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { SET_AUTHENTICATED } from './src/redux/types';
import { logoutUser } from './src/redux/actions';

const Stack = createStackNavigator();
class App extends React.Component {
	async componentDidMount() {
		await AsyncStorage.getItem('userIdToken').then(token => {
			console.log('token', token);
			if (token) {
				const decodedToken = jwtDecode(token);
				if (decodedToken.exp * 1000 < Date.now()) {
					store.dispatch(logoutUser());
				} else {
					store.dispatch({ type: SET_AUTHENTICATED });
					axios.defaults.headers.common.Authorization = token;
					// store.dispatch(getUserData());
				}
			}
		});
	}
	constructor(props) {
		super(props);
		this.state = {
			isReady: false,
		};
	}

	async UNSAFE_componentWillMount() {
		await Font.loadAsync({
			Roboto: require('native-base/Fonts/Roboto.ttf'),
			Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
			...Ionicons.font,
		});
		this.setState({ isReady: true });
	}

	render() {
		if (!this.state.isReady) {
			return <AppLoading />;
		}
		return (
			<StoreProvider store={store}>
				<PaperProvider>
					<NavigationContainer>
						<Stack.Navigator initialRouteName='Start'>
							<Stack.Screen
								name='Auth'
								component={AuthScreen}
								options={{
									headerShown: false,
								}}
							/>
							<Stack.Screen
								name='Drawer'
								component={DrawerScreen}
								options={{
									headerShown: false,
								}}
							/>
							<Stack.Screen
								name='Start'
								component={AuthLoadingScreen}
								options={{
									headerShown: false,
								}}
							/>
						</Stack.Navigator>
					</NavigationContainer>
				</PaperProvider>
			</StoreProvider>
		);
	}
}

export default App;