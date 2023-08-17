import {View, Text, Keyboard, ImageBackground} from 'react-native';
import React, {useRef, useState} from 'react';
import styles from './styles';
import {Button, CustomNavbar, TextInput} from '../../components';
import {Colors, Fonts, Images} from '../../theme';
import WalkthoughIcon from '../../components/WalkthoughIcon';
import KeyboardAwareScrollViewComponent from '../../components/KeyboardAwareScrollViewComponent';
import {useNavigation} from '@react-navigation/native';
import util from '../../util';
import {strings} from '../../constants';
import {useDispatch} from 'react-redux';
import {resetPasswordRequest} from '../../redux/slicers/user';

export default function ResetPassword({route}) {
  const {email} = route.params ?? {};
  const nagivate = useNavigation();
  const dispatch = useDispatch();

  const [isPasswordVisibile, setPassVisibilty] = useState(() => false);
  const [isPasswordVisibileConfirm, setPassVisibiltyConfirm] = useState(
    () => false,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errorPasswordConfirm, setErrorPasswordConfirm] = useState('');

  const emailRef = useRef(null);
  const confirmEmailRef = useRef(null);

  function validation() {
    let isValid = true;

    if (util.isEmptyValueWithoutTrim(password)) {
      setErrorPassword(strings.REQUIRED_FIELD);
      isValid = false;
    } else if (util.isEmptyValue(password)) {
      setErrorPassword(strings.PASSWORD_SHOULD_NOT_CONTAIN_ONLY_SPACES);
      isValid = false;
    } else if (util.isEmptyValue(password)) {
      setErrorPassword(strings.PASSWORD_SHOULD_NOT_CONTAIN_ONLY_SPACES);
      isValid = false;
    } else if (!util.isPasswordValid(password)) {
      setErrorPassword(strings.PASSWORD_STRONGE);
      isValid = false;
    } else if (!util.strongePassword(password)) {
      setErrorPassword(strings.PASSWORD_STRONGE);
      isValid = false;
    }
    if (util.isEmptyValueWithoutTrim(passwordConfirm)) {
      setErrorPasswordConfirm(strings.REQUIRED_FIELD);
      isValid = false;
    } else if (!util.areValuesEqual(password, passwordConfirm)) {
      setErrorPasswordConfirm(strings.PASSWORD_AND_CONFIRM_PASS_SHOULD_BE_SAME);
      isValid = false;
    }

    Keyboard.dismiss();
    return isValid;
  }

  const onSubmit = () => {
    if (validation()) {
      setIsLoading(true);
      //
      dispatch(
        resetPasswordRequest({
          payloadData: {
            email: email,
            password,
          },

          responseCallback: (status, message) => {
            setIsLoading(false);

            if (status) {
              util.topAlert(
                'Password reset successfully. Now you can use a new password to login.',
              );
              nagivate.navigate('login');
            } else {
            }
          },
        }),
      );
    }
  };

  return (
    <ImageBackground source={Images.background} style={styles.container}>
      <CustomNavbar
        hasBorder={false}
        title={'Reset Password'}
        titleColor={Colors.white}
        hasBack={true}
        leftBtnPress={() => nagivate.goBack()}
        leftBtnImage={Images.backIcon}
      />
      <WalkthoughIcon />

      <KeyboardAwareScrollViewComponent
        style={{marginTop: 40}}
        scrollEnabled={true}>
        <TextInput
          labelStyle={styles.labelStyle}
          label="New Password"
          placeholder={'• • • • • • • •'}
          onSubmitEditing={() => confirmEmailRef?.current?.focus?.()}
          ref={emailRef}
          returnKeyType="next"
          placeholderTextColor={Colors.placeHolderColor}
          containerStyle={styles.txtLogin}
          icon={Images.passwordIcon}
          inputViewStyle={styles.inputViewStyles}
          rigthIcon={isPasswordVisibile ? Images.openEye : Images.closedEye}
          secureTextEntry={isPasswordVisibile ? false : true}
          onPress={() => setPassVisibilty(!isPasswordVisibile)}
          onChangeText={text => {
            setPassword(text);
            setErrorPassword('');
          }}
          maxLength={16}
          value={password}
          error={errorPassword}
        />
        <TextInput
          labelStyle={styles.labelStyle}
          label="Confirm Password"
          placeholder={'• • • • • • • •'}
          placeholderTextColor={Colors.placeHolderColor}
          containerStyle={styles.txtLogin}
          icon={Images.passwordIcon}
          onSubmitEditing={() => onSubmit()}
          ref={confirmEmailRef}
          returnKeyType="done"
          inputViewStyle={styles.inputViewStyles}
          onChangeText={text => {
            setPasswordConfirm(text);
            setErrorPasswordConfirm('');
          }}
          onPress={() => setPassVisibiltyConfirm(!isPasswordVisibileConfirm)}
          secureTextEntry={isPasswordVisibileConfirm ? false : true}
          rigthIcon={
            isPasswordVisibileConfirm ? Images.openEye : Images.closedEye
          }
          maxLength={16}
          value={passwordConfirm}
          error={errorPasswordConfirm}
        />

        <Button
          type={Fonts.type.base}
          onPress={() => onSubmit()}
          style={styles.nextBtn}
          textStyle={styles.loginTxt}
          isLoading={isLoading}>
          RESET PASSWORD
        </Button>
      </KeyboardAwareScrollViewComponent>
    </ImageBackground>
  );
}
