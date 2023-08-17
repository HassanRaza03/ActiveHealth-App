import React from 'react';
import _ from 'lodash';
import SplashScreen from 'react-native-splash-screen';
import {useSelector} from 'react-redux';
import AuthNavigate from './AuthNavigate';
import HomeNavigate from './HomeNavigate';

const Navigator = () => {
  // useEffect(() => {
  SplashScreen.hide();
  // }, []);
  const {token} = useSelector(state => state.user);

  return !_.isEmpty(token) ? <HomeNavigate /> : <AuthNavigate />;
};

export default Navigator;
