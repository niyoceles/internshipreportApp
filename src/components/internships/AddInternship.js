import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import {
  Button,
  Form,
  Item,
  Input,
  Label,
  Title,
  Spinner,
  Content,
  Container,
  Picker,
} from 'native-base';
import { Entypo } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import Theme from '../../constants/Theme';
import NavHeader from './NavHeader';
import { connect } from 'react-redux';
import { signupUser } from '../../redux/actions';

class AddInternship extends Component {
  static navigationOptions = () => ({
    headerShown: false,
  });
  state = {
    names: '',
    regNumber: '',
    phoneNumber: '',
    email: '',
    password: '',
    errors: {},
    loading: false,
    selected2: undefined,
  };

  // static getDerivedStateFromProps(props) {
  //   if (props.UI.errors) {
  //     return {errors: props.UI.errors};
  //   }
  // }
  onValueChange2(value: string) {
    this.setState({
      selected2: value,
    });
  }

  handleSubmit = async () => {
    const { names, regNumber, phoneNumber, email, password } = this.state;
    if (names.length < 5) {
      Alert.alert('Error', 'Please, names must be more than 5 Character');
    }
    if (email.length < 5) {
      Alert.alert('Error', 'Please, Enter your email');
    }
    if (egNumber.length < 5) {
      Alert.alert('Error', 'Please, Enter registration number');
    }
    if (password.length < 6) {
      Alert.alert('Error', 'Enter password more than 6 Character');
    } else {
      //Save user
      const newUserData = {
        names,
        regNumber,
        phoneNumber,
        email,
        status: 'Male',
        password,
      };

      this.props.signupUser(newUserData);
      this.setState({ loading: true });
      setInterval(() => {
        this.setState({ loading: false });
      }, 3000);
      // setTimeout(() => {
      //   if (this.props.user.authenticated) {
      //     this.setState({email: '', password: '', username: ''});
      //     return this.props.navigation.navigate('Drawer', {
      //       screen: 'Home',
      //     });
      //   } else if (this.state.errors.username) {
      //     Alert.alert('Duplicate Account:', this.state.errors.username);
      //   } else if (this.state.errors.errors.general) {
      //     Alert.alert('Used Email:', this.state.errors.errors.general);
      //   } else {
      //     Alert.alert(
      //       'Connection Error',
      //       'You may not have internet connection',
      //     );
      //   }
      // }, 2000);
    }
  };

  handleChange = (key) => (val) => {
    this.setState({ [key]: val });
  };
  render() {
    const {
      names,
      regNumber,
      phoneNumber,
      email,
      password,
      loading,
    } = this.state;
    return (
      <>
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
          <View style={styles.authForm}>
            <Title style={{ color: Theme.COLORS.PRIMARY }}>
              Create your internship record
            </Title>
            <Form>
              <Item floatingLabel last>
                <Label style={{ color: Theme.COLORS.PLACEHOLDER }}>
                  Company name
                </Label>
                <Input
                  style={{ color: Theme.COLORS.MUTED }}
                  onChangeText={this.handleChange('names')}
                  value={names}
                />
              </Item>
              <Item floatingLabel last>
                <Label style={{ color: Theme.COLORS.PLACEHOLDER }}>
                  Company Contact
                </Label>
                <Input
                  style={{ color: Theme.COLORS.MUTED }}
                  onChangeText={this.handleChange('regNumber')}
                  value={regNumber}
                />
              </Item>
              <Item floatingLabel last>
                <Label style={{ color: Theme.COLORS.PLACEHOLDER }}>
                  Phone Number
                </Label>
                <Input
                  style={{ color: Theme.COLORS.MUTED }}
                  onChangeText={this.handleChange('phoneNumber')}
                  value={phoneNumber}
                />
              </Item>
              <Item floatingLabel last>
                <Label style={{ color: Theme.COLORS.PLACEHOLDER }}>Email</Label>
                <Input
                  style={{ color: Theme.COLORS.MUTED }}
                  onChangeText={this.handleChange('email')}
                  value={email}
                />
              </Item>
              <Item floatingLabel last>
                <Label style={{ color: Theme.COLORS.PLACEHOLDER }}>
                  Password
                </Label>
                <Input
                  style={styles.input}
                  secureTextEntry={true}
                  onChangeText={this.handleChange('password')}
                  value={password}
                />
              </Item>
              <Item picker>
                <Picker
                  mode="dropdown"
                  iosIcon={<Entypo name="select-arrows" size={24} color="black" />}
                  style={{ width: undefined }}
                  placeholder="Select your SIM"
                  placeholderStyle={{ color: '#bfc6ea' }}
                  placeholderIconColor="#007aff"
                  selectedValue={this.state.selected2}
                  onValueChange={this.onValueChange2.bind(this)}
                >
                  <Picker.Item label="Select supervisor" value="" />
                  <Picker.Item label="M. Gatabazi" value="key0" />
                  <Picker.Item label="Emmanuel H" value="key1" />
                  <Picker.Item label="Debit Card" value="key2" />
                  <Picker.Item label="Credit Card" value="key3" />
                  <Picker.Item label="Net Banking" value="key4" />
                </Picker>
              </Item>
              <View style={styles.buttonAuth}>
                {loading ? <Spinner /> : null}
                <Button block onPress={this.handleSubmit}>
                  <Text style={{ color: Theme.COLORS.DEFAULT }}>
                    Add your Internship
                  </Text>
                </Button>
              </View>
            </Form>
            <View style={styles.textAuth2}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Home')}
              >
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: Theme.COLORS.PRIMARY,
                    textAlign:'center'
                  }}
                >
                  Back
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          </ScrollView>
        </Container>
      </>
    );
  }
}
const styles = StyleSheet.create({
  authForm: {
    marginTop: 20,
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
    marginBottom: 10,
    paddingBottom: 1,
  },
  textAuth2: {textAlign: 'center'},
  buttonAuth: {
    marginTop: 40,
    marginBottom: 10,
  },
  input: {
    color: Theme.COLORS.MUTED,
  },
});

AddInternship.propTypes = {
  signupUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

export default connect(mapStateToProps, { signupUser })(AddInternship);
