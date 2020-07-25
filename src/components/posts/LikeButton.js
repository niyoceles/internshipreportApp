import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity} from 'react-native';

//Mui staff
import { Ionicons } from '@expo/vector-icons';
import {connect} from 'react-redux';
import {likePost, unLikePost} from '../../redux/actions';

export class LikeButton extends Component {
  likedPost = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(like => like.loveId === this.props.loveId)
    ) {
      return true;
    } else {
      return false;
    }
  };

  likePost = () => {
    this.props.likePost(this.props.loveId);
  };

  unlikePost = () => {
    this.props.unLikePost(this.props.loveId);
  };

  render() {
    const {
      user: {authenticated},
    } = this.props;
    console.log('user:', this.props.user.likes);
    console.log('this', this.likedPost());

    const likeButton = !authenticated ? (
      () => this.props.navigation.navigate('Auth')
    ) : this.likedPost() ? (
      <TouchableOpacity onPress={this.unlikePost}>
        <Ionicons name="heart" size={60} style={{color: '#ED4A6A'}} />
      </TouchableOpacity>
    ) : (
      <TouchableOpacity onPress={this.likePost}>
        <Ionicons name="like" size={60} style={{color: '#ED4A6A'}} />
      </TouchableOpacity>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  likePost: PropTypes.func.isRequired,
  unLikePost: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapActionToProps = {
  likePost,
  unLikePost,
};

export default connect(mapStateToProps, mapActionToProps)(LikeButton);
