import React, {useEffect} from 'react';
import {LogBox} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

import AppNavigator from 'containers/Router';

const App = () => {
  useEffect(() => {
    LogBox.ignoreLogs([
      'Warning: componentWillReceiveProps',
      'Animated: `useNativeDriver`',
    ]);
  }, []);

  return (
    <SafeAreaProvider>
      <BottomSheetModalProvider>
        <AppNavigator />
      </BottomSheetModalProvider>
    </SafeAreaProvider>
  );
};

export default App;
