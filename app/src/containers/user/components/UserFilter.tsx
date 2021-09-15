import React from 'react';
import {
  Text,
  Switch,
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {Styles} from 'globals';

type UserFilterProps = {
  style?: StyleProp<ViewStyle>;
  value: boolean;
  onToggle?: (value: boolean) => void;
};

const UserFilter = (props: UserFilterProps) => {
  const {style, value, onToggle} = props;
  return (
    <View
      style={[
        styles.container,
        style,
        {marginBottom: Styles.Screen.screenSafeBottomHeight ?? 0},
      ]}>
      <Text style={styles.textName}>Active Subscription </Text>
      <Switch
        trackColor={{
          true: Styles.Color.primary,
        }}
        ios_backgroundColor={Styles.Color.white}
        onValueChange={onToggle}
        value={value}
      />
    </View>
  );
};

UserFilter.defaultProps = {
  style: {},
};

export default UserFilter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  textName: {
    fontSize: 17,
    fontWeight: '600',
    color: Styles.Color.dark,
    textTransform: 'capitalize',
  },
});
