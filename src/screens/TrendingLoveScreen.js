import React, {Component} from 'react';
import {Container, Content} from 'native-base';

import NavHeader from '../components/posts/NavHeader';
import NavFooter from '../components/posts/NavFooter';
import TrendingLove from '../components/posts/Posts';

class TrendingLoveScreen extends Component {
  render() {
    return (
      <Container>
        <NavHeader />
        <Content>
          <TrendingLove />
        </Content>
        <NavFooter />
      </Container>
    );
  }
}

export default TrendingLoveScreen;
