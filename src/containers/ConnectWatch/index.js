import {View, Image, Linking, ActivityIndicator} from 'react-native';
import Modal from 'react-native-modal';
import React, {useEffect, useState, useCallback} from 'react';
import {Colors, Images, Fonts, AppStyles} from '../../theme';
import {
  ButtonView,
  Text,
  CustomNavbar,
  Garmin,
  Button,
  ExitModal,
} from '../../components';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import {useSelector, useDispatch} from 'react-redux';
import {
  userSignUp,
  getFitbitProfileRequest,
  setUserFitBitDataRequest,
  getUserDataRequest,
  deleteUserFitBitDataRequest,
  getSleepGoalDataRequest,
  getSleepDataRequest,
  getAllGoalsActivityRequest,
  getSPO2DataRequest,
  getBrDataRequest,
  deleteGarminUserRequest,
} from '../../redux/slicers/user';
import qs from 'qs';
import {FIT_BIT_SCOPES, fitBitConfig} from '../../constants';
import util from '../../util';

export default function ConnectWatch({route}) {
  const navigate = useNavigation();
  const {isHome} = route.params || {};
  const dispatch = useDispatch();
  const [isFitBitLoading, setIsFitBitLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isGarminLoading, setIsGarminLoading] = useState(false);
  const user = useSelector(state => state?.user?.data?.user);
  const fitBitConnected = useSelector(state => state?.user?.fitBitConnected);
  const garminConnected = useSelector(state => state?.user?.garminConnected);
  const userGarmin = useSelector(({user}) => user?.data?.user?.garmin);

  useEffect(() => {
    dispatch(userSignUp(false));
  });

  function OAuth(client_id, cb) {
    setIsFitBitLoading(true);
    let abc = Linking.addEventListener('url', handleUrl);
    function handleUrl(event) {
      abc.remove();
      const [, query_string] = event.url.match(/\#(.*)/);
      const query = qs.parse(query_string);
      console.log('query =>', query);
      const {access_token, user_id, scope} = query;
      cb(access_token, user_id, scope);
    }
    const oauthurl = `https://www.fitbit.com/oauth2/authorize?${qs.stringify({
      client_id,
      response_type: 'token',
      scope: FIT_BIT_SCOPES,
      redirect_uri: 'active-points://active',
      expires_in: '31536000',
      prompt: 'login consent',
    })}`;
    Linking.openURL(oauthurl).catch(err =>
      console.error('Error processing linking', err),
    );
  }

  async function getData(access_token, user_id, scope) {
    const granted_scopes = scope?.split(' ');
    const requested_scopes = FIT_BIT_SCOPES?.split(' ');
    granted_scopes?.sort();
    requested_scopes?.sort();

    const all_scopes_granted =
      requested_scopes?.length == granted_scopes?.length &&
      requested_scopes.every(function (element, index) {
        return element === granted_scopes[index];
      });
    console.log('all_scopes_granted => ', all_scopes_granted);
    if (!all_scopes_granted) {
      setIsFitBitLoading(false);
      util.topAlertError('All permissions are required to connect to fitbit.');
      navigate.goBack();
    } else if (access_token && user_id) {
      const payload = {token: access_token, user: user_id};
      dispatch(
        getFitbitProfileRequest({
          payloadData: payload,
          responseCallback: (status, profileData) => {
            const payloadInner = {
              data: {
                token: access_token,
                user_profile: profileData.user,
                user: user.id,
              },
            };
            dispatch(
              setUserFitBitDataRequest({
                payloadData: payloadInner,
                responseCallback: () => {
                  dispatch(
                    getUserDataRequest({
                      payloadData: {},
                      responseCallback: () => {
                        getSleepData(access_token);
                        // setIsFitBitLoading(false);
                        // navigate.goBack();
                      },
                    }),
                  );
                },
              }),
            );
          },
        }),
      );
    } else {
      setIsFitBitLoading(false);
      // util.topAlertError(ERROR_SOMETHING_WENT_WRONG.message);
      navigate.goBack();
    }
  }

  const getSleepData = useCallback(
    access_token => {
      const sleepTokenPayload = {token: access_token};

      dispatch(
        getSleepGoalDataRequest({
          payloadData: sleepTokenPayload,
          responseCallback: () => {
            dispatch(
              getSleepDataRequest({
                payloadData: sleepTokenPayload,
                responseCallback: () => {
                  dispatch(
                    getAllGoalsActivityRequest({
                      payloadData: sleepTokenPayload,
                      responseCallback: () => {
                        dispatch(
                          getSPO2DataRequest({
                            payloadData: sleepTokenPayload,
                            responseCallback: () => {
                              dispatch(
                                getBrDataRequest({
                                  payloadData: sleepTokenPayload,
                                  responseCallback: () => {
                                    setIsFitBitLoading(false);
                                    navigate.goBack();
                                  },
                                }),
                              );
                            },
                          }),
                        );
                      },
                    }),
                  );
                },
              }),
            );
          },
        }),
      );
    },
    [dispatch, navigate],
  );
  function disconnectDevicesFitbit() {
    showModal && setShowModal(false);
    setIsFitBitLoading(true);
    const payload = {
      fitBitId: user?.fitbit?.id,
    };
    dispatch(
      deleteUserFitBitDataRequest({
        payloadData: payload,
        responseCallback: status => {
          if (status) {
            dispatch(
              getUserDataRequest({
                payloadData: {},
                responseCallback: () => {
                  setIsFitBitLoading(false);
                  navigate.goBack();
                },
              }),
            );
          } else {
            setIsFitBitLoading(false);
          }
        },
      }),
    );
  }

  const disconnectGarmin = () => {
    showModal && setShowModal(false);
    setIsGarminLoading(true);
    const payloadData = {
      id: `${userGarmin?.id}`,
    };

    dispatch(
      deleteGarminUserRequest({
        payloadData,
        responseCallback: status => {
          setIsGarminLoading(false);
          if (status) {
            navigate.goBack();
          }
        },
      }),
    );
  };

  const renderModal = () => {
    return (
      <ExitModal
        isModalVisible={showModal}
        setModalVisibility={setShowModal}
        title={'Disconnect Device'}
        description="Are you sure you want to disconnect ?"
        onSubmit={() => {
          fitBitConnected && disconnectDevicesFitbit();
          garminConnected && disconnectGarmin();
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <CustomNavbar
        hasBorder={false}
        title={'Connect Watch'}
        titleColor={Colors.white}
        rightBtnText={isHome ? '' : 'Skip'}
        leftBtnPress={() => isHome && navigate.goBack()}
        leftBtnImage={isHome ? Images.backIcon : {}}
        rightBtnPress={() =>
          !isHome &&
          navigate.reset({
            index: 0,
            routes: [{name: 'HomeTab'}],
          })
        }
      />
      <Image
        style={{alignSelf: 'center', height: 250, width: 250}}
        source={Images.connection}
      />
      <View style={AppStyles.mTop40}>
        <Text
          type={Fonts.type.base}
          style={{color: Colors.white, fontSize: 16, fontWeight: '500'}}>
          Search Devices
        </Text>
        <ButtonView
          onPress={() =>
            !isFitBitLoading &&
            !isGarminLoading &&
            !garminConnected &&
            (fitBitConnected
              ? setShowModal(true)
              : // ? disconnectDevicesFitbit()
                OAuth(fitBitConfig.client_id, getData))
          }
          activeOpactiy={garminConnected ? 0.3 : 1}
          disabled={garminConnected}
          style={styles.btnView}>
          <View style={styles.deviceIconVIew}>
            <Image source={Images.fitbitIcon} />
          </View>
          <Text color={Colors.black} type={Fonts.type.base} style={styles.txt}>
            {fitBitConnected ? 'Disconnect Fitbit' : 'Connect with Fitbit'}
          </Text>
          {isFitBitLoading ? (
            <ActivityIndicator size={'large'} color={'white'} />
          ) : (
            <Image source={Images.forwordIcon} />
          )}
        </ButtonView>
        <Garmin
          handleSuccess={() => {}}
          fitBitConnected={fitBitConnected}
          garminConnected={garminConnected}
          setShowModal={setShowModal}
          garminLoading={isGarminLoading}
          isFitBitLoading={isFitBitLoading}
          setGarminLoading={setIsGarminLoading}
        />
        {/* <ButtonView
          activeOpacity={fitBitConnected ? 1 : 0.7}
          style={[styles.btnView]}>
          <View style={styles.deviceIconVIew}>
            <Image source={Images.garminIcon} />
          </View>
          <Text color={Colors.black} type={Fonts.type.base} style={styles.txt}>
            Connect with Garmin
          </Text>
          <Image source={Images.forwordIcon} />
        </ButtonView> */}
      </View>

      {renderModal()}
    </View>
  );
}
