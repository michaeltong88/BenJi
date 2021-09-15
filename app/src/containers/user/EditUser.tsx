/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {TextField} from 'react-native-material-textfield';
import {Dropdown} from 'react-native-material-dropdown-v2-fixed';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

import {Button, LoadingIndicator} from 'components';

import {User} from 'types/User.type';
import {EActionTypes} from 'types/ActionTypes.enum';
import {Constants, Styles} from 'globals';
import {RootState} from 'stores';
import {usePrevious} from 'hooks';

const avatarImage = require('assets/imgs/default_avatar.png');

type EditUserProps = {
  navigation: StackNavigationProp<any>;
  route: RouteProp<{params: {user: User}}>;
};

const EditUser = (props: EditUserProps) => {
  const {navigation, route} = props;
  const {user} = route.params;

  const isUpdating = useSelector((state: RootState) => state.user.isUpdating);
  const prevProps: any = usePrevious({isUpdating});

  const dispatch = useDispatch();

  const [name, setName] = useState(user.name);
  const [age, setAge] = useState(user.age.toString());
  const [mode, setMode] = useState(user.mode);

  const userRoles: Record<string, string>[] = [];
  Object.keys(Constants.userRole).map(item =>
    userRoles.push({
      value: item,
      label: item.charAt(0).toUpperCase() + item.slice(1),
    }),
  );

  useEffect(() => {
    setNavigationBar();
  }, []);

  useEffect(() => {
    if (prevProps && prevProps.isUpdating && !isUpdating) {
      navigation.goBack();
    }
  }, [isUpdating, prevProps]);

  const setNavigationBar = () => {
    navigation.setOptions({
      title: 'Edit User',
    });
  };

  const handleUploadAvatar = () => {};

  const handleSave = () => {
    dispatch({
      type: EActionTypes.UPDATE_USER,
      payload: {
        ...user,
        name,
        age,
        mode,
      },
    });
  };

  return (
    <View style={styles.container}>
      <LoadingIndicator isLoading={isUpdating} />
      <KeyboardAvoidingView>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => handleUploadAvatar()}>
          <FastImage style={styles.imageAvatar} source={avatarImage} />
        </TouchableOpacity>
        <TextField
          baseColor={Styles.Color.gray}
          tintColor={Styles.Color.gray}
          textColor={Styles.Color.black}
          activeLineWidth={1}
          autoCorrect={false}
          autoCapitalize="none"
          label="Name"
          value={name}
          returnKeyType="next"
          onChangeText={setName}
        />
        <TextField
          baseColor={Styles.Color.gray}
          tintColor={Styles.Color.gray}
          textColor={Styles.Color.black}
          activeLineWidth={1}
          autoCorrect={false}
          keyboardType="numeric"
          autoCapitalize="none"
          label="Age"
          value={age}
          returnKeyType="next"
          onChangeText={setAge}
        />
        <Dropdown
          style={styles.dropDownContainer}
          baseColor="transparent"
          iconColor={Styles.Color.gray}
          label="Role"
          value={mode}
          data={userRoles}
          onChangeText={setMode}
        />
      </KeyboardAvoidingView>
      <Button
        style={styles.saveButton}
        label="Save"
        onPress={() => handleSave()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: Styles.Color.white,
  },
  imageAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginVertical: 20,
  },
  dropDownContainer: {
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
  },
  saveButton: {
    marginVertical: 20,
  },
});

export default EditUser;
