import React from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import { buttons, colors } from '../../utils/styles';

export default class Buttons extends React.PureComponent {
  renderBtnContent = () => {
      const {
          title,
          prependIcon,
          appendIcon,
          type,
          textStyle,
      } = this.props;
      const btnStyle = type || 'primary';
      // eslint-disable-next-line no-nested-ternary
      const txtStyle = textStyle || (btnStyle === 'default' ? buttons.textDark : (btnStyle === 'link' ? buttons.textLink : buttons.textLight));
      return (
          <View>
              {prependIcon || null}
              <Text style={txtStyle}>{title}</Text>
              {appendIcon || null}
          </View>
      );
  }

  render() {
      const {
          type,
          style,
          onPress,
          isLoading,
      } = this.props;
      const btnStyle = type || (isLoading ? 'default' : 'primary');

      const content = isLoading
          ? <ActivityIndicator size="small" color={colors.darkGrey} />
          : this.renderBtnContent();

      return (
          <TouchableOpacity
              onPress={onPress}
              style={[buttons[btnStyle], style]}
          >
              {content}
          </TouchableOpacity>
      );
  }
}

Buttons.propTypes = {
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'link', 'default']),
    style: PropTypes.object,
    textStyle: PropTypes.object,
    onPress: PropTypes.func.isRequired,
    prependIcon: PropTypes.element,
    appendIcon: PropTypes.element,
    isLoading: PropTypes.bool,
};
