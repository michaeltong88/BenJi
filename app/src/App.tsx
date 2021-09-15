import React, {useEffect} from 'react';
import {LogBox} from 'react-native';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

import AppNavigator from 'containers/Router';

import store from 'stores';
import {initAxios} from 'stores/api';

const App = () => {
  useEffect(() => {
    LogBox.ignoreLogs([
      'Warning: componentWillReceiveProps',
      'Animated: `useNativeDriver`',
    ]);

    initAxios();
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <BottomSheetModalProvider>
          <AppNavigator />
        </BottomSheetModalProvider>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
