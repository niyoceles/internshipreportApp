import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { Button, Spinner, Form, Item, Input, Label, Title } from 'native-base';
import { Font } from 'expo';
import Theme from '../../constants/Theme';
// redux
import { connect } from 'react-redux';
import { loginUser } from '../../redux/actions';

// Icon.loadFont();
class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {},
    loading: false,
  };

  // static getDerivedStateFromProps(props) {
  //   if (props.UI.errors) {
  //     return {errors: props.UI.errors};
  //   }
  // }

  handleSubmit = async () => {
    if (this.state.email.length < 5) {
      Alert.alert('Error', 'Please, Enter your Email');
    }
    if (this.state.password.length < 5) {
      Alert.alert('Error', 'Please. Enter your password');
    } else {
      //Save user
      const userData = {
        email: this.state.email,
        password: this.state.password,
      };

      this.props.loginUser(userData);
      this.setState({ loading: true });
      setInterval(() => {
        this.setState({ loading: false });
      }, 4000);
      if (this.props.user.authenticated) {
        console.log('jhhhhh', this.props.user);
        return this.props.navigation.navigate('Drawer', {
          screen: 'Home',
        });
      }
      // setTimeout(() => {
      //   console.log('jhhhhh',this.props.user.credentials);
      //   Alert.alert('success:',this.props.user.credentials );
      //   if (this.props.user.credentials) {
      //     this.setState({ email: '', password: '' });
      //     return this.props.navigation.navigate('Drawer', {
      //       screen: 'Home',
      //     });
      //   } else if (this.state.errors) {
      //     Alert.alert('Error', this.state.errors);
      //   }
      // }, 2000);
    }
  };

  handleChange = (key) => (val) => {
    this.setState({ [key]: val });
  };

  render() {
    return (
      <ImageBackground
        style={styles.image}
        source={require('../../assets/bg-auth.png')}
      >
        <View style={styles.authForm}>
          <Title style={{ color: Theme.COLORS.DEFAULT }}>Please Login</Title>
          <Form>
            <Item floatingLabel last>
              <Label style={{ color: Theme.COLORS.PLACEHOLDER }}>Email</Label>
              <Input
                onChangeText={this.handleChange('email')}
                value={this.state.email}
                style={{ color: Theme.COLORS.MUTED }}
              />
            </Item>
            <Item floatingLabel last>
              <Label style={{ color: Theme.COLORS.PLACEHOLDER }}>
                Password
              </Label>
              <Input
                secureTextEntry={true}
                onChangeText={this.handleChange('password')}
                value={this.state.password}
                style={{ color: Theme.COLORS.MUTED }}
              />
            </Item>
            <View style={styles.buttonAuth}>
              {this.state.loading ? <Spinner /> : null}
              <Button block onPress={this.handleSubmit}>
                <Text style={{ color: Theme.COLORS.DEFAULT }}>LOGIN</Text>
              </Button>
            </View>
          </Form>
          <View style={styles.textAuth2}>
            <Text style={styles.textAuth}>Don't have an account, </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Signup')}
            >
              <Text
                style={{ fontSize: 14, fontWeight: 'bold', ...styles.textAuth }}
              >
                Signup
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.textAuth2}>
            <Text style={styles.textAuth}>Don't have an account, </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Drawer')}
            >
              <Text
                style={{ fontSize: 14, fontWeight: 'bold', ...styles.textAuth }}
              >
                Go Home
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  authForm: {
    flexGrow: 1,
    marginTop: 90,
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
    marginBottom: 15,
    paddingBottom: 5,
  },
  SocialTitle: {
    color: Theme.COLORS.DEFAULT,
    marginLeft: 55,
    textAlign: 'center',
    marginBottom: 10,
    paddingBottom: 1,
  },
  textAuth2: { flexDirection: 'row', textAlign: 'center', marginLeft: 40 },
  buttonAuth: {
    marginTop: 40,
    marginBottom: 10,
  },
  iconSocial: {
    textAlign: 'center',
    marginLeft: 60,
    paddingTop: 10,
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

export default connect(mapStateToProps, { loginUser })(Login);
