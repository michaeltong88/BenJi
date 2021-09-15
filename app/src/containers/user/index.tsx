/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, FlatList, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {BottomSheetModal} from '@gorhom/bottom-sheet';

import {BottomModal} from 'components';
import UserItem from './components/UserItem';
import UserSort from './components/UserSort';
import UserFilter from './components/UserFilter';

import {User} from 'types/User.type';
import {Styles, Constants} from 'globals';

const avatarImage = require('assets/imgs/default_avatar.png');

const UsersList: User[] = [
  {_id: 0, name: 'Vasilis', mode: 'user', age: 29, activeSubscription: true},
  {_id: 1, name: 'Nikos', mode: 'doctor', age: 30, activeSubscription: true},
  {_id: 2, name: 'Adam', mode: 'doctor', age: 25, activeSubscription: false},
  {_id: 3, name: 'Elijah', mode: 'user', age: 20, activeSubscription: false},
  {_id: 4, name: 'vasilis', mode: 'user', age: 15, activeSubscription: true},
  {_id: 5, name: 'Edison', mode: 'tester', age: 18, activeSubscription: true},
  {_id: 6, name: 'Lu', mode: 'user', age: 40, activeSubscription: false},
  {_id: 7, name: 'Jessy', mode: 'user', age: 50, activeSubscription: false},
  {_id: 8, name: 'John', mode: 'user', age: 45, activeSubscription: true},
  {_id: 9, name: 'Murti', mode: 'admin', age: 65, activeSubscription: true},
  {_id: 10, name: 'bill', mode: 'tester', age: 18, activeSubscription: true},
  {_id: 11, name: 'Amanda', mode: 'user', age: 40, activeSubscription: false},
  {_id: 12, name: 'no name', mode: 'user', age: 50, activeSubscription: false},
  {_id: 13, name: 'Adrian', mode: 'user', age: 45, activeSubscription: true},
  {_id: 14, name: 'Liang', mode: 'admin', age: 65, activeSubscription: true},
];

type UsersProps = {
  navigation: StackNavigationProp<any>;
};

const Users = (props: UsersProps) => {
  const {navigation} = props;

  const sortBottomSheetRef = useRef<BottomSheetModal>(null);
  const fileterBottomSheetRef = useRef<BottomSheetModal>(null);

  const [users, setUsers] = useState(UsersList);
  const [isActiveSubscription, setIsActiveSubscription] = useState(false); // filter
  const [sortWith, setSortWith] = useState(Constants.sorts.name); // sort

  useEffect(() => {
    setNavigationBar();
  }, []);

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

    const sortedUsers = Object.assign([], UsersList);
    sortedUsers.sort((a, b) => (a[value] > b[value] ? 1 : -1));

    setUsers(sortedUsers);
  };

  const handleShowFilter = () => {
    fileterBottomSheetRef?.current?.present();
  };

  const handleFilter = (value: boolean) => {
    setIsActiveSubscription(value);

    if (!value) {
      setUsers(UsersList);
      return;
    }

    const filterUsers = UsersList.filter(
      (user: User) => user.activeSubscription,
    );

    setUsers(filterUsers);
  };

  const handleSelect = (user: User) => {
    navigation.navigate('EditUser', {user});
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
      <FlatList
        contentContainerStyle={{
          paddingBottom: Styles.Screen.screenSafeBottomHeight,
        }}
        data={users || []}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
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
