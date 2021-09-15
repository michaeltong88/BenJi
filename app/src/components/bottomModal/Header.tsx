import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Styles} from 'globals';

type HeaderProps = {
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  title: string;
  onClose?: () => void;
};

const Header = (props: HeaderProps) => {
  const {style, titleStyle, title, onClose} = props;

  return (
    <View style={[styles.container, style]}>
      <View
        style={[
          styles.mainContainer,
          title
            ? styles.contentWithTitleContainer
            : styles.contentWithNoTitleContainer,
        ]}>
        <Text style={[styles.textTitle, titleStyle]}>{title}</Text>
        <TouchableOpacity
          style={styles.closeButton}
          activeOpacity={0.8}
          onPress={() => onClose && onClose()}>
          <MaterialCommunityIcons style={styles.iconClose} name="close" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

Header.defaultProps = {
  style: {},
  title: '',
  textStyle: {},
  onClose: () => {},
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Styles.Color.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  mainContainer: {
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentWithNoTitleContainer: {
    marginVertical: 8,
  },
  contentWithTitleContainer: {
    marginVertical: 16,
  },
  textTitle: {
    fontWeight: 'bold',
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: 0.35,
    color: Styles.Color.primary,
  },
  closeButton: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
  },
  iconClose: {
    fontSize: 24,
    color: Styles.Color.dark,
  },
});
