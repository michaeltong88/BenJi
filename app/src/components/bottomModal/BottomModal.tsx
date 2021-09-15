import React from 'react';
import {StyleSheet, StyleProp, ViewStyle, TextStyle} from 'react-native';
import {BottomSheetModal, BottomSheetBackdrop} from '@gorhom/bottom-sheet';

import Header from './Header';

import {Styles} from 'globals';

type BottomModalProps = {
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  title: string;
  height: number;
  children: React.ReactElement;
  onClose?: () => void;
};

const BottomModal = React.forwardRef((props: BottomModalProps, ref: any) => {
  const {titleStyle, height, title, children, onClose} = props;

  const handleClose = () => {
    ref?.current?.dismiss();
  };

  return (
    <BottomSheetModal
      ref={ref}
      handleIndicatorStyle={styles.bottomSheetHandleIndicator}
      backdropComponent={backDropProps => (
        <BottomSheetBackdrop
          {...backDropProps}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          pressBehavior="none"
        />
      )}
      snapPoints={[height + (Styles.Screen.screenSafeBottomHeight ?? 0)]}
      onDismiss={() => onClose}>
      <Header
        title={title}
        titleStyle={titleStyle}
        onClose={() => handleClose()}
      />
      {children}
    </BottomSheetModal>
  );
});

BottomModal.defaultProps = {
  title: '',
  titleStyle: {},
  onClose: () => {},
};

export default BottomModal;

const styles = StyleSheet.create({
  bottomSheetHandleIndicator: {
    width: 30,
    height: 5,
    borderRadius: 3,
  },
});
