import React, {Component, Fragment} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import {
  Container,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Button,
  Spinner,
  Right,
} from 'native-base';

class ProfileComments extends Component {
  render() {
    const {lvcomments} = this.props;
    return (
      <Card>
        {lvcomments ? (
          lvcomments.map((comment, index) => {
            const {body, createdAt, userImage, userName} = comment;
            return (
              <Fragment key={createdAt}>
                <CardItem style={{elevation: 1}}>
                  <View style={{flexDirection: 'column'}}>
                    <Text style={{color: '#333', fontSize: 9}}>{userName}</Text>
                    <Thumbnail
                      source={{
                        uri: `${userImage}`,
                      }}
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        fontStyle: 'italic',
                        fontSize: 8,
                        alignSelf: 'flex-end',
                      }}>
                      {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                    </Text>
                    <Text style={{marginHorizontal: 15, fontSize: 12}}>
                      {body}
                    </Text>
                  </View>
                </CardItem>
                {index !== lvcomments.length - 1 && <Text> </Text>}
              </Fragment>
            );
          })
        ) : (
          <Spinner />
        )}
      </Card>
    );
  }
}

ProfileComments.propTypes = {
  // lvcomments: PropTypes.array.isRequired,
};

export default ProfileComments;
