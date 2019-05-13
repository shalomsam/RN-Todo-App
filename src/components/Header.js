import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { styles as GlobalStyles } from '../utils/styles'

export const Header = (props) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{props.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: Constants.statusBarHeight,
    height: 40,
    justifyContent: 'center',
    alignContent: 'center'
  },
  headerText: {
    fontSize: GlobalStyles.fontSize,
    color: GlobalStyles.fontColor,
    fontWeight: '800',
    textAlign: 'center',
  }
});
