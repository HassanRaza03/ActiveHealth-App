import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import {WebView} from 'react-native-webview';
import querystring from 'querystring';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

// import {OAUTH_ROOT, GARMIN} from 'configs/api';
// import {useConnectGarmin} from 'hooks/garmin';
import Loading from './Loading';
import {useConnectGarmin} from '../../hooks/useConnectGarmin';
import {GARMIN, OAUTH_ROOT} from '../../config/WebService';
import ButtonView from '../ButtonView';
import {Colors, Fonts, Images} from '../../theme';
import {useDispatch, useSelector} from 'react-redux';
import {deleteGarminUserRequest} from '../../redux/slicers/user';
import {useNavigation} from '@react-navigation/native';

const Garmin = ({
  handleSuccess,
  fitBitConnected,
  garminConnected,
  setShowModal,
  garminLoading,
  isFitBitLoading,
  setGarminLoading,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigation();
  const {bottom} = useSafeAreaInsets();
  const [visible, setVisible] = useState(false);
  const [isGarminLoading, setIsGarminLoading] = useState(false);
  const userGarmin = useSelector(({user}) => user?.data?.user?.garmin);

  const {
    data,
    token,
    doRequest,
    doAccess,
    setState,
    loadingRequest,
    prevLoadingRequest,
    successRequest,
    loadingAccess,
    prevLoadingAccess,
    successAccess,
    getGarminUserInfo,
    createGarmin,
  } = useConnectGarmin(setIsGarminLoading);

  const onHide = () => setVisible(false);

  useEffect(() => {
    if (prevLoadingRequest && !loadingRequest) {
      if (successRequest) {
        setVisible(true);
        setIsGarminLoading(true);
        setGarminLoading(true);
      }
    }
  }, [loadingRequest, prevLoadingRequest]);

  useEffect(() => {
    if (prevLoadingAccess && !loadingAccess) {
      if (successAccess) {
        setIsGarminLoading(true);
        setGarminLoading(true);
        getGarminUserInfo(() => {
          setIsGarminLoading(false);
          setGarminLoading(true);
          navigate.goBack();
        });
      }
    }
  }, [prevLoadingAccess, loadingAccess]);

  const onNavigationStateChange = state => {
    if (state?.url?.includes('oauth_verifier')) {
      const parse = querystring.parse(state.url.replace('?', '&'));
      if (parse?.oauth_verifier !== 'null') {
        setState({
          verifier: parse?.oauth_verifier,
        });
      } else {
        setState({
          verifier: '',
          token: {key: '', secret: ''},
          successAccess: false,
          successRequest: false,
        });
      }
      setVisible(false);
    }
  };

  const onCancel = () => {
    setState({
      verifier: '',
      token: {key: '', secret: ''},
      successAccess: false,
      successRequest: false,
    });
    setVisible(false);
    setIsGarminLoading(false);
    setGarminLoading(false);
  };

  console.log({userGarmin});

  const renderModal = () => {
    return (
      <Modal
        isVisible={visible}
        onDismiss={onHide}
        useNativeDriver
        hideModalContentWhileAnimating
        onBackButtonPress={onHide}
        onBackdropPress={onHide}
        onSwipeComplete={onHide}
        style={styles.modal}
        onModalHide={doAccess}>
        <View style={styles.containerModal}>
          <View style={styles.containerModalHeader}>
            <TouchableOpacity onPress={onCancel}>
              <Text>{'Cancel'}</Text>
            </TouchableOpacity>
          </View>
          <WebView
            source={{
              uri: OAUTH_ROOT + GARMIN.OAUTH_CONFIRM + token?.key,
            }}
            onNavigationStateChange={onNavigationStateChange}
            startInLoadingState
            renderLoading={() => <Loading show={true} />}
            injectedJavaScript={injectScript(bottom)}
          />
        </View>
      </Modal>
    );
  };

  return (
    <View>
      <ButtonView
        activeOpacity={fitBitConnected ? 0.3 : 1}
        disabled={fitBitConnected}
        onPress={() =>
          !isFitBitLoading &&
          !isGarminLoading &&
          !garminLoading &&
          (garminConnected ? setShowModal(true) : doRequest())
        }
        style={[styles.btnView]}>
        <View style={styles.deviceIconVIew}>
          <Image source={Images.garminIcon} />
        </View>
        <Text color={Colors.black} type={Fonts.type.base} style={styles.txt}>
          {garminConnected ? 'Disconnect Garmin' : 'Connect with Garmin'}
        </Text>
        {isGarminLoading || garminLoading ? (
          <ActivityIndicator size={'large'} color={'white'} />
        ) : (
          <Image source={Images.forwordIcon} />
        )}
      </ButtonView>

      {renderModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },

  containerModal: {
    flex: 1,
    marginTop: 50,
    backgroundColor: '#fff',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  containerModalHeader: {
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    paddingHorizontal: 30,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  btnView: {
    flexDirection: 'row',
    borderRadius: 12,
    backgroundColor: 'rgba(204, 193, 255, 0.8)',
    height: 63,
    marginTop: 10,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  deviceIconVIew: {
    backgroundColor: '#AF36DA',
    width: 45,
    height: 45,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    flex: 0.95,
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
});

const injectScript = bottom => `
  const style = document.createElement('style');
  style.innerHTML = 'body { padding-bottom: ${bottom}px }'
  document.head.appendChild(style);
`;

export default Garmin;
