// @flow
import {Platform, Linking} from 'react-native';
import moment from 'moment';
import {MessageBarManager} from 'react-native-message-bar';
import {MESSAGE_TYPES, DISCARD_WARNING} from '../constants';
import {isEmpty, cloneDeep, isEqual} from 'lodash';
import DataHandler from '../services/DataHandler';
import {userSignoutRequest} from '../redux/slicers/user';
import {groupLogout} from '../redux/slicers/groups';
import {surveyLogout} from '../redux/slicers/surveyQuestions';
import {
  generalLogoutRequest,
  removeDeviceTokenRequest,
} from '../redux/slicers/gerenal';
import {deleteDeviceToken} from '../helpers/firebaseHelper';
class Util {
  keyExtractor = (item: Object, index: number) => index.toString();
  isPlatformAndroid() {
    return Platform.OS === 'android';
  }
  isValidURL(url: 'string') {
    const re =
      /^(http|https|fttp):\/\/|[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,6}(:[0-9]{1,5})?(\/.*)?$/;
    return re.test(url);
  }
  isEmailValid(email: string) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  isPasswordValid(password: string) {
    return password.length >= 8;
  }
  strongePassword = password => {
    const re = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,25}$/;
    const temp = re.test(password);
    console.log('TEeeeEEEEEEeEeeeeeEEEEEEEmmmpmpmpmp = > ', temp);
    return temp;
  };
  areValuesEqual = (objA, objB) => isEqual?.(objA, objB);

  isValidName(name) {
    return /^[a-zA-Z '.-]*$/.test(name);
  }
  isEmptyValueWithoutTrim = (value = '') => isEmpty(String(value));
  isEmptyValue = (value = ' ') => isEmpty(String(value?.trim()));
  isValidUserName(username) {
    var regexp = /^\S*$/;
    return regexp.test(username);
  }
  cloneDeep = toClone => cloneDeep(toClone);

  topAlert(message, alertType = 'success') {
    MessageBarManager.showAlert({
      message,
      alertType,
      viewTopInset: 35,
    });
  }

  topAlertError(message, alertType = MESSAGE_TYPES.ERROR) {
    MessageBarManager.showAlert({
      message,
      alertType,
      viewTopInset: 35,
    });
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  getFormattedDateTime = (date, format) => {
    if (date) return moment(date).format(format);
    return '';
  };

  getDateObjectFromString = (date, format) => {
    if (date) return moment(date, format).toDate();
    return '';
  };

  showLoader = (instance, loadingFor = '') => {
    if (!instance.state.loading) {
      instance.setState({
        loading: true,
        loadingFor,
      });
    }
  };

  hideLoader = (instance, callback) => {
    if (instance.state.loading) {
      instance.setState(
        {
          loading: false,
          loadingFor: '',
        },
        callback,
      );
    }
  };

  getCurrentUserAccessToken() {
    return DataHandler.getStore().getState()?.user?.token;
  }

  isNumber(val) {
    return /^\d+$/.test(val);
  }

  openLinkInBrowser(url) {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: ");
      }
    });
  }

  generateGetParameter(obj) {
    let final = '?';
    for (const key in obj) {
      final = `${final}${key}=${obj[key]}&`;
    }
    final = final.slice(0, -1);
    return final;
  }
  minsToPresentableText(duration, long = false) {
    const durationHoursText = parseInt(duration / 60);
    const durationMinsText = parseInt(duration % 60);

    return `${
      durationHoursText > 0
        ? `${
            durationHoursText > 1
              ? `${durationHoursText}${long ? 'hours' : 'hrs'}`
              : `${durationHoursText}${long ? 'hour' : 'hr'}`
          }`
        : ``
    } ${
      durationMinsText > 0
        ? `${
            durationMinsText > 1
              ? `${durationMinsText}${long ? 'minutes' : 'min'}`
              : `${durationMinsText}${long ? 'minute' : 'min'}`
          }`
        : ``
    }`;
  }
}

export const generateGuid = () => {
  const S4 = () =>
    (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  );
};

export const convetStringToObject = data => {
  try {
    return JSON.parse(
      data.replace(/(\w+:)|(\w+ :)/g, function (matchedStr) {
        return '"' + matchedStr.substring(0, matchedStr.length - 1) + '":';
      }),
    );
  } catch (error) {
    return {};
  }
};

export const logoutUser = async () => {
  await deleteDeviceToken();
  DataHandler.getStore().dispatch(surveyLogout());
  DataHandler.getStore().dispatch(groupLogout());
  DataHandler.getStore().dispatch(generalLogoutRequest());
  DataHandler.getStore().dispatch(userSignoutRequest());
};

export default new Util();
