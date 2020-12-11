/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { DrawerActions } from '@react-navigation/native';
import {StyleSheet, TouchableOpacity } from 'react-native';
import {
	Container,
	View,
	Card,
	CardItem,
	Text,
	Left,
	Body,
	Right,
	Spinner,
} from 'native-base';
import NavHeader from './NavHeader';
import Theme from '../../constants/Theme';
import { Entypo } from '@expo/vector-icons';
import { getInternships } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

const Internships = props => {
	const Data = useSelector(state => state.data);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getInternships());
	}, [dispatch]);

	const { internships, loading } = Data;
	let recentInternshipsLove = !loading ? (
		internships &&
		internships.map((item, i) => (
			<TouchableOpacity
				singleInternship={item}
				onPress={() => props.navigation.navigate('ViewInternship', item)}
			>
				<Card style={styles.cardSwipe}>
					<CardItem>
						<Left>
							<Body>
								<Text>{item.student.names}</Text>
								<Text>Reg. Number:{item.student.regNumber}</Text>
							</Body>
						</Left>
						<Right>
							<Body>
							<Entypo
									name='arrow-right'
									size={60}
									style={{ color: Theme.COLORS.PRIMARY, marginTop: 0 }}
								/>
							</Body>
						</Right>
					</CardItem>
					<CardItem>
						<Left>
							<Body>
								<Text style={{ color: '#ED4A6A', fontSize: 24 }}>
									{' '}
									{item.companyName}
								</Text>
							</Body>
						</Left>
					</CardItem>
				</Card>
			</TouchableOpacity>
		))
	) : (
		<Spinner color='red' />
	);
	return (
		<Container>
			<NavHeader
				navigateDrawer={() =>
					props.navigation.dispatch(DrawerActions.openDrawer())
				}
				navigateRequests={() =>
					props.navigation.navigate('Heart', {
						screen: 'Requests',
					})
				}
			/>
			{recentInternshipsLove}
		</Container>
	);
};

const styles = StyleSheet.create({
	cardSwipe: {
		elevation: 3,
	},
});

Internships.propTypes = {
	getInternships: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired,
};

export default Internships;
