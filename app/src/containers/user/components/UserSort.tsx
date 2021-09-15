import React from 'react';
import {StyleSheet, View, StyleProp, ViewStyle} from 'react-native';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';

import {Styles, Constants} from 'globals';

type UserSortProps = {
  style?: StyleProp<ViewStyle>;
  value: string;
  onChangeValue: (value: string) => void;
};

const UserSort = (props: UserSortProps) => {
  const {style, value, onChangeValue} = props;

  const radioStyle = {
    color: Styles.Color.primary,
    borderColor: Styles.Color.primary,
    containerStyle: styles.redioItemContainer,
    labelStyle: styles.textName,
  };

  const sortOptions = [
    {
      id: '1',
      label: 'Name',
      selected: value === Constants.sorts.name,
      value: Constants.sorts.name,
      ...radioStyle,
    },
    {
      id: '2',
      label: 'Age',
      selected: value === Constants.sorts.age,
      value: Constants.sorts.age,
      ...radioStyle,
    },
  ];

  const handleValue = (items: RadioButtonProps[]) => {
    const radioButton = items.find((item: RadioButtonProps) => item.selected);
    onChangeValue(radioButton?.value ?? '');
  };

  return (
    <View
      style={[
        styles.container,
        style,
        {marginBottom: Styles.Screen.screenSafeBottomHeight ?? 0},
      ]}>
      <RadioGroup
        containerStyle={styles.readioGroupContainer}
        radioButtons={sortOptions}
        onPress={handleValue}
      />
    </View>
  );
};

UserSort.defaultProps = {
  style: {},
};

export default UserSort;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  readioGroupContainer: {
    width: '100%',
    alignItems: 'flex-start',
  },
  redioItemContainer: {
    width: '100%',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  textName: {
    fontSize: 17,
    fontWeight: '600',
    color: Styles.Color.dark,
    marginLeft: 0,
  },
});
