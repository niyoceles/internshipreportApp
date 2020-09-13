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
	Thumbnail,
	Text,
	Left,
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
import LikeButton from './LikeButton';
import styles from '../../constants/styles';

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
		} = this.props.route.params.student;

		const {
			internship,
			UI: { loading },
    } = this.props;
    console.log('vvvvv', internship)


		const commentsCards = loading ? (
			<Spinner color='red' />
		) : (
			<ProfileComments lvcomments={internship.comments} />
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
							<Text style={{ color: Theme.COLORS.PRIMARY }}>
								Status: {status}
							</Text>
							<Text style={{ color: Theme.COLORS.PRIMARY }}>
								Company name: {companyName}
							</Text>
							<View style={{ flexDirection: 'row' }}>
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
							</View>
						</CardItem>
					</Card>
					<Card style={{ elevation: 3 }}>
						<CardItem>
							<View
								style={{
									flexDirection: 'column',
									alignItems: 'stretch',
								}}
							>
								<Text style={{ textAlign: 'left', fontSize: 10 }}>
									Likes:{contact}
								</Text>
								<Text style={{ textAlign: 'left', fontSize: 10 }}>
									comments:{comment}
								</Text>
							</View>
							<Right>
								<View style={{ flexDirection: 'column', marginRight: 0 }}>
									<Text style={{ fontSize: 8 }}></Text>
									<LikeButton internshipId={id} />
								</View>
							</Right>
						</CardItem>
					</Card>
					<Card style={{ elevation: 3 }}>
						<View style={{ flexDirection: 'row' }}>
							<CardItem>
								<Title style={{ color: '#333', fontWeight: 'bold' }}>
									About:
								</Title>
								<Text style={{ marginLeft: 5 }}> {companyName}</Text>
							</CardItem>
							<TouchableOpacity
								onPress={this.handleSubmit}
								style={{
									margin: 1,
									color: Theme.COLORS.PRIMARY,
									width: 70,
									fontSize: 14,
									right: 0,
									alignContent: 'center',
									alignItems: 'center',
									borderWidth: 1,
									borderColor: Theme.COLORS.PRIMARY,
									borderRadius: 5,
									paddingVertical: 1,
									paddingHorizontal: 1,
								}}
							>
								<Text style={{ fontSize: 10 }}>Connect with!</Text>
								<Entypo
									name='envelope'
									size={40}
									style={{ color: Theme.COLORS.PRIMARY, marginTop: 0 }}
								/>
							</TouchableOpacity>
						</View>
						<CardItem style={{ backgroundColor: Theme.COLORS.ABOUT_COLOR }}>
							<Text>{}</Text>
						</CardItem>
						<CardItem style={{ backgroundColor: Theme.COLORS.TERTIERY }}>
							<Title style={{ color: '#333', fontWeight: 'bold' }}>
								I like:{' '}
							</Title>
							<Text>{companyName}</Text>
						</CardItem>
					</Card>
					<Card style={{ elevation: 3 }}>
						<CardItem>
							<CommentForm internshipId={id} />
						</CardItem>
						{commentsCards}
					</Card>
				</ScrollView>
			</Container>
		);
	}
}

// const styles = StyleSheet.create({
//   name: {
//     fontSize: 14,
//   },
//   body: {
//     fontSize: 12,
//     width: 'auto',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   item: {
//     backgroundColor: '#d6d7da',
//     textAlign: 'center',
//     margin: 5,
//   },
// });

const mapStateToProps = state => ({
	user: state.user,
	internship: state.data.internship,
	UI: state.UI,
});

const mapActionsToProps = {
	logoutUser,
	getInternship,
	clearErrors,
};

export default connect(mapStateToProps, mapActionsToProps)(ViewInternship);
