import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	View,
	ImageBackground,
	StyleSheet,
	Text,
	TouchableOpacity,
	Alert,
	ScrollView,
} from 'react-native';
import {
	Button,
	Form,
	Item,
	Input,
	Label,
	Title,
	Spinner,
	Content,
	Container,
	Picker,
} from 'native-base';
import { Entypo } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import Theme from '../../constants/Theme';
import { connect } from 'react-redux';
import { updateInternship, getSupervisors } from '../../redux/actions';

class UpdateInternship extends Component {
	static navigationOptions = ({ route }) => ({
		title: route.params.student.names + ' update internship',
		headerTintColor: Theme.COLORS.DEFAULT,
		headerStyle: {
			backgroundColor: Theme.COLORS.PRIMARY,
		},
	});

	// componentDidMount() {
	// 	this.props.getInternship(this.props.route.params.id);
	// }

	state = {
		companyName: this.props.route.params.companyName,
		address: this.props.route.params.address,
		contact: this.props.route.params.contact,
		startDate: this.props.route.params.startDate,
		endDate: this.props.route.params.endDate,
		errors: {},
		loading: false,
		selected2: undefined,
	};

	async componentDidMount() {
		await this.props.getSupervisors();
	}

	onValueChange2(value: string) {
		this.setState({
			selected2: value,
		});
	}

	handleSubmit = async () => {
		const {
			companyName,
			address,
			contact,
			startDate,
			endDate,
			selected2,
		} = this.state;
		if (companyName.length < 3) {
			Alert.alert(
				'Error',
				'Please, company name must be more than 2 Characters'
			);
		}
		if (selected2.length < 5) {
			Alert.alert('Error', 'Please, please select your supervisor');
		}
		if (address.length < 5) {
			Alert.alert('Error', 'Please, add company addresses');
		}
		if (startDate.length < 6) {
			Alert.alert('Error', 'Please enter date');
		} else {
			//Save user
			const newUserData = {
				companyName,
				supervisorId: selected2,
				address,
				contact,
				startDate,
				endDate,
				status: 'active',
			};
			this.props.updateInternship(this.props.route.params.id, newUserData);
			this.setState({ loading: true });
			setInterval(() => {
				this.setState({ loading: false });
			}, 9000);
		}
	};

	handleChange = key => val => {
		this.setState({ [key]: val });
	};

	render() {
		const {
			companyName,
			address,
			contact,
			startDate,
			endDate,
			loading,
		} = this.state;
		const { supervisors } = this.props.user;
		const { updated } = this.props.internship;

		if (updated === 'internship updated successful') {
			Alert.alert('Success', 'Your internship have successful updated');
		}
		return (
			<>
				<Container>
					<ScrollView>
						<View style={styles.authForm}>
							<Title style={{ color: Theme.COLORS.PRIMARY }}>
								Update internship record
							</Title>
							<Form>
								<Item floatingLabel last>
									<Label style={{ color: Theme.COLORS.PLACEHOLDER }}>
										Company name
									</Label>
									<Input
										style={{ color: Theme.COLORS.MUTED }}
										onChangeText={this.handleChange('companyName')}
										value={companyName}
									/>
								</Item>
								<Item floatingLabel last>
									<Label style={{ color: Theme.COLORS.PLACEHOLDER }}>
										Company Address
									</Label>
									<Input
										style={{ color: Theme.COLORS.MUTED }}
										onChangeText={this.handleChange('address')}
										value={address}
									/>
								</Item>
								<Item floatingLabel last>
									<Label style={{ color: Theme.COLORS.PLACEHOLDER }}>
										Phone Number
									</Label>
									<Input
										style={{ color: Theme.COLORS.MUTED }}
										onChangeText={this.handleChange('contact')}
										value={contact}
									/>
								</Item>
								<Item floatingLabel last>
									<Label style={{ color: Theme.COLORS.PLACEHOLDER }}>
										Start date
									</Label>
									<Input
										style={styles.input}
										onChangeText={this.handleChange('startDate')}
										value={startDate}
									/>
								</Item>
								<Item floatingLabel last>
									<Label style={{ color: Theme.COLORS.PLACEHOLDER }}>
										End date
									</Label>
									<Input
										style={styles.input}
										onChangeText={this.handleChange('endDate')}
										value={endDate}
									/>
								</Item>
								<Item picker>
									<Picker
										mode='dropdown'
										iosIcon={
											<Entypo name='select-arrows' size={24} color='black' />
										}
										style={{ width: undefined }}
										placeholder='Select your SIM'
										placeholderStyle={{ color: '#bfc6ea' }}
										placeholderIconColor='#007aff'
										selectedValue={this.state.selected2}
										onValueChange={this.onValueChange2.bind(this)}
									>
										<Picker.Item label='Select supervisor' value='' />
										{supervisors &&
											supervisors.map((item, i) => (
												<Picker.Item
													label={item.names}
													key={item.id}
													value={item.id}
												/>
											))}
									</Picker>
								</Item>
								<View style={styles.buttonAuth}>
									{loading ? <Spinner /> : null}
									<Button block onPress={this.handleSubmit}>
										<Text style={{ color: Theme.COLORS.DEFAULT }}>
											Update Internship
										</Text>
									</Button>
								</View>
							</Form>
							<View style={styles.textAuth2}>
								<TouchableOpacity
									onPress={() => this.props.navigation.navigate('Home')}
								>
									<Text
										style={{
											fontSize: 24,
											fontWeight: 'bold',
											color: Theme.COLORS.PRIMARY,
											textAlign: 'center',
										}}
									>
										Back
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					</ScrollView>
				</Container>
			</>
		);
	}
}
const styles = StyleSheet.create({
	authForm: {
		marginTop: 20,
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
	textAuth2: { textAlign: 'center' },
	buttonAuth: {
		marginTop: 40,
		marginBottom: 10,
	},
	input: {
		color: Theme.COLORS.MUTED,
	},
});

UpdateInternship.propTypes = {
	updateInternship: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	user: state.user,
	UI: state.UI,
	internship: state.data,
});

export default connect(mapStateToProps, { updateInternship, getSupervisors })(
	UpdateInternship
);
