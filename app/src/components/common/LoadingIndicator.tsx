import React from 'react';
import {
  View,
  StyleProp,
  ViewStyle,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import {Styles} from 'globals';

type LoadingIndicatorProps = {
  style?: StyleProp<ViewStyle>;
  isLoading?: boolean;
};

const LoadingIndicator = (props: LoadingIndicatorProps) => {
  const {isLoading, style} = props;

  if (!isLoading) {
    return null;
  }

  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={'large'} color={Styles.Color.primary} />
    </View>
  );
};

LoadingIndicator.defaultProps = {
  style: {},
  isLoading: false,
};

export default LoadingIndicator;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000020',
    zIndex: 999,
  },
  iconLoadinng: {
    width: 100,
    height: 100,
  },
});
