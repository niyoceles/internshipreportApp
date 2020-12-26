import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	View,
	ImageBackground,
	StyleSheet,
	Text,
	TouchableOpacity,
	Alert,
} from 'react-native';
import { Button, Form, Item, Input, Label, Title, Spinner } from 'native-base';
import Theme from '../../constants/Theme';
import { connect } from 'react-redux';
import { signupUser } from '../../redux/actions';

class Signup extends Component {
	static navigationOptions = () => ({
		headerShown: false,
	});
	state = {
		names: '',
		regNumber: '',
		phoneNumber: '',
		email: '',
		password: '',
		errors: {},
		loading: false,
	};

	static getDerivedStateFromProps(props) {
		if (props.UI.errors) {
			return { errors: props.UI.errors };
		}
	}

	handleSubmit = async () => {
		const { names, regNumber, phoneNumber, email, password } = this.state;
		if (names.length < 5) {
			Alert.alert('Error', 'Please, names must be more than 5 Character');
		}
		if (email.length < 5) {
			Alert.alert('Error', 'Please, Enter your email');
		}
		if (regNumber.length < 5) {
			Alert.alert('Error', 'Please, Enter registration number');
		}
		if (password.length < 6) {
			Alert.alert('Error', 'Enter password more than 6 Character');
		} else {
			//Save user
			const newUserData = {
				names,
				regNumber,
				phoneNumber,
				email,
				password,
			};

			this.props.signupUser(newUserData);
			this.setState({ loading: true });
			setInterval(() => {
				this.setState({ loading: false });
			}, 3000);
			if (this.props.user.authenticated) {
				// console.log('jhhhhh', this.props.user);
				return this.props.navigation.navigate('Drawer', {
					screen: 'Home',
				});
			}
		}
	};

	handleChange = key => val => {
		this.setState({ [key]: val });
	};
	render() {
		const {
			names,
			regNumber,
			phoneNumber,
			email,
			password,
			loading,
			errors,
		} = this.state;
		console.log('ERRORRR', errors.error);
		return (
			<ImageBackground
				style={styles.image}
				source={require('../../assets/bg-auth.png')}
			>
				<View style={styles.authForm}>
					<Title style={{ color: Theme.COLORS.DEFAULT }}>
						Create student account
					</Title>
					{errors.error
						? Alert.alert(
								'Error',
								`${errors.error || errors.error.map(i => i)}`
						  )
						: null}
					<Form>
						<Item floatingLabel last>
							<Label style={{ color: Theme.COLORS.PLACEHOLDER }}>
								Full name
							</Label>
							<Input
								style={{ color: Theme.COLORS.MUTED }}
								onChangeText={this.handleChange('names')}
								value={names}
							/>
						</Item>
						<Item floatingLabel last>
							<Label style={{ color: Theme.COLORS.PLACEHOLDER }}>
								Reg. Number
							</Label>
							<Input
								style={{ color: Theme.COLORS.MUTED }}
								onChangeText={this.handleChange('regNumber')}
								value={regNumber}
							/>
						</Item>
						<Item floatingLabel last>
							<Label style={{ color: Theme.COLORS.PLACEHOLDER }}>
								Phone Number
							</Label>
							<Input
								style={{ color: Theme.COLORS.MUTED }}
								onChangeText={this.handleChange('phoneNumber')}
								value={phoneNumber}
							/>
						</Item>
						<Item floatingLabel last>
							<Label style={{ color: Theme.COLORS.PLACEHOLDER }}>Email</Label>
							<Input
								style={{ color: Theme.COLORS.MUTED }}
								onChangeText={this.handleChange('email')}
								value={email}
							/>
						</Item>
						<Item floatingLabel last>
							<Label style={{ color: Theme.COLORS.PLACEHOLDER }}>
								Password
							</Label>
							<Input
								style={styles.input}
								secureTextEntry={true}
								onChangeText={this.handleChange('password')}
								value={password}
							/>
						</Item>
						<View style={styles.buttonAuth}>
							{loading ? <Spinner /> : null}
							<Button block onPress={this.handleSubmit}>
								<Text style={{ color: Theme.COLORS.DEFAULT }}>Signup</Text>
							</Button>
						</View>
					</Form>
					<View style={styles.textAuth2}>
						<Text style={styles.textAuth}>Have an account, </Text>
						<TouchableOpacity
							onPress={() => this.props.navigation.navigate('Login')}
						>
							<Text
								style={{ fontSize: 14, fontWeight: 'bold', ...styles.textAuth }}
							>
								Login
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ImageBackground>
		);
	}
}
const styles = StyleSheet.create({
	authForm: {
		marginTop: 90,
		marginHorizontal: 50,
		alignContent: 'center',
		textAlign: 'center',
		justifyContent: 'center',
	},
	image: {
		width: '100%',
		height: '100%',
		resizeMode: 'cover',
	},
	textAuth: {
		color: Theme.COLORS.DEFAULT,
		textAlign: 'center',
		marginBottom: 10,
		paddingBottom: 1,
	},
	textAuth2: { flexDirection: 'row', textAlign: 'center', marginLeft: 40 },
	buttonAuth: {
		marginTop: 40,
		marginBottom: 10,
	},
	input: {
		color: Theme.COLORS.MUTED,
	},
});

Signup.propTypes = {
	signupUser: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	user: state.user,
	UI: state.UI,
});

export default connect(mapStateToProps, { signupUser })(Signup);
