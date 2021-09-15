import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Users from './user';
import EditUser from './user/EditUser';

import {Styles} from 'globals';

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: Styles.Color.primary,
  },
  textNavBarTitle: {
    fontWeight: '600',
    fontSize: 20,
    color: Styles.Color.white,
    textTransform: 'capitalize',
  },
});

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

const AppNavigator = () => {
  const MainStackNavigator = () => (
    <MainStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: styles.headerContainer,
        headerTitleStyle: styles.textNavBarTitle,
        headerTintColor: Styles.Color.white,
        headerBackTitleVisible: false,
      }}>
      <MainStack.Screen name="Users" component={Users} />
      <MainStack.Screen name="EditUser" component={EditUser} />
    </MainStack.Navigator>
  );

  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <RootStack.Screen
          name="MainStackScreen"
          component={MainStackNavigator}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
