import {ImageBackground, Keyboard, View} from 'react-native';
import React, {useRef, useState} from 'react';
import CircularProgress from 'react-native-circular-progress-indicator';
import {Button, ButtonView, Text, CustomNavbar} from '../../components';
import {Colors, Fonts, Images} from '../../theme';
import WalkthoughIcon from '../../components/WalkthoughIcon';
import styles from './styles';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {useNavigation} from '@react-navigation/native';
import util from '../../util';
import {useDispatch} from 'react-redux';
import {
  confirmOtpRequest,
  getOtpTokenRequest,
  userSignUp,
  userSignupRequest,
} from '../../redux/slicers/user';

export default function EmailVerification({route}) {
  const {isSignup, payload} = route.params || {};
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const progressRef = useRef(null);
  const navigate = useNavigation();
  const [valueMax, setValuemax] = useState(60);
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState(null);

  const ref = useBlurOnFulfill({value, cellCount: 4});
  const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [disableReset, setDisableReset] = useState(false);

  const resendOtpRequest = () => {
    if (disableReset) {
      dispatch(
        getOtpTokenRequest({
          payloadData: {
            email: payload?.email?.toLowerCase(),
            isSignup: isSignup,
          },
          responseCallback: (status, message, otp) => {
            if (status) {
              setOtp(otp);
              progressRef.current.reAnimate();
              setDisableReset(false);
            }
          },
        }),
      );
    }
  };

  const handleConfirmOtp = () => {
    if (isLoading) return;

    if (value.length !== 4) {
      util.topAlertError('OTP is required.');
      return;
    }

    setIsLoading(true);

    dispatch(
      confirmOtpRequest({
        payloadData: {
          otp: value,
          email: payload?.email?.toLowerCase(),
        },

        responseCallback: (status, message) => {
          if (!status) {
            setIsLoading(false);
            return;
          }
          if (isSignup) handleCreateUser();
          else {
            setIsLoading(false);
            navigate.navigate('resetPassword', {
              email: payload?.email,
            });
          }
        },
      }),
    );
  };

  const handleCreateUser = () => {
    const data = {
      email: payload?.email,
      username: payload?.email,
      password: payload?.password,
      full_name: payload?.fullname,
      confirmed: true,
      groups: payload?.groups,
    };

    dispatch(
      userSignupRequest({
        payloadData: data,
        responseCallback: (status, message) => {
          setIsLoading(false);
          if (status) {
            dispatch(userSignUp(isSignup));
            !isSignup && navigate.navigate('resetPassword');
          } else {
          }
        },
      }),
    );
  };

  const codeInputView = () => {
    return (
      <CodeField
        ref={ref}
        {...prop}
        cellCount={4}
        value={value}
        onChangeText={val => {
          setValue(val);
        }}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <View
            style={{
              borderBottomWidth: 2,
              borderColor: Colors.white,
              width: 44,
              height: 40,
            }}>
            <Text
              type={Fonts.type.base}
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />
    );
  };

  return (
    <ImageBackground source={Images.background} style={styles.container}>
      <CustomNavbar
        hasBorder={false}
        title={'Email Verification'}
        titleColor={Colors.white}
        hasBack={true}
        leftBtnImage={Images.backIcon}
        leftBtnPress={() => navigate.goBack()}
      />

      <WalkthoughIcon />
      <Text
        type={Fonts.type.base}
        style={{
          color: Colors.white,
          textAlign: 'center',
          width: 250,
          fontSize: 12,
          fontWeight: '400',
          marginTop: 30,
        }}>
        Enter your email and we will send you a recovery code
      </Text>

      {codeInputView()}
      <ButtonView
        style={{width: '100%', alignItems: 'center'}}
        onPress={() => Keyboard.dismiss()}>
        <Text
          type={Fonts.type.base}
          style={{
            color: Colors.white,
            textAlign: 'center',
            fontSize: 14,
            fontWeight: '500',
            marginTop: 30,
          }}>
          {payload?.email}
        </Text>
        <ButtonView onPress={() => navigate.goBack()}>
          <Text
            type={Fonts.type.bold}
            style={{
              color: Colors.white,
              textAlign: 'center',
              fontSize: 14,
              fontWeight: '600',
              marginTop: 5,
            }}>
            Wrong Email ?
          </Text>
        </ButtonView>
        <View style={{marginTop: 10}}>
          <CircularProgress
            value={0}
            radius={60}
            ref={progressRef}
            maxValue={valueMax}
            initialValue={60}
            progressValueColor={'#fff'}
            activeStrokeWidth={15}
            inActiveStrokeWidth={15}
            activeStrokeColor={Colors.white}
            inActiveStrokeColor={Colors.background.primary}
            duration={60000}
            onAnimationComplete={() => {
              setDisableReset(true);
            }}
          />
        </View>
      </ButtonView>

      <Button
        onPress={handleConfirmOtp}
        type={Fonts.type.base}
        style={styles.countioneBtn}
        textStyle={styles.contiueTxt}
        isLoading={isLoading}>
        CONTINUE
      </Button>
      {/* <View>
        <Text
          type={Fonts.type.base}
          style={{
            color: Colors.white,
            textAlign: 'center',
            width: 250,
            fontSize: 12,
            fontWeight: '400',
            marginTop: 30,
          }}>
          {otp}
        </Text>
      </View> */}
      <View style={styles.accountTxtView}>
        <View>
          <Text type={Fonts.type.base} style={styles.accountTxt}>
            Didn't receive a code?
          </Text>
        </View>
        <ButtonView onPress={resendOtpRequest}>
          <Text
            type={Fonts.type.bold}
            style={[
              styles.signUpTxt,
              !disableReset && {color: Colors.placeHolderColor},
            ]}>
            Resend Code
          </Text>
        </ButtonView>
      </View>
    </ImageBackground>
  );
}
