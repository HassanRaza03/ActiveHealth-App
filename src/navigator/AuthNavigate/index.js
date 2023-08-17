import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {useSelector} from 'react-redux';
import {
  Login,
  Welcome,
  SignUp,
  ForgotPassword,
  ResetPassword,
  EmailVerification,
  ConnectWatch,
  Walkthough,
} from '../../containers';
import HomeNavigate from '../HomeNavigate';
const AuthNavigate = () => {
  const Stack = createStackNavigator();
  const {isFirst} = useSelector(state => state.gerenal);
  return (
    <Stack.Navigator>
      {isFirst && (
        <Stack.Screen
          name="walkthough"
          component={Walkthough}
          options={{headerShown: false, width: '100%'}}
        />
      )}

      <Stack.Screen
        name="login"
        component={Login}
        options={{
          headerShown: false,
          width: '100%',
        }}
      />
      <Stack.Screen
        name="signup"
        component={SignUp}
        options={{
          headerShown: false,
          width: '100%',
        }}
      />

      <Stack.Screen
        name="forgotPassword"
        component={ForgotPassword}
        options={{
          headerShown: false,
          width: '100%',
        }}
      />
      <Stack.Screen
        name="resetPassword"
        component={ResetPassword}
        options={{
          headerShown: false,
          width: '100%',
        }}
      />
      <Stack.Screen
        name="emailVerification"
        component={EmailVerification}
        options={{
          headerShown: false,
          width: '100%',
        }}
      />

      <Stack.Screen
        options={{
          headerShown: false,
          width: '100%',
        }}
        name={'HomeTab'}
        component={HomeNavigate}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigate;
