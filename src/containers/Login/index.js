import {useNavigation} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {ImageBackground, Keyboard, TouchableOpacity, View} from 'react-native';
import {
  Button,
  Text,
  ButtonView,
  CustomNavbar,
  TextInput,
} from '../../components';
import qs from 'qs';
import KeyboardAwareScrollViewComponent from '../../components/KeyboardAwareScrollViewComponent';
import WalkthoughIcon from '../../components/WalkthoughIcon';
import {Colors, Fonts, Images} from '../../theme';
import util from '../../util';
import styles from './styles';
import {fitBitConfig, strings} from '../../constants';
import {useDispatch} from 'react-redux';
import {
  setToken,
  userSigninRequest,
  getUserDataRequest,
} from '../../redux/slicers/user';

export default function Login() {
  const nagivate = useNavigation();
  const dispatch = useDispatch();
  const [isPasswordVisibile, setPassVisibilty] = useState(() => false);

  const [email, setEmail] = useState(''); //('hello2@yopmail.com');
  const [password, setPassword] = useState(''); //('Adobe110#');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const refEamil = useRef(null);
  const refPassword = useRef(null);

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
    if (util.isEmptyValueWithoutTrim(password)) {
      setErrorPassword(strings.REQUIRED_FIELD);
      isValid = false;
    }

    Keyboard.dismiss();
    return isValid;
  }

  const onSubmit = () => {
    if (isLoading) {
      return;
    }
    if (validation()) {
      const payload = {
        identifier: email?.toLowerCase(),
        password,
      };
      setIsLoading(true);
      dispatch(
        userSigninRequest({
          payloadData: payload,
          responseCallback: (status, message) => {
            setIsLoading(false);
            if (status) {
              dispatch(
                getUserDataRequest({
                  payloadData: {},
                  responseCallback: () => {
                    nagivate.reset({
                      index: 0,
                      routes: [{name: 'home'}],
                    });
                  },
                }),
              );
            }
          },
        }),
      );
      // dispatch(setToken('LoginToken'));
    }
  };
  return (
    <ImageBackground source={Images.background} style={styles.container}>
      <CustomNavbar
        hasBorder={false}
        title={'Sign in'}
        titleColor={Colors.white}
      />
      <WalkthoughIcon />
      <KeyboardAwareScrollViewComponent scrollEnabled={true}>
        <TextInput
          labelStyle={styles.labelStyle}
          label="Email Address"
          value={email}
          placeholder={'user@example.com'}
          placeholderTextColor={Colors.placeHolderColor}
          onChangeText={value => {
            setErrorEmail('');
            setEmail(value);
          }}
          onSubmitEditing={() => refPassword?.current?.focus?.()}
          ref={refEamil}
          returnKeyType="next"
          containerStyle={styles.txtLogin}
          icon={Images.EmailIcon}
          inputViewStyle={styles.inputViewStyles}
          error={errorEmail}
          maxLength={100}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          labelStyle={styles.labelStyle}
          label="Password"
          placeholder={'• • • • • • • •'}
          onChangeText={value => {
            setErrorPassword('');
            setPassword(value);
          }}
          value={password}
          onSubmitEditing={() => onSubmit()}
          ref={refPassword}
          maxLength={16}
          returnKeyType="done"
          onPress={() => setPassVisibilty(!isPasswordVisibile)}
          secureTextEntry={isPasswordVisibile ? false : true}
          placeholderTextColor={Colors.placeHolderColor}
          containerStyle={styles.txtLogin}
          icon={Images.passwordIcon}
          inputViewStyle={styles.inputViewStyles}
          rigthIcon={isPasswordVisibile ? Images.openEye : Images.closedEye}
          error={errorPassword}
        />
        <TouchableOpacity
          onPress={() => {
            setErrorPassword('');
            setErrorEmail('');
            nagivate.navigate('forgotPassword');
          }}
          style={styles.forgetView}>
          <Text type={Fonts.type.base} style={styles.forgetTxt}>
            Forgot Password?
          </Text>
        </TouchableOpacity>

        <Button
          onPress={() => onSubmit()}
          type={Fonts.type.base}
          style={styles.loginBtn}
          textStyle={styles.loginTxt}
          isLoading={isLoading}>
          LOGIN
        </Button>
      </KeyboardAwareScrollViewComponent>

      <View style={styles.accountTxtView}>
        <View>
          <Text type={Fonts.type.base} style={styles.accountTxt}>
            Don’t have an account?
          </Text>
        </View>
        <ButtonView onPress={() => nagivate.navigate('signup')}>
          <Text type={Fonts.type.base} style={styles.signUpTxt}>
            Signup
          </Text>
        </ButtonView>
      </View>
    </ImageBackground>
  );
}
