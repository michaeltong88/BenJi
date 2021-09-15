/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, FlatList, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {BottomSheetModal} from '@gorhom/bottom-sheet';

import {BottomModal, LoadingIndicator} from 'components';
import UserItem from './components/UserItem';
import UserSort from './components/UserSort';
import UserFilter from './components/UserFilter';

import {User} from 'types/User.type';
import {EActionTypes} from 'types/ActionTypes.enum';
import {Styles, Constants} from 'globals';
import {RootState} from 'stores';

const avatarImage = require('assets/imgs/default_avatar.png');

type UsersProps = {
  navigation: StackNavigationProp<any>;
};

const Users = (props: UsersProps) => {
  const {navigation} = props;
  const userState = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  const sortBottomSheetRef = useRef<BottomSheetModal>(null);
  const fileterBottomSheetRef = useRef<BottomSheetModal>(null);
  const offsetRef = useRef(0);

  const [currentUsers, setCurrentUsers] = useState<User[]>([]);
  const [isActiveSubscription, setIsActiveSubscription] = useState(false); // filter
  const [sortWith, setSortWith] = useState(Constants.sorts.name); // sort

  useEffect(() => {
    setNavigationBar();
    dispatch({
      type: EActionTypes.GET_USERS,
      payload: {offset: offsetRef.current},
    });
  }, []);

  useEffect(() => {
    handleSort(sortWith);
    handleFilter(isActiveSubscription);
  }, [userState.users]);

  const setNavigationBar = () => {
    navigation.setOptions({
      title: 'Users',
      headerRight: () => (
        <View style={styles.navBarLeftContainer}>
          <MaterialCommunityIcons
            style={styles.navBarButton}
            name="sort-alphabetical-ascending"
            onPress={() => handleShowSort()}
          />
          <MaterialCommunityIcons
            style={styles.navBarButton}
            name="filter"
            onPress={() => handleShowFilter()}
          />
        </View>
      ),
    });
  };

  const handleShowSort = () => {
    sortBottomSheetRef?.current?.present();
  };

  const handleSort = (value: string) => {
    setSortWith(value);

    const sortedUsers = Object.assign([], userState.users);
    sortedUsers.sort((a: any, b: any) => (a[value] > b[value] ? 1 : -1));

    setCurrentUsers(sortedUsers);
  };

  const handleShowFilter = () => {
    fileterBottomSheetRef?.current?.present();
  };

  const handleFilter = (value: boolean) => {
    setIsActiveSubscription(value);

    if (!value) {
      setCurrentUsers(userState.users);
      return;
    }

    const filterUsers = userState.users.filter(
      (user: User) => user.activeSubscription,
    );

    setCurrentUsers(filterUsers);
  };

  const handleSelect = (user: User) => {
    navigation.navigate('EditUser', {user});
  };

  const handleEndReached = () => {
    if (userState.isFetching || !userState.hasMore) {
      return;
    }

    offsetRef.current += 1;

    dispatch({
      type: EActionTypes.GET_USERS,
      payload: {offset: offsetRef.current},
    });
  };

  const renderBottomSheets = () => (
    <>
      <BottomModal ref={sortBottomSheetRef} height={200} title="Sort">
        <UserSort value={sortWith} onChangeValue={handleSort} />
      </BottomModal>
      <BottomModal ref={fileterBottomSheetRef} height={180} title="Filter">
        <UserFilter value={isActiveSubscription} onToggle={handleFilter} />
      </BottomModal>
    </>
  );

  const renderItem = ({item}: {item: User}) => (
    <UserItem
      {...item}
      avatar={avatarImage}
      onPress={() => handleSelect(item)}
    />
  );

  return (
    <View style={styles.container}>
      <LoadingIndicator isLoading={userState.isFetching} />
      <FlatList
        contentContainerStyle={{
          paddingBottom: Styles.Screen.screenSafeBottomHeight,
        }}
        data={currentUsers || []}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={0.2}
        onEndReached={() => handleEndReached()}
      />
      {renderBottomSheets()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Styles.Color.white,
  },
  navBarLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  navBarButton: {
    fontSize: 28,
    color: Styles.Color.white,
    paddingHorizontal: 10,
  },
});

export default Users;
