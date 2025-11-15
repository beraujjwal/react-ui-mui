import React from 'react';
import PropTypes from 'prop-types';

import Item from './Item';
import Wrapper from './Wrapper';

function AppListItem(props) {
  return (
    <Wrapper>
      <Item>{props.item}</Item>
    </Wrapper>
  );
}

AppListItem.propTypes = {
  item: PropTypes.any,
};

export default AppListItem;