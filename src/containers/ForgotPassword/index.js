import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {ImageBackground, Keyboard, View} from 'react-native';
import {Button, Text, CustomNavbar, TextInput} from '../../components';
import KeyboardAwareScrollViewComponent from '../../components/KeyboardAwareScrollViewComponent';
import WalkthoughIcon from '../../components/WalkthoughIcon';
import {ALERT_TYPES, strings} from '../../constants';
import {Colors, Fonts, Images} from '../../theme';
import util from '../../util';
import styles from './styles';
import {useDispatch} from 'react-redux';
import {getOtpTokenRequest} from '../../redux/slicers/user';

export default function ForgotPassword() {
  const nagivate = useNavigation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [errorEmail, setErrorEmail] = useState();
  const [isLoading, setIsLoading] = useState(false);
  function validation() {
    let isValid = true;
    if (util.isEmptyValueWithoutTrim(email)) {
      setErrorEmail(strings.REQUIRED_FIELD);
      isValid = false;
    } else if (util.isEmptyValue(email)) {
      setErrorEmail(strings.EMAIL_SHOULD_NOT_CONTAIN_ONLY_SPACES);
      isValid = false;
    } else if (!util.isEmailValid(email)) {
      setErrorEmail(strings.INVALID_EMAIL);
      return false;
    }

    Keyboard.dismiss();
    return isValid;
  }
  const onSubmit = () => {
    if (validation()) {
      setIsLoading(true);
      dispatch(
        getOtpTokenRequest({
          payloadData: {
            email: email?.toLowerCase(),
            isSignup: false,
          },
          responseCallback: (status, message) => {
            setIsLoading(false);
            if (status) {
              nagivate.navigate('emailVerification', {
                isSignup: false,
                payload: {
                  email: email?.toLowerCase(),
                },
              });
            } else {
            }
          },
        }),
      );
      // nagivate.navigate('emailVerification');
    }
  };
  return (
    <ImageBackground source={Images.background} style={styles.container}>
      <CustomNavbar
        hasBorder={false}
        title={'Forgot Password'}
        titleColor={Colors.white}
        hasBack={true}
        leftBtnPress={() => nagivate.goBack()}
        leftBtnImage={Images.backIcon}
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
      <KeyboardAwareScrollViewComponent scrollEnabled={true}>
        <TextInput
          labelStyle={styles.labelStyle}
          label="Email Address"
          placeholder={'user@example.com'}
          placeholderTextColor={Colors.placeHolderColor}
          containerStyle={styles.txtLogin}
          icon={Images.EmailIcon}
          inputViewStyle={styles.inputViewStyles}
          value={email}
          onChangeText={text => {
            setErrorEmail('');
            setEmail(text);
          }}
          maxLength={100}
          error={errorEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          onSubmitEditing={() => onSubmit()}
          returnKeyType="done"
        />

        <Button
          type={Fonts.type.base}
          onPress={() => onSubmit()}
          style={styles.nextBtn}
          textStyle={styles.loginTxt}
          isLoading={isLoading}>
          NEXT
        </Button>
      </KeyboardAwareScrollViewComponent>
    </ImageBackground>
  );
}
