/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {DrawerActions} from '@react-navigation/native';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {
  Container,
  View,
  DeckSwiper,
  Card,
  CardItem,
  Text,
  Left,
  Body,
  Right,
  Spinner,
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
// import Theme from '../../constants/Theme';
import LikeButton from './LikeButton';
import NavHeader from './NavHeader';

import {connect} from 'react-redux';
import {getPosts} from '../../redux/actions';

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    const {posts, loading} = this.props.data;
    // const DATA = this.state.DATA;
    console.log('posts:', posts);
    let recentPostsLove = !loading ? (
      <DeckSwiper
        ref={c => (this._deckSwiper = c)}
        dataSource={posts}
        renderEmpty={() => (
          <View style={{alignSelf: 'center'}}>
            <Text>Try again</Text>
          </View>
        )}
        renderItem={item => (
          <TouchableOpacity
            post={item}
            onPress={() => this.props.navigation.navigate('ViewPost', item)}>
            <Card style={styles.cardSwipe}>
              <CardItem cardBody>
                <Image
                  style={{height: 350, flex: 1}}
                  source={{
                    uri: `${item.image}`,
                  }}
                />
                <View
                  style={{
                    position: 'absolute',
                    top: 290,
                    left: 0,
                    width: '100%',
                    bottom: 0,
                    padding: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontWeight: 'bold',
                      fontStyle: 'normal',
                      fontSize: 20,
                    }}>
                    {item.names}
                  </Text>
                  <View style={{flexDirection: 'row', padding: 5}}>
                    <Ionicons
                      name="location"
                      size={25}
                      style={{color: '#fff', marginTop: 0}}
                    />
                    <Text
                      style={{
                        color: '#fff',
                        fontWeight: 'normal',
                        fontStyle: 'italic',
                      }}>
                      {item.location}
                    </Text>
                  </View>
                </View>
              </CardItem>
              <CardItem>
                <Left>
                  <Body>
                    <Text style={{color: '#ED4A6A'}}>Loves:</Text>
                    <Text style={{color: '#333', fontSize: 10}} note>
                      {item.favorites}
                    </Text>
                  </Body>
                </Left>
                <Right style={{flexDirection: 'column'}}>
                  <TouchableOpacity>
                    <Text
                      style={{
                        fontSize: 8,
                        textAlign: 'center',
                        marginHorizontal: 10,
                      }}>
                      Go In Love
                    </Text>
                    <LikeButton loveId={item.loveId} />
                  </TouchableOpacity>
                </Right>
              </CardItem>
            </Card>
          </TouchableOpacity>
        )}
      />
    ) : (
      <Spinner color="red" />
    );
    return (
      <Container>
        <NavHeader
          navigateDrawer={() =>
            this.props.navigation.dispatch(DrawerActions.openDrawer())
          }
          navigateRequests={() =>
            this.props.navigation.navigate('Heart', {
              screen: 'Requests',
            })
          }
        />
        {recentPostsLove}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  cardSwipe: {
    elevation: 4,
  },
});

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  data: state.data,
});

export default connect(
  mapStateToProps,
  {getPosts},
)(Posts);
