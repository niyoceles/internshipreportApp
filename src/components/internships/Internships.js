/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DrawerActions } from '@react-navigation/native';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
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
import { Entypo } from '@expo/vector-icons';
import LikeButton from './LikeButton';
import NavHeader from './NavHeader';

import { connect } from 'react-redux';
import { getInternships } from '../../redux/actions';

class Internships extends Component {
  componentDidMount() {
    this.props.getInternships();
  }
  render() {
    const { internships, loading } = this.props.data;
    // const DATA = this.state.DATA myinternships;
    console.log('Internships:', internships.myinternships);
    let recentInternshipsLove = !loading ? (
      <DeckSwiper
        ref={(c) => (this._deckSwiper = c)}
        dataSource={internships.myinternships}
        renderEmpty={() => (
          <View style={{ alignSelf: 'center' }}>
            <Text>Try again</Text>
          </View>
        )}
        renderItem={(item) => (
          <TouchableOpacity
            post={item}
            onPress={() =>
              this.props.navigation.navigate('ViewInternship', item)
            }
          >
            <Card style={styles.cardSwipe}>
              <CardItem>
                <Left>
                  <Body>
                    <Text>{item.studentId}</Text>
                    <Text note>NativeBase {item.address}</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem cardBody>
                <Image
                  style={{ height: 350, flex: 1 }}
                  source={require('../../assets/user.png')}
                />
                <View
                  style={{
                    position: 'absolute',
                    top: 190,
                    left: 0,
                    width: '100%',
                    bottom: 0,
                    padding: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      color: '#fff',
                      fontWeight: 'bold',
                      fontStyle: 'normal',
                      fontSize: 20,
                    }}
                  >
                    {item.companyName}
                  </Text>
                  <Text
                    style={{
                      color: '#fff',
                      fontWeight: 'bold',
                      fontStyle: 'normal',
                      fontSize: 20,
                    }}
                  >
                    {item.contact}
                  </Text>
                  <View style={{ flexDirection: 'row', padding: 5 }}>
                    <Entypo
                      name="location"
                      size={25}
                      style={{ color: '#fff', marginTop: 0 }}
                    />
                    <Text
                      style={{
                        color: '#fff',
                        fontWeight: 'normal',
                        fontStyle: 'italic',
                      }}
                    >
                      {item.address}
                    </Text>
                  </View>
                </View>
              </CardItem>
              <CardItem>
                <Left>
                  <Body>
                    <Text style={{ color: '#ED4A6A' }}>
                      Location:{item.address}
                    </Text>
                    <Text style={{ color: '#333', fontSize: 10 }} note>
                      {item.favorites}
                    </Text>
                  </Body>
                </Left>
                <Right style={{ flexDirection: 'column' }}>
                  <TouchableOpacity>
                    <Text
                      style={{
                        fontSize: 8,
                        textAlign: 'center',
                        marginHorizontal: 10,
                      }}
                    >
                      View
                    </Text>
                    <LikeButton loveId={item.id} />
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
        {recentInternshipsLove}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  cardSwipe: {
    elevation: 4,
  },
});

Internships.propTypes = {
  getInternships: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getInternships })(Internships);
