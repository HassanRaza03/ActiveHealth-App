import {View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {Colors, Fonts} from '../../theme';
import Button from '../Button';
import styles from './styles';
import Text from '../Text';

export default function ExitModal(props) {
  const {
    isModalVisible,
    onSubmit,
    setModalVisibility,
    title = 'Do you wish to exit the Survey',
    description = 'All data will be lost if you exit the survey.',
  } = props;
  return (
    <Modal
      visible={isModalVisible}
      style={{
        zIndex: 1,
        width: '100%',
        alignSelf: 'center',
        backgroundColor: 'rgba(30,30,30,0.4)',
      }}
      onBackdropPress={() => {
        setModalVisibility(false);
      }}>
      <View
        style={{
          alignSelf: 'center',
          width: 300,
          height: 290,
          borderRadius: 20,
          backgroundColor: Colors.white,
          padding: 20,
          alignItems: 'center',
        }}>
        <Text
          color={Colors.black}
          type={Fonts.type.base}
          style={{
            color: Colors.black,
            textAlign: 'center',
            fontSize: 20,
            fontWeight: '600',
          }}>
          {title}
        </Text>
        <Text
          color={Colors.black}
          type={Fonts.type.base}
          style={{
            color: Colors.black,
            textAlign: 'center',
            fontSize: 14,
            fontWeight: '400',
            marginTop: 20,
            width: '70%',
          }}>
          {description}
        </Text>
        <Button
          onPress={() => {
            onSubmit();
          }}
          type={Fonts.type.base}
          style={styles.YesBtn}
          textStyle={styles.YesTxt}>
          YES
        </Button>
        <Button
          type={Fonts.type.base}
          onPress={() => {
            setModalVisibility(false);
          }}
          style={styles.noBtn}
          textStyle={styles.noTxt}>
          NO
        </Button>
      </View>
    </Modal>
  );
}
