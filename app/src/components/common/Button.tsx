import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

import {Styles} from 'globals';

type ButtonProps = {
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  label: string;
  disabled?: boolean;
  onPress?: () => void;
};

const Button = (props: ButtonProps) => {
  const {style, labelStyle, label, disabled, onPress} = props;

  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  const color = disabled ? Styles.Color.gray : Styles.Color.white;

  return (
    <TouchableOpacity
      style={[styles.container, {borderColor: color}, style]}
      activeOpacity={0.9}
      disabled={disabled}
      onPress={() => handlePress()}>
      <Text style={[styles.textLabel, {color: color}, labelStyle]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: Styles.Color.primary,
  },
  textLabel: {
    fontSize: 18,
    color: Styles.Color.white,
  },
});
