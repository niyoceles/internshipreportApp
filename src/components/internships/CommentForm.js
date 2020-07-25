import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Image, TouchableOpacity, SafeAreaView, Alert} from 'react-native';
import {Textarea, CardItem, Thumbnail} from 'native-base';
// Redux stuff
import {connect} from 'react-redux';
import {submitComment} from '../../redux/actions';

class CommentForm extends Component {
  state = {
    body: '',
    errors: {},
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({errors: nextProps.UI.errors});
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({body: ''});
    }
  }

  handleChange = key => val => {
    this.setState({[key]: val});
  };

  handleSubmit = async () => {
    if (this.state.body.length > 0) {
      this.props.submitComment(this.props.loveId, {body: this.state.body});
    } else {
      Alert.alert('Error', 'Wrong email');
    }
  };

  render() {
    const {authenticated} = this.props;
    const errors = this.state.errors;

    const commentFormMarkup = authenticated ? (
      <SafeAreaView>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Textarea
            style={{
              padding: 5,
              borderWidth: 2,
              borderColor: '#cccc',
              width: '88%',
              marginBottom: 10,
              borderRadius: 5,
              color: '#000000',
            }}
            value={this.state.body}
            placeholder="type comment here..."
            onChangeText={this.handleChange('body')}
          />
          <TouchableOpacity
            onPress={this.handleSubmit}
            style={{paddingBottom: 10, marginLeft: 0}}>
            <Image
              source={require('../../images/send-button.png')}
              style={{width: 25, height: 35, marginRight: 1, marginLeft: 5}}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    ) : null;
    return commentFormMarkup;
  }
}

CommentForm.propTypes = {
  submitComment: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  loveId: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  UI: state.UI,
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps, {submitComment})(CommentForm);
