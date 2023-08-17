import {View, Image, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Switch} from 'react-native-switch';
import styles from './styles';
import {ButtonView, CustomNavbar, Text} from '../../components';
import {Colors, Fonts, Images} from '../../theme';
import {useDispatch, useSelector} from 'react-redux';
import {
  getUserDataRequest,
  setToken,
  updateProfileRequest,
} from '../../redux/slicers/user';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import util, {logoutUser} from '../../util';
import {ERROR_SOMETHING_WENT_WRONG} from '../../config/WebService';

export default function Profile() {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user?.data?.user);
  const [notiSwitch, setNotiSwitch] = useState(
    user?.enable_notification ?? false,
  );
  const isFocused = useIsFocused();

  useEffect(() => {
    dispatch(
      getUserDataRequest({
        payloadData: {},
        responseCallback: () => {},
      }),
    );
  }, [dispatch, isFocused]);

  const handleChangeSwitch = notification_enabled => {
    setNotiSwitch(notification_enabled);
    dispatch(
      updateProfileRequest({
        payloadData: {
          isNotifUpdate: true,
          notification_enabled: notification_enabled,
        },
        responseCallback: (status, message) => {
          if (status) {
            dispatch(
              getUserDataRequest({payloadData: {}, responseCallback: () => {}}),
            );
            util.topAlert(message ?? 'Notification updated successfully.');
          } else {
            setNotiSwitch(!notification_enabled);
          }
        },
      }),
    );
  };

  return (
    <View style={styles.container}>
      <CustomNavbar
        hasBorder={false}
        style={{backgroundColor: Colors.transparent}}
        title="Profile"
        rightBtnImage={Images.EditIcon}
        rightBtnPress={() => navigate.navigate('editProfile')}
      />

      <View style={styles.profileView}>
        <ActivityIndicator
          color={Colors.background.primary}
          style={{position: 'absolute'}}
        />
        <Image
          style={{height: 130, width: 130, borderRadius: 80, zIndex: 10}}
          resizeMode="cover"
          source={
            user?.photo?.url ? {uri: user?.photo?.url} : Images.profileImage2
          }
        />
      </View>

      <Text color={Colors.black} type={Fonts.type.base} style={styles.nameTxt}>
        {user?.full_name}
      </Text>
      <Text color={Colors.black} type={Fonts.type.base} style={styles.emailTxt}>
        {user?.email}
      </Text>

      <ButtonView
        onPress={() => navigate.navigate('changePassword')}
        style={styles.channgeView}>
        <View style={styles.iconView}>
          <Image style={{width: 19, height: 26}} source={Images.passwordIcon} />
        </View>
        <Text
          color={Colors.black}
          type={Fonts.type.base}
          style={styles.changeTxt}>
          Change Password
        </Text>
      </ButtonView>
      <View style={styles.channgeView}>
        <View style={styles.iconView}>
          <Image source={Images.notificationIconProfile} />
        </View>
        <Text
          color={Colors.black}
          type={Fonts.type.base}
          style={styles.changeTxt}>
          Notification
        </Text>
        <Switch
          value={notiSwitch}
          onValueChange={() => handleChangeSwitch(!notiSwitch)}
          backgroundActive={'#AF36DA'}
          circleActiveColor={'#F7F8FC'}
          circleInActiveColor={'#AF36DA'}
          backgroundInactive={'#F7F8FC'}
          renderActiveText={false}
          renderInActiveText={false}
          barHeight={25}
          circleSize={20}
          circleBorderActiveColor={'#AF36DA'}
          circleBorderInactiveColor={'#AF36DA'}
        />
      </View>
      <ButtonView
        onPress={() => {
          navigate.reset({
            index: 0,
            routes: [{name: 'login'}],
          });
          // dispatch(setToken(''));
          logoutUser();
        }}
        style={styles.logoutBtn}>
        <Text type={Fonts.type.base} style={styles.logoutTxt}>
          LOGOUT
        </Text>
      </ButtonView>
    </View>
  );
}
