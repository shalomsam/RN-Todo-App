import React from 'react';
import {
  View, Text, StatusBar,
} from 'react-native';
import PropTypes from 'prop-types';
import { styles, colors } from '../../utils/styles';

class Header extends React.PureComponent {
  renderStatusbar = (statusBarColor = colors.primary) => (
    <View
      style={{
        height: styles.statusBarHeight,
      }}
    >
      <StatusBar barStyle="light-content" backgroundColor={statusBarColor} />
    </View>
  );

  render() {
    const {
      style,
      textStyle,
      title,
      statusBarColor,
      backgroundColor,
      iconLeft,
      iconRight,
    } = this.props;

    const headerDefault = {
      ...styles.header,
      backgroundColor: backgroundColor,
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
