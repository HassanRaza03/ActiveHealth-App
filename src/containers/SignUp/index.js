import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {Image, ImageBackground, Keyboard, ScrollView, View} from 'react-native';
// import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import {
  Button,
  ButtonView,
  Text,
  CustomNavbar,
  TextInput,
  DropDown,
} from '../../components';
import KeyboardAwareScrollViewComponent from '../../components/KeyboardAwareScrollViewComponent';
import WalkthoughIcon from '../../components/WalkthoughIcon';
import {ALERT_TYPES, strings} from '../../constants';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import util from '../../util';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {getOtpTokenRequest} from '../../redux/slicers/user';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getAllGroupsRequest} from '../../redux/slicers/groups';
import _ from 'lodash';

export default function SignUp() {
  const nagivate = useNavigation();
  const dispatch = useDispatch();
  const [isPasswordVisibile, setPassVisibilty] = useState(() => false);
  const [isPasswordVisibileConfirm, setPassVisibiltyConfirm] = useState(
    () => false,
  );
  const [fullname, setFullName] = useState(''); //hello world
  const [errorFullname, setErrorFullName] = useState('');
  const [password, setPassword] = useState(''); //Adobe110#
  const [errorPassword, setErrorPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState(''); //Adobe110#
  const [errorPasswordConfirm, setErrorPasswordConfirm] = useState('');
  const [groupError, setgroupError] = useState(false);
  const [email, setEmail] = useState(''); //hello2@yopmail.com
  const [emailConfirm, setEmailConfirm] = useState(''); //hello2@yopmail.com
  const [errorEmailConfirm, setErrorEmailConfirm] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const refFullname = useRef(null);
  const refEmail = useRef(null);
  const refEmailConfirm = useRef(null);
  const refPassword = useRef(null);
  const refPasswordComfirm = useRef(null);
  const [value, setValue] = useState([]);

  const allGroups = useSelector(state => state?.groups?.groups);
  const sortedGroups = _.cloneDeep(allGroups);
  sortedGroups.sort((a, b) => a.label.localeCompare(b.label));

  useEffect(() => {
    dispatch(getAllGroupsRequest({responseCallback: () => {}}));
  }, []);

  function validation() {
    let isValid = true;

    if (util.isEmptyValueWithoutTrim(fullname)) {
      setErrorFullName(strings.REQUIRED_FIELD);
      isValid = false;
    } else if (util.isEmptyValue(fullname)) {
      setErrorFullName(strings.NAME_SHOULD_NOT_CONTAIN_ONLY_SPACES);
      isValid = false;
    }

    if (util.isEmptyValueWithoutTrim(email)) {
      setErrorEmail(strings.REQUIRED_FIELD);
      isValid = false;
    } else if (util.isEmptyValue(email)) {
      setErrorEmail(strings.EMAIL_SHOULD_NOT_CONTAIN_ONLY_SPACES);
      isValid = false;
    } else if (!util.isEmailValid(email)) {
      setErrorEmail(strings.INVALID_EMAIL);
      return false;
    } else if (!util.areValuesEqual(email, emailConfirm)) {
      setErrorEmailConfirm(strings.EMAIL_AND_CONFIRM_EMAIL_SHOULD_BE_SAME);
      isValid = false;
    }
    if (util.isEmptyValueWithoutTrim(emailConfirm)) {
      setErrorEmailConfirm(strings.REQUIRED_FIELD);
      isValid = false;
    } else if (!util.areValuesEqual(email, emailConfirm)) {
      setErrorEmailConfirm(strings.EMAIL_AND_CONFIRM_EMAIL_SHOULD_BE_SAME);
      isValid = false;
    }

    if (util.isEmptyValueWithoutTrim(password)) {
      setErrorPassword(strings.REQUIRED_FIELD);
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
    // if (value.length < 1) {
    //   setgroupError(true);
    //   isValid = false;
    // }
    Keyboard.dismiss();
    return isValid;
  }

  const onSubmit = () => {
    if (validation()) {
      setIsLoading(true);
      const payload = {
        fullname,
        password,
        email: email?.toLowerCase(),
        groups: {
          connect: [...value]?.map(item => ({
            id: item,
          })),
        },
      };

      dispatch(
        getOtpTokenRequest({
          payloadData: {
            email: email?.toLowerCase(),
            isSignup: true,
          },

          responseCallback: (status, message) => {
            setIsLoading(false);

            if (status) {
              nagivate.navigate('emailVerification', {
                isSignup: true,
                payload,
              });
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
        title={'Sign Up'}
        titleColor={Colors.white}
        hasBack={true}
        leftBtnPress={() => nagivate.goBack()}
        leftBtnImage={Images.backIcon}
      />
      <KeyboardAwareScrollViewComponent scrollEnabled={true}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <WalkthoughIcon />
          <TextInput
            labelStyle={styles.labelStyle}
            label="Full Name"
            placeholder={'Full name'}
            value={fullname}
            onChangeText={text => {
              setErrorFullName('');
              setFullName(text);
            }}
            maxLength={80}
            onSubmitEditing={() => refEmail?.current?.focus?.()}
            ref={refFullname}
            returnKeyType="next"
            placeholderTextColor={Colors.placeHolderColor}
            containerStyle={styles.txtLogin}
            icon={Images.personIcon}
            inputViewStyle={styles.inputViewStyles}
            error={errorFullname}
          />
          <TextInput
            labelStyle={styles.labelStyle}
            label="Email Address"
            value={email}
            onChangeText={text => {
              setErrorEmail('');
              setEmail(text);
            }}
            maxLength={100}
            ref={refEmail}
            onSubmitEditing={() => refEmailConfirm?.current?.focus?.()}
            returnKeyType="next"
            placeholder={'user@example.com'}
            autoCapitalize="none"
            placeholderTextColor={Colors.placeHolderColor}
            containerStyle={styles.txtLogin}
            icon={Images.EmailIcon}
            inputViewStyle={styles.inputViewStyles}
            error={errorEmail}
            keyboardType="email-address"
          />
          <TextInput
            labelStyle={styles.labelStyle}
            label="Confirm Email Address"
            placeholder={'user@example.com'}
            autoCapitalize="none"
            placeholderTextColor={Colors.placeHolderColor}
            containerStyle={styles.txtLogin}
            icon={Images.EmailIcon}
            maxLength={100}
            value={emailConfirm}
            onSubmitEditing={() => refPassword?.current?.focus?.()}
            onChangeText={text => {
              setErrorEmailConfirm('');
              setEmailConfirm(text);
            }}
            ref={refEmailConfirm}
            returnKeyType="next"
            inputViewStyle={styles.inputViewStyles}
            error={errorEmailConfirm}
            keyboardType="email-address"
          />

          <TextInput
            labelStyle={styles.labelStyle}
            label="Password"
            placeholder={'• • • • • • • •'}
            value={password}
            placeholderTextColor={Colors.placeHolderColor}
            autoCapitalize="none"
            onSubmitEditing={() => refPasswordComfirm?.current?.focus?.()}
            onPress={() => setPassVisibilty(!isPasswordVisibile)}
            onChangeText={value => {
              setErrorPassword('');
              setPassword(value);
            }}
            maxLength={16}
            ref={refPassword}
            returnKeyType="next"
            secureTextEntry={isPasswordVisibile ? false : true}
            containerStyle={styles.txtLogin}
            icon={Images.passwordIcon}
            inputViewStyle={styles.inputViewStyles}
            rigthIcon={isPasswordVisibile ? Images.openEye : Images.closedEye}
            error={errorPassword}
          />
          <TextInput
            labelStyle={styles.labelStyle}
            label="Confirm Password"
            placeholder={'• • • • • • • •'}
            autoCapitalize="none"
            onChangeText={value => {
              setErrorPassword('');
              setPasswordConfirm(value);
            }}
            maxLength={16}
            onSubmitEditing={() => onSubmit()}
            ref={refPasswordComfirm}
            returnKeyType="done"
            onPress={() => setPassVisibiltyConfirm(!isPasswordVisibileConfirm)}
            secureTextEntry={isPasswordVisibileConfirm ? false : true}
            rigthIcon={
              isPasswordVisibileConfirm ? Images.openEye : Images.closedEye
            }
            value={passwordConfirm}
            placeholderTextColor={Colors.placeHolderColor}
            containerStyle={styles.txtLogin}
            icon={Images.passwordIcon}
            inputViewStyle={styles.inputViewStyles}
            error={errorPasswordConfirm}
          />

          <DropDown
            keyboardAvoiding={true}
            data={sortedGroups}
            value={value}
            setValue={value => {
              setValue(value);
              setgroupError(false);
            }}
            label={'Select Groups'}
            placeholder={'Select here'}
            leftIcon={Images.groupIcon}
            rightIcon={Images.downArrow}
          />

          {groupError && (
            <Text
              // type="medium"
              size="small"
              color={Colors.red}
              style={[AppStyles.mTop5, AppStyles.mBottom5]}>
              {strings.REQUIRED_FIELD}
            </Text>
          )}
          <Button
            onPress={() => onSubmit()}
            style={styles.loginBtn}
            type={Fonts.type.base}
            textStyle={styles.loginTxt}
            isLoading={isLoading}>
            SIGNUP
          </Button>
        </ScrollView>
      </KeyboardAwareScrollViewComponent>

      <View style={styles.accountTxtView}>
        <View>
          <Text type={Fonts.type.base} style={styles.accountTxt}>
            Already have an account?
          </Text>
        </View>
        <ButtonView onPress={() => nagivate.navigate('login')}>
          <Text type={Fonts.type.base} style={styles.signUpTxt}>
            Login
          </Text>
        </ButtonView>
      </View>
    </ImageBackground>
  );
}
