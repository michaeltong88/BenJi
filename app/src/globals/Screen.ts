import {Dimensions} from 'react-native';
import {initialWindowMetrics} from 'react-native-safe-area-context';

const {width, height} = Dimensions.get('window');

const screenWidth = Math.round(width);
const screenHeight = Math.round(height);
let screenSafeTopHeight = initialWindowMetrics?.insets?.top;
let screenSafeBottomHeight = initialWindowMetrics?.insets?.bottom;

export default {
  screenWidth,
  screenHeight,
  screenSafeTopHeight,
  screenSafeBottomHeight,
};
