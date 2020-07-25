import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { likeInternship, unLikeInternship } from '../../redux/actions';

export class LikeButton extends Component {
  likedInternship = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find((like) => like.loveId === this.props.loveId)
    ) {
      return true;
    } else {
      return false;
    }
  };

  likeInternship = () => {
    this.props.likeInternship(this.props.loveId);
  };

  unlikeInternship = () => {
    this.props.unLikeInternship(this.props.loveId);
  };

  render() {
    const {
      user: { authenticated },
    } = this.props;
    console.log('user:', this.props.user.likes);
    console.log('this', this.likedInternship());

    const likeButton = !authenticated ? (
      () => this.props.navigation.navigate('Auth')
    ) : this.likedInternship() ? (
      <TouchableOpacity onPress={this.unlikeInternship}>
         <Fontisto name="checkbox-active"size={60} style={{ color: '#ED4A6A' }} />
      </TouchableOpacity>
    ) : (
      <TouchableOpacity onPress={this.likeInternship}>
        <Fontisto name="checkbox-active"size={60} style={{ color: '#ED4A6A' }} />
      </TouchableOpacity>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  // likeInternship: PropTypes.func.isRequired,
  // unLikeInternship: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionToProps = {
  likeInternship,
  unLikeInternship,
};

export default connect(mapStateToProps, mapActionToProps)(LikeButton);
