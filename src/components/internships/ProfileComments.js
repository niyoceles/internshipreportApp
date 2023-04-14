import React, { Fragment } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { Card, CardItem, Thumbnail, Text, Spinner } from 'native-base';
const ProfileComments = props => {
	const { icomments } = props;
	return (
		<Card>
			{icomments ? (
				icomments.map((item, index) => {
					const { comment, createdAt, commentor } = item;
					return (
						<Fragment key={createdAt}>
							<CardItem style={{ elevation: 1 }}>
								<View style={{ flexDirection: 'column', width: '25%' }}>
									<Thumbnail source={require('../../assets/user.png')} />
									<Text style={{ color: '#333', fontSize: 8 }}>
										{commentor.names}
									</Text>
								</View>
								<View style={{ flexDirection: 'column', width: '75%' }}>
									<Text
										style={{
											fontStyle: 'italic',
											fontSize: 8,
											alignSelf: 'flex-end',
										}}
									>
										{dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
									</Text>
									<Text style={{ marginHorizontal: 15, fontSize: 12 }}>
										{comment}
									</Text>
								</View>
							</CardItem>
						</Fragment>
					);
				})
			) : (
				<Spinner />
			)}
		</Card>
	);
};

ProfileComments.propTypes = {
	// icomments: PropTypes.array.isRequired,
};

export default ProfileComments;
