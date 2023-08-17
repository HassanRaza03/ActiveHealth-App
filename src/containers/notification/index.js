import {View, FlatList, Image, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {ButtonView, Text, CustomNavbar} from '../../components';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  getNotificationClearRequest,
  notificationsListRequest,
} from '../../redux/slicers/gerenal';
import moment from 'moment';

export default function Notification() {
  const nagivate = useNavigation();
  const dispatch = useDispatch();
  const {notificationList} = useSelector(state => state.gerenal);
  const user = useSelector(state => state?.user?.data?.user);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(
      notificationsListRequest({
        payloadData: {
          userId: user?.id,
        },
        responseCallback: (ok, res) => {
          setLoading(false);
        },
      }),
    );

    dispatch(
      getNotificationClearRequest({
        payloadData: {
          userId: user?.id,
        },
        responseCallback: () => {},
      }),
    );
  }, []);

  return (
    <View style={styles.container}>
      <CustomNavbar
        hasBorder={false}
        title="Notification"
        leftBtnPress={() => nagivate.goBack()}
        leftBtnImage={Images.backIconBlack}
      />

      <FlatList
        data={notificationList}
        style={{backgroundColor: Colors.white, marginTop: 20, marginBottom: 20}}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => {
          return (
            <View style={AppStyles.centerInner}>
              {loading ? (
                <ActivityIndicator color={'#000'} />
              ) : (
                <Text
                  type={Fonts.type.base}
                  color="#000"
                  style={{fontWeight: 300}}>
                  No Notification
                </Text>
              )}
            </View>
          );
        }}
        renderItem={({item, index}) => {
          return (
            <View style={{}}>
              <ButtonView
                onPress={() =>
                  nagivate.navigate('individualSurvey', {
                    surveyId: item?.attributes?.survey?.data?.id,
                    notificationId: item?.id,
                  })
                }
                style={[
                  {
                    minHight: 60,
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                  },
                  !item?.attributes?.isRead
                    ? {backgroundColor: 'rgba(178, 0, 0, 0.05)'}
                    : {},
                ]}>
                <Image source={Images.fireIcon} />
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      marginLeft: 10,

                      maxWidth: '80%',
                    }}>
                    <Text
                      color={Colors.black}
                      type={Fonts.type.base}
                      style={{
                        color: Colors.black,
                        fontSize: 14,
                        fontWeight: '400',
                        flex: 1,
                        flexWrap: 'wrap',
                        flexShrink: 1,
                      }}>
                      {item?.attributes?.survey?.data?.attributes?.title}
                    </Text>
                    <Text
                      color={Colors.black}
                      type={Fonts.type.base}
                      style={{
                        color: 'rgba(119, 119, 119, 1)',
                        fontSize: 12,
                        fontWeight: '400',
                        flex: 1,
                        flexWrap: 'wrap',
                      }}>
                      {item?.attributes?.description}
                    </Text>
                  </View>
                  <View>
                    <Text size={14} color={Colors.black} type={Fonts.type.base}>
                      {moment(item?.attributes?.createdAt).format('hh:mm a')}
                    </Text>
                  </View>
                </View>
              </ButtonView>
              <View
                style={{
                  backgroundColor: 'rgba(242, 244, 245, 1)',
                  height: 1,
                  width: '95%',
                  alignSelf: 'center',
                  marginBottom: 15,
                }}
              />
            </View>
          );
        }}
      />
    </View>
  );
}
