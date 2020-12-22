/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';

import {
	View,
	Image,
	ScrollView,
	TouchableOpacity,
	Alert,
	StyleSheet,
} from 'react-native';
import User from '../../User';

import {
	Container,
	Card,
	CardItem,
	Text,
	Spinner,
	Title,
	Right,
} from 'native-base';
import { Entypo } from '@expo/vector-icons';
import Theme from '../../constants/Theme';
import { connect } from 'react-redux';
import { getInternship, logoutUser, clearErrors } from '../../redux/actions';
import ProfileComments from './ProfileComments';
import CommentForm from './CommentForm';

class ViewInternship extends Component {
	static navigationOptions = ({ route }) => ({
		title: route.params.student.names + " 's profile",
		headerTintColor: Theme.COLORS.DEFAULT,
		headerStyle: {
			backgroundColor: Theme.COLORS.PRIMARY,
		},
	});

	componentDidMount() {
		this.props.getInternship(this.props.route.params.id);
	}

	render() {
		const {
			student,
			supervisor,
			address,
			comment,
			companyName,
			contact,
			createdAt,
			endDate,
			id,
			isAccepted,
			mark,
			startDate,
			status,
		} = this.props.route.params;

		const {
			internship,
			UI: { loading },
		} = this.props;

		// console.log('vvvvvpppp', this.props);

		const commentsCards = loading ? (
			<Spinner color='red' />
		) : (
			<ProfileComments icomments={internship.comments} />
		);

		return (
			<Container>
				<ScrollView>
					<Card style={{ elevation: 3 }}>
						<CardItem
							style={{
								flexDirection: 'column',
								backgroundColor: Theme.COLORS.BLOCK,
							}}
						>
							<Title style={{ color: Theme.COLORS.PRIMARY }}>
								{student.names}
							</Title>
							<Text style={{ color: Theme.COLORS.PRIMARY }}>
								Email: {student.email}
							</Text>
							<Text style={{ color: Theme.COLORS.PRIMARY }}>
								Ph: {student.phoneNumber}
							</Text>
							<Text style={{ color: Theme.COLORS.PRIMARY }}>
								Reg: {student.regNumber}
							</Text>
						</CardItem>
					</Card>
					<Card style={{ elevation: 3 }}>
						<CardItem style={{ backgroundColor: Theme.COLORS.TERTIERY }}>
							<Title style={{ color: '#333', fontWeight: 'bold' }}>
								Internship to : {companyName}
							</Title>
						</CardItem>
						<View
							style={{
								flexDirection: 'row',
								backgroundColor: Theme.COLORS.TERTIERY,
								padding: 10,
							}}
						>
							<Entypo
								name='location'
								size={25}
								style={{ color: Theme.COLORS.PRIMARY, marginTop: 0 }}
							/>
							<Text
								style={{ color: Theme.COLORS.PRIMARY, fontStyle: 'italic' }}
							>
								{address}
							</Text>
							<Right>
								<View style={{ flexDirection: 'column', marginRight: 0 }}>
									<Text style={{ fontSize: 8 }}>Start at:{startDate} </Text>
									<Text style={{ fontSize: 8 }}>End at {endDate} </Text>
								</View>
							</Right>
						</View>
						<CardItem>
							<CommentForm internshipId={id} />
						</CardItem>
						<CardItem>
							<View
								style={{
									flexDirection: 'column',
									alignItems: 'stretch',
								}}
							>
								<Text style={{ textAlign: 'left', fontSize: 14 }}>
									comments: {internship.comments.length}
								</Text>
							</View>
							<Right>
								<View style={{ flexDirection: 'column', marginRight: 0 }}>
									<Text style={{ fontSize: 8 }}>Start at: </Text>
									<Text style={{ fontSize: 8 }}>End at </Text>
								</View>
							</Right>
						</CardItem>
						{commentsCards}
					</Card>
				</ScrollView>
			</Container>
		);
	}
}

const mapStateToProps = state => ({
	user: state.user,
	internship: state.data,
	UI: state.UI,
});

const mapActionsToProps = {
	logoutUser,
	getInternship,
	clearErrors,
};

export default connect(mapStateToProps, mapActionsToProps)(ViewInternship);
