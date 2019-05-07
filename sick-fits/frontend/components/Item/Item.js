import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Title from '../styles/Title';
import ItemStyles from '../styles/ItemStyles';
import PriceTag from '../styles/PriceTag';

class componentName extends Component {
  render() {
    const { item } = this.props;

    return (
      <ItemStyles>
        <Title>{item.title}</Title>
      </ItemStyles>
    );
  }
}

componentName.propTypes = {
  item: PropTypes.object.isRequired
};

export default componentName;