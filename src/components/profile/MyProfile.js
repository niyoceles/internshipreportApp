import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ScrollView, StyleSheet} from 'react-native';

import {
  Container,
  View,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Spinner,
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {logoutUser} from '../../redux/actions';
// import Icon from 'react-native-vector-icons/EvilIcons';
import Theme from '../../constants/Theme';
import {DrawerActions} from '@react-navigation/native';
import NavHeader from '../posts/NavHeader';

class MyProfile extends Component {
  handleLogout = async () => {
    await this.props.logoutUser();
    await AsyncStorage.removeItem('userIdToken');
    this.props.navigation.navigate('Auth');
  };

  render() {
    const {
      user: {
        credentials: {
          email,
          names
        },
        loading,
        authenticated,
      },
    } = this.props;

    if (!loading) {
      if (!email) {
        this.props.navigation.navigate('Auth', {screen: 'Login'});
      }
    }

    let profileMarkup = !loading ? (
      authenticated ? (
        <React.Fragment>
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
          <Container>
            <ScrollView>
              <Card style={{elevation: 3}}>
                <CardItem
                  style={{
                    flexDirection: 'column',
                    backgroundColor: Theme.COLORS.SECONDARY,
                  }}>
  
                  <Text style={{color: Theme.COLORS.DEFAULT}}>
                    your names: {names}
                  </Text>
                  <Text style={{color: Theme.COLORS.DEFAULT}}>
                    Email: {email}
                  </Text>
                </CardItem>
              </Card>
              <Card style={{elevation: 3}}>
                <CardItem>
                  <Text>About :</Text>
                </CardItem>
                <CardItem>
                  <Text>Bio</Text>
                </CardItem>
              </Card>
              <Card style={{elevation: 3}}>
                <Button
                  block
                  onPress={this.handleLogout}
                  style={{backgroundColor: Theme.COLORS.PRIMARY}}>
                  <Text>Logout</Text>
                </Button>
              </Card>
            </ScrollView>
          </Container>
        </React.Fragment>
      ) : (
        () => this.props.navigation.navigate('Auth')
      )
    ) : (
      <View>
        <Text>loading</Text>
      </View>
    );

    return profileMarkup;
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

MyProfile.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, {logoutUser})(MyProfile);
