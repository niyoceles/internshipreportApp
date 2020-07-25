/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';

import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
// import Icon from 'react-native-vector-icons/EvilIcons';
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
import { Ionicons } from '@expo/vector-icons';
import Theme from '../../constants/Theme';
import {connect} from 'react-redux';
import {getPost, logoutUser, clearErrors} from '../../redux/actions';
import ProfileComments from './ProfileComments';
import CommentForm from './CommentForm';
import LikeButton from './LikeButton';
import styles from '../../constants/styles';

class ViewPosts extends Component {
  static navigationOptions = ({route}) => ({
    title: route.params.names + " 's profile",
    headerTintColor: Theme.COLORS.DEFAULT,
    headerStyle: {
      backgroundColor: Theme.COLORS.PRIMARY,
    },
  });

  componentDidMount() {
    this.props.getPost(this.props.route.params.loveId);
    // console.log(this.props.route.name);
  }

  render() {
    const {
      names,
      body,
      location,
      userImage,
      status,
      userName,
      image,
      nationality,
      favorites,
      createAt,
      likeCount,
      commentCount,
    } = this.props.route.params;

    const {
      post: {loveId, loveComments, postImage},
      UI: {loading},
    } = this.props;

    // const {
    //   user: {
    //     credentials: {username, email},
    //     authenticated,
    //   },
    // } = this.props;

    const commentsCards = loading ? (
      <Spinner color="red" />
    ) : (
      <ProfileComments lvcomments={loveComments} />
    );

    return (
      <Container>
        <ScrollView>
          <Card style={{elevation: 3}}>
            <CardItem
              style={{
                flexDirection: 'column',
                backgroundColor: Theme.COLORS.BLOCK,
              }}>
              <Thumbnail
                source={{
                  uri: `${userImage}`,
                }}
              />
              <Text style={{color: Theme.COLORS.PRIMARY}}>
                Status: {status}
              </Text>
              <Text style={{color: Theme.COLORS.PRIMARY}}>
                Country: {nationality}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Ionicons
                  name="location"
                  size={25}
                  style={{color: Theme.COLORS.PRIMARY, marginTop: 0}}
                />
                <Text
                  style={{color: Theme.COLORS.PRIMARY, fontStyle: 'italic'}}>
                  {location}
                </Text>
              </View>
            </CardItem>
          </Card>
          <Card style={{elevation: 3}}>
            <CardItem cardBody>
              <Image
                style={{height: 300, flex: 1}}
                source={{
                  uri: `${image}`,
                }}
              />
            </CardItem>
            <CardItem>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'stretch',
                }}>
                <Text style={{textAlign: 'left', fontSize: 10}}>
                  Likes:{likeCount}
                </Text>
                <Text style={{textAlign: 'left', fontSize: 10}}>
                  comments:{commentCount}
                </Text>
              </View>
              <Right>
                <View style={{flexDirection: 'column', marginRight: 0}}>
                  <Text style={{fontSize: 8}}>Please request a love</Text>
                  <LikeButton loveId={loveId} />
                </View>
              </Right>
            </CardItem>
          </Card>
          <Card style={{elevation: 3}}>
            <View style={{flexDirection: 'row'}}>
              <CardItem>
                <Title style={{color: '#333', fontWeight: 'bold'}}>
                  About:
                </Title>
                <Text style={{marginLeft: 5}}> {names}</Text>
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
                }}>
                <Text style={{fontSize: 10}}>Connect with!</Text>
                <Ionicons
                  name="envelope"
                  size={40}
                  style={{color: Theme.COLORS.PRIMARY, marginTop: 0}}
                />
              </TouchableOpacity>
            </View>
            <CardItem style={{backgroundColor: Theme.COLORS.ABOUT_COLOR}}>
              <Text>{body}</Text>
            </CardItem>
            <CardItem style={{backgroundColor: Theme.COLORS.TERTIERY}}>
              <Title style={{color: '#333', fontWeight: 'bold'}}>
                I like:{' '}
              </Title>
              <Text>{favorites}</Text>
            </CardItem>
          </Card>
          <Card style={{elevation: 3}}>
            <CardItem>
              <CommentForm loveId={loveId} />
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
  post: state.data.post,
  UI: state.UI,
});

const mapActionsToProps = {
  logoutUser,
  getPost,
  clearErrors,
};

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(ViewPosts);
