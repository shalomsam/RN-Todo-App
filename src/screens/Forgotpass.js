import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import Header from '../components/UI/Header';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const Forgotpass = () => (
  <View style={styles.container}>
    <Header title="Forgot Password" />
  </View>
);

export default Forgotpass;
