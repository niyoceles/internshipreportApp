import * as React from 'react';
import {Header, Title, Button, Left, Right, Body} from 'native-base';
import Theme from '../../constants/Theme';
import { Ionicons } from '@expo/vector-icons';

const NavHeader = props => {
  return (
    <Header style={{backgroundColor: Theme.COLORS.PRIMARY}}>
      <Left>
        <Button transparent onPress={props.navigateDrawer}>
          <Ionicons name="navicon" size={30} color="#fff" />
        </Button>
      </Left>
      <Body>
        <Title>iReportApp</Title>
      </Body>
    </Header>
  );
};

export default NavHeader;
