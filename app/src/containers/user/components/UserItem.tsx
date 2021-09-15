import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {User} from 'types/User.type';
import {Styles} from 'globals';

type UserItemProps = {
  style: StyleProp<ViewStyle>;
  avatar: number;
  onPress: () => void;
};

const UserItem = (props: UserItemProps & User) => {
  const {style, avatar, name, age, onPress} = props;
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      activeOpacity={0.8}
      onPress={() => onPress()}>
      <FastImage style={styles.imageAvatar} source={avatar} />
      <View style={styles.contentContainer}>
        <Text style={styles.textName}>{name}</Text>
        <Text style={styles.textAge}>{age} Years old</Text>
      </View>
      <MaterialCommunityIcons
        name="chevron-right"
        color={Styles.Color.gray}
        size={28}
      />
    </TouchableOpacity>
  );
};

UserItem.defaultProps = {
  style: {},
  onPress: () => {},
};

export default UserItem;

const styles = StyleSheet.create({
  container: {
    height: 70,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Styles.Color.white,
    borderBottomWidth: 1,
    borderBottomColor: Styles.Color.softGray,
    paddingLeft: 16,
    paddingRight: 10,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  textName: {
    fontSize: 17,
    lineHeight: 26,
    fontWeight: 'bold',
    color: Styles.Color.black,
    textTransform: 'capitalize',
  },
  textAge: {
    fontSize: 14,
    lineHeight: 24,
    color: Styles.Color.dark,
  },
  imageAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
