import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Button,
  Image,
  Platform,
} from 'react-native';
// import User from '../User';
import styles from '../constants/styles';
// import ImagePicker from 'react-native-image-picker';
// import RNFetchBlob from 'react-native-fetch-blob';
import {connect} from 'react-redux';
import {logoutUser} from '../redux/actions';

// const Blob = RNFetchBlob.polyfill.Blob;
// const fs = RNFetchBlob.fs;
// window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
// window.Blob = Blob;

class ProfileScreen extends Component {
  static navigationOptions = {
    title: 'Profile',
  };

  state = {
    name: this.props.user.credentials.username,
    image: this.props.user.credentials.userImage,
    loading: false,
  };

  handleChange = key => val => {
    this.setState({[key]: val});
  };

  _logout = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };



  render() {
    const {image} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        {image ? (
          <Image
            source={{uri: image.uri}}
            style={{width: 200, height: 200, borderRadius: 100}}
          />
        ) : this.props.user.credentials.userImage ? (
          <Image
            source={{uri: this.props.user.credentials.userImage}}
            style={{
              width: 200,
              height: 200,
              borderRadius: 100,
              marginBottom: 10,
            }}
          />
        ) : (
          <Image
            source={require('../images/user.png')}
            style={{
              width: 200,
              height: 200,
              borderRadius: 100,
              marginBottom: 10,
            }}
          />
        )}

        <Button title="Choose photo" onPress={this.handleChoosePhoto} />
        <Text style={{fontSize: 20}}>
          Mobile Number: {this.props.user.credentials.names}
        </Text>
        <TextInput
          style={styles.input}
          value={this.state.name}
          onChangeText={this.handleChange('name')}
        />
        <TouchableOpacity onPress={this.changeName}>
          <Text style={styles.btnTextUpdate}>update name</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._logout}>
          <Text style={styles.btnTextLogout}>Logout</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});
export default connect(mapStateToProps, {logoutUser})(ProfileScreen);
