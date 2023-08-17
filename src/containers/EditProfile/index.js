import {
  View,
  Image,
  TouchableOpacity,
  Keyboard,
  Platform,
  Alert,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet';
import OpenSettings from 'react-native-open-settings';
import styles from './styles';
import {
  ButtonView,
  CustomNavbar,
  DropDown,
  Text,
  TextInput,
  Button,
} from '../../components';
import {Colors, Fonts, Images} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import util from '../../util';
import {strings} from '../../constants';
import KeyboardAwareScrollViewComponent from '../../components/KeyboardAwareScrollViewComponent';
import {useDispatch, useSelector} from 'react-redux';
import {
  updateProfileRequest,
  getUserDataRequest,
} from '../../redux/slicers/user';
import {uploadFileRequest} from '../../redux/slicers/gerenal';
import {getUserGroupsRequest} from '../../redux/slicers/groups';
import _ from 'lodash';
import {getAllSurveysSuccess} from '../../redux/slicers/surveyQuestions';
export default function EditProfile() {
  const nagivate = useNavigation();
  const dispatch = useDispatch();

  const actionSheetRef = useRef();

  const user = useSelector(state => state?.user?.data?.user);

  const userGroups = useSelector(({groups}) => groups?.userGroups);
  const allGroups = useSelector(({groups}) => groups?.groups);
  const sortedGroups = _.cloneDeep(allGroups);
  sortedGroups.sort((a, b) => a.label.localeCompare(b.label));

  const [fullname, setFullName] = useState(user?.full_name);
  const [errorFullname, setErrorFullName] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState([]);

  const nameRef = useRef(null);
  const groupIds = [...userGroups]?.map(item => item?.id);

  useEffect(() => {
    setSelected(groupIds);
  }, []);

  const openActionSheet = () => {
    actionSheetRef.current?.show();
  };

  const onActionPress = key => {
    if (key === 2) return;

    if (key === 1) {
      launchImageLibraryAction();
    }

    if (key === 0) {
      launchCameraAction();
    }
  };

  const launchImageLibraryAction = () => {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: true,
      compressImageQuality: 0.7,
    })
      .then(image => {
        setFile(image);
      })
      .catch(e => {
        if (e.code && e.code === 'E_PERMISSION_MISSING') {
          Alert.alert(
            'Permission Required',
            'Cannot access images. Please allow access if you want to be able to select images.',
            [
              {
                text: 'Open Settings',
                onPress: () => {
                  OpenSettings.openSettings();
                },
              },
              {
                text: 'Cancle',
                onPress: () => {},
                style: 'cancel',
              },
            ],
            {cancelable: false},
          );
        }
        console.log('err0r => ', e);
      });
  };

  const launchCameraAction = () => {
    ImagePicker.openCamera({
      width: 500,
      height: 500,
      cropping: true,
      useFrontCamera: true,
      compressImageQuality: 0.7,
    })
      .then(image => {
        setFile(image);
      })
      .catch(e => {
        if (
          (e.code && e.code === 'E_PERMISSION_MISSING') ||
          e.code === 'E_PICKER_NO_CAMERA_PERMISSION' ||
          e.code === 'E_NO_CAMERA_PERMISSION'
        ) {
          Alert.alert(
            'Permission Required',
            'Please allow this app to use your camera.',
            [
              {
                text: 'Open Settings',
                onPress: () => {
                  OpenSettings.openSettings();
                },
              },
              {
                text: 'Cancle',
                onPress: () => {},
                style: 'cancel',
              },
            ],
            {cancelable: false},
          );
        } else if (e.code === 'E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR') {
          Alert.alert('Error', 'No camera on simulator');
        }
      });
  };

  function validation() {
    let isValid = true;

    if (util.isEmptyValueWithoutTrim(fullname)) {
      setErrorFullName(strings.REQUIRED_FIELD);
      isValid = false;
    } else if (util.isEmptyValue(fullname)) {
      setErrorFullName(strings.NAME_SHOULD_NOT_CONTAIN_ONLY_SPACES);
      isValid = false;
    }

    Keyboard.dismiss();
    return isValid;
  }

  const onSubmit = async () => {
    let image;
    if (validation()) {
      setLoading(true);
      const groups = {
        connect: [...selected].map(item => ({id: item})),
        disconnect: [],
      };

      for (let item of userGroups) {
        if (selected?.includes(item?.id)) {
          continue;
        }
        groups.disconnect.push({id: item?.id});
      }
      if (file) {
        const path = file.path;
        const data = new FormData();

        data.append('files', {
          name: 'test1.jpg',
          type: 'image/jpeg',
          uri: Platform.OS === 'ios' ? path.replace('file://', '') : path,
        });
        dispatch(
          uploadFileRequest({
            payloadData: data,
            responseCallback: (status, uploadedFile) => {
              setLoading(false);
              if (status) {
                setLoading(true);
                dispatch(
                  updateProfileRequest({
                    payloadData: {
                      fullName: fullname,
                      groups,
                      photo: uploadedFile[0]?.id,
                    },
                    responseCallback: (status, message) => {
                      setLoading(false);
                      if (status) {
                        dispatch(getUserDataRequest(() => {}));
                        dispatch(getUserGroupsRequest(() => {}));
                        util.topAlert('Profile updated successfully');
                        nagivate.goBack();
                      } else {
                      }
                    },
                  }),
                );
              }
            },
          }),
        );
      } else {
        dispatch(
          updateProfileRequest({
            payloadData: {
              fullName: fullname,
              groups,
            },
            responseCallback: (status, message) => {
              setLoading(false);
              if (status) {
                dispatch(getUserDataRequest(() => {}));
                dispatch(getUserGroupsRequest(() => {}));
                util.topAlert('Profile updated successfully');
                if (selected?.length === 0) {
                  dispatch(getAllSurveysSuccess([]));
                }
                nagivate.goBack();
              } else {
              }
            },
          }),
        );
      }
    }
  };

  const options = ['Take Photo', 'Choose from Library', 'Cancel'];

  const groupChanged = !(
    JSON.stringify([...groupIds].sort()) ===
    JSON.stringify([...selected].sort())
  );

  const fullnameChanged = !(fullname === user?.full_name);

  const isEnabled = groupChanged || fullnameChanged || file;

  return (
    <View style={styles.container}>
      <CustomNavbar
        hasBorder={false}
        title="Edit Profile"
        leftBtnPress={() => nagivate.goBack()}
        leftBtnImage={Images.backIconBlack}
      />

      <View style={styles.profileView}>
        {file?.path && (
          <Image
            source={{uri: file?.path}}
            style={{height: 130, width: 130, borderRadius: 80}}
          />
        )}

        {!file?.path && (
          <Image
            source={
              user?.photo?.url ? {uri: user?.photo?.url} : Images.profileImage2
            }
            style={{height: 130, width: 130, borderRadius: 65}}
          />
        )}
        <TouchableOpacity
          style={{position: 'absolute', bottom: 0, right: 0}}
          onPress={openActionSheet}>
          <Image source={Images.cameraIcon} />
        </TouchableOpacity>
      </View>

      <KeyboardAwareScrollViewComponent
        style={{marginHorizontal: 15}}
        scrollEnabled={true}>
        <TextInput
          labelStyle={styles.labelStyle}
          label="Full Name"
          placeholder={'Full name'}
          value={fullname}
          onChangeText={text => {
            setErrorFullName('');
            setFullName(text);
          }}
          ref={nameRef}
          maxLength={80}
          onSubmitEditing={() => onSubmit()}
          returnKeyType="done"
          selectionColor={Colors.black}
          cursorColor={Colors.black}
          inputStyle={{color: Colors.black}}
          placeholderTextColor={Colors.black}
          containerStyle={styles.txtLogin}
          icon={Images.personIcon}
          tintColorIcon={Colors.black}
          inputViewStyle={styles.inputViewStyles}
          error={errorFullname}
        />

        <DropDown
          data={sortedGroups}
          value={selected}
          setValue={setSelected}
          label={'Select Groups'}
          placeholder={'Random Group'}
          leftIcon={Images.groupIconDark}
          rightIcon={Images.downArrowDark}
          isDark
        />
      </KeyboardAwareScrollViewComponent>

      {/* <ButtonView onPress={onSubmit} style={styles.logoutBtn}>
        <Text type={Fonts.type.base} style={styles.logoutTxt}>
          SAVE
        </Text>
      </ButtonView> */}

      <Button
        onPress={onSubmit}
        type={Fonts.type.base}
        style={styles.logoutBtn}
        textStyle={styles.logoutTxt}
        indicatorColor={'white'}
        isLoading={loading}
        disabled={!isEnabled}>
        SAVE
      </Button>

      <ActionSheet
        ref={actionSheetRef}
        options={options}
        cancelButtonIndex={2}
        destructiveButtonIndex={2}
        key={1}
        onPress={onActionPress}
      />
    </View>
  );
}
