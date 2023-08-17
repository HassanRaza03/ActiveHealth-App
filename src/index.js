// @flow
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {AppRegistry, View, StatusBar} from 'react-native';
import {MessageBar, Text} from './components';
import configureStore from './store';
import AppNavigator from './navigator';
import applyConfigSettings from './config';
import AppStyles from './theme/AppStyles';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './navigator';
import DataHandler from './services/DataHandler';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import {
  requestUserPermission,
  notificationSerivces,
} from './helpers/PushNotification';
import ForegroundHander from './helpers/ForegroundNotification';

const reducers = require('./redux/slicers').default;

// applyConfigSettings();

export default class App extends Component {
  state = {
    isLoading: true,
    store: configureStore(reducers, () => {
      this._loadingCompleted();
      this.setState({isLoading: false});
    }),
  };

  _loadingCompleted() {
    //  DataHandler.setStore(this.state.store);
  }

  componentDidMount() {
    requestUserPermission();
    notificationSerivces();
    DataHandler.setStore(this.state.store);
  }

  render() {
    if (this.state.isLoading) {
      return null;
    }

    return (
      <View style={[AppStyles.flex]}>
        <StatusBar
          animated={true}
          backgroundColor="transparent"
          barStyle="light-content"
          translucent={true}
        />
        <ForegroundHander />
        <Provider store={this.state.store}>
          <NavigationContainer>
            <Navigator />
          </NavigationContainer>
        </Provider>
        <MessageBar />
      </View>
    );
  }
}

// AppRegistry.registerComponent('AutoConnect', () => App);
