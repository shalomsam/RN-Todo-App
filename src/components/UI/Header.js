import React from 'react';
import {
  View, Text, StatusBar,
} from 'react-native';
import PropTypes from 'prop-types';
import { styles, colors } from '../../utils/styles';

class Header extends React.PureComponent {
  renderStatusbar = backgroundColor => (
    <View
      style={{
        height: styles.statusBarHeight, backgroundColor,
      }}
    >
      <StatusBar barStyle="light-content" backgroundColor={backgroundColor} />
    </View>
  );

  render() {
    const {
      style,
      textStyle,
      title,
      backgroundColor,
      iconLeft,
      iconRight,
    } = this.props;
    const statusBarColor = backgroundColor || colors.primary;
    const headerDefault = {
      ...styles.header,
      backgroundColor: statusBarColor,
    };

    return (
      <View>
        {this.renderStatusbar(statusBarColor)}
        <View
          style={
            style
              ? [headerDefault, style]
              : headerDefault}
        >
          { iconLeft || null }
          <Text
            style={
              textStyle
                ? [styles.headerText, textStyle]
                : styles.headerText}
          >
            { title }
          </Text>
          { iconRight || null }
        </View>
      </View>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  style: PropTypes.object,
  textStyle: PropTypes.object,
  backgroundColor: PropTypes.string,
  iconLeft: PropTypes.element,
  iconRight: PropTypes.element,
};

export default Header;
