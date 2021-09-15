import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

export const wp = (value: string | number) => {
  return Math.floor(widthPercentageToDP(value));
};

export const hp = (value: string | number) => {
  return Math.floor(heightPercentageToDP(value));
};
