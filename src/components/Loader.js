import {ActivityIndicator, Modal, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../theme/colors';

const Loader = ({visible}) => {
  return (
    <Modal visible={visible} transparent>
      <View style={styles.container}>
        <ActivityIndicator size={'large'} color={colors.primary} />
      </View>
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
