import {useNavigation} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {Keyboard, View} from 'react-native';
import {
  ButtonView,
  Text,
  CustomNavbar,
  TextInput,
  Button,
} from '../../components';
import KeyboardAwareScrollViewComponent from '../../components/KeyboardAwareScrollViewComponent';
import {strings} from '../../constants';
import {Colors, Fonts, Images} from '../../theme';
import util from '../../util';
import styles from './styles';
import {useDispatch} from 'react-redux';
import {changePasswordRequest} from '../../redux/slicers/user';

export default function ChangePassword() {
  const nagivate = useNavigation();
  const dispatch = useDispatch();

  const [isPasswordVisibile, setPassVisibilty] = useState(() => false);
  const [isPasswordVisibileConfirm, setPassVisibiltyConfirm] = useState(
    () => false,
  );
  const [isPasswordNewVisibileConfirm, setPassNewVisibiltyConfirm] = useState(
    () => false,
  );
  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errorNewPassword, setErrorNewPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errorPasswordConfirm, setErrorPasswordConfirm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const passwordRef = useRef(null);
  const newPasswordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  function validation() {
    let isValid = true;
    setErrorPassword('');
    setErrorNewPassword('');
    setErrorPasswordConfirm('');
    if (util.isEmptyValueWithoutTrim(password)) {
      setErrorPassword(strings.REQUIRED_FIELD);
      isValid = false;
    } else if (util.isEmptyValue(password)) {
      setErrorPassword(strings.PASSWORD_SHOULD_NOT_CONTAIN_ONLY_SPACES);
      isValid = false;
    }
    if (util.isEmptyValueWithoutTrim(newPassword)) {
      setErrorNewPassword(strings.REQUIRED_FIELD);
      isValid = false;
    } else if (util.isEmptyValue(newPassword)) {
      setErrorNewPassword(strings.PASSWORD_SHOULD_NOT_CONTAIN_ONLY_SPACES);
      isValid = false;
    } else if (util.isEmptyValue(newPassword)) {
      setErrorNewPassword(strings.PASSWORD_SHOULD_NOT_CONTAIN_ONLY_SPACES);
      isValid = false;
    } else if (!util.isPasswordValid(newPassword)) {
      setErrorNewPassword(strings.PASSWORD_STRONGE);
      isValid = false;
    } else if (!util.strongePassword(newPassword)) {
      setErrorNewPassword(strings.PASSWORD_STRONGE);
      isValid = false;
    }
    if (util.isEmptyValueWithoutTrim(passwordConfirm)) {
      setErrorPasswordConfirm(strings.REQUIRED_FIELD);
      isValid = false;
    } else if (!util.areValuesEqual(newPassword, passwordConfirm)) {
      setErrorPasswordConfirm(strings.PASSWORD_AND_CONFIRM_PASS_SHOULD_BE_SAME);
      isValid = false;
    }

    Keyboard.dismiss();
    return isValid;
  }
  const onSubmit = () => {
    if (validation()) {
      setIsLoading(true);
      dispatch(
        changePasswordRequest({
          payloadData: {
            currentPassword: password,
            password: newPassword,
            passwordConfirmation: passwordConfirm,
          },

          responseCallback: (status, message) => {
            setIsLoading(false);
            if (status) {
              util.topAlert('Password updated successfully.');
              nagivate.goBack();
            } else {
            }
          },
        }),
      );
    }
  };
  return (
    <View style={styles.container}>
      <CustomNavbar
        hasBorder={false}
        title="Change Password"
        leftBtnPress={() => nagivate.goBack()}
        leftBtnImage={Images.backIconBlack}
      />

      <KeyboardAwareScrollViewComponent
        style={{marginHorizontal: 15, marginTop: 0}}
        scrollEnabled={true}>
        <TextInput
          labelStyle={styles.labelStyle}
          label="Current Password"
          placeholder={'• • • • • • • •'}
          value={password}
          onSubmitEditing={() => newPasswordRef?.current?.focus?.()}
          ref={passwordRef}
          returnKeyType="next"
          placeholderTextColor={Colors.black}
          onPress={() => setPassVisibilty(!isPasswordVisibile)}
          onChangeText={value => {
            setErrorPassword('');
            setPassword(value);
          }}
          cursorColor={Colors.black}
          selectionColor={Colors.black}
          secureTextEntry={isPasswordVisibile ? false : true}
          containerStyle={styles.txtLogin}
          icon={Images.passwordIcon}
          inputStyle={{color: Colors.black}}
          tintColorIcon={Colors.black}
          inputViewStyle={styles.inputViewStyles}
          rigthIcon={
            isPasswordVisibile ? Images.openEyeBlack : Images.closedEyeBlack
          }
          error={errorPassword}
        />
        <TextInput
          labelStyle={styles.labelStyle}
          label="New Password"
          placeholder={'• • • • • • • •'}
          onChangeText={value => {
            setErrorNewPassword('');
            setNewPassword(value);
          }}
          onSubmitEditing={() => confirmPasswordRef?.current?.focus?.()}
          ref={newPasswordRef}
          returnKeyType="next"
          selectionColor={Colors.black}
          cursorColor={Colors.black}
          inputStyle={{color: Colors.black}}
          tintColorIcon={Colors.black}
          onPress={() =>
            setPassNewVisibiltyConfirm(!isPasswordNewVisibileConfirm)
          }
          maxLength={16}
          secureTextEntry={isPasswordNewVisibileConfirm ? false : true}
          rigthIcon={
            isPasswordNewVisibileConfirm
              ? Images.openEyeBlack
              : Images.closedEyeBlack
          }
          value={newPassword}
          placeholderTextColor={Colors.black}
          containerStyle={styles.txtLogin}
          icon={Images.passwordIcon}
          inputViewStyle={styles.inputViewStyles}
          error={errorNewPassword}
        />
        <TextInput
          labelStyle={styles.labelStyle}
          label="Confirm Password"
          placeholder={'• • • • • • • •'}
          onChangeText={value => {
            setErrorPasswordConfirm('');
            setPasswordConfirm(value);
          }}
          onSubmitEditing={() => onSubmit()}
          ref={confirmPasswordRef}
          returnKeyType="done"
          selectionColor={Colors.black}
          cursorColor={Colors.black}
          inputStyle={{color: Colors.black}}
          tintColorIcon={Colors.black}
          onPress={() => setPassVisibiltyConfirm(!isPasswordVisibileConfirm)}
          secureTextEntry={isPasswordVisibileConfirm ? false : true}
          rigthIcon={
            isPasswordVisibileConfirm
              ? Images.openEyeBlack
              : Images.closedEyeBlack
          }
          value={passwordConfirm}
          placeholderTextColor={Colors.black}
          containerStyle={styles.txtLogin}
          icon={Images.passwordIcon}
          inputViewStyle={styles.inputViewStyles}
          error={errorPasswordConfirm}
          maxLength={16}
        />
      </KeyboardAwareScrollViewComponent>

      <Button
        onPress={onSubmit}
        type={Fonts.type.base}
        style={styles.logoutBtn}
        textStyle={styles.logoutTxt}
        indicatorColor={'white'}
        isLoading={isLoading}>
        UPDATE
      </Button>
    </View>
  );
}
