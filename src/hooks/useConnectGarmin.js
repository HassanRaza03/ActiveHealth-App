import {useState} from 'react';
import axios from 'axios';
import querystring from 'querystring';

import {usePrevious} from './usePrevious';
import {Oauth1Helper} from './oauth';
import {
  GARMIN,
  GARMIN_ROOT,
  GET_GARMIN_USER_INFO,
  GET_GARMIN_USER_PERMISSIONS,
} from '../config/WebService';
import {useDispatch, useSelector} from 'react-redux';
import {
  createGarminUserRequest,
  getGarminUserInfoRequest,
  getGarminUserPermissionsRequest,
} from '../redux/slicers/user';
import useGarminRequest from './useGarminRequest';
import util from '../util';

export const useConnectGarmin = setIsGarminLoading => {
  const dispatch = useDispatch();
  const user = useSelector(({user}) => user?.data?.user);
  const [state, _setState] = useState({
    verifier: '',
    data: {key: '', secret: ''},
    token: {key: '', secret: ''},
    loadingRequest: false,
    loadingAccess: false,
    successAccess: false,
    successRequest: false,
    errorRequest: false,
    errorAccess: false,
  });
  const prevLoadingRequest = usePrevious(state?.loadingRequest);
  const prevLoadingAccess = usePrevious(state?.loadingAccess);

  const {getAllGarminData} = useGarminRequest();

  const setState = values => {
    _setState(prev => ({
      ...prev,
      ...values,
    }));
  };

  const requestOptions = type => ({
    url: GARMIN_ROOT + type,
    method: 'POST',
    data: {},
  });

  const post = (url, data, authHeader) =>
    axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...authHeader,
      },
    });

  const doRequest = async () => {
    setState({loadingRequest: true});
    setIsGarminLoading(true);

    const request = requestOptions(GARMIN.REQUEST_TOKEN);

    const authHeader = Oauth1Helper.getAuthHeaderForRequest(request);

    // console.log(request.url, request.data, authHeader);
    post(request.url, request.data, authHeader)
      .then(res => {
        // console.log({response: res.data});
        const data = querystring.parse(res?.data);

        setState({
          loadingRequest: false,
          successRequest: true,
          errorRequest: false,
          token: {
            key: data?.oauth_token,
            secret: data?.oauth_token_secret,
          },
        });
      })
      .catch(err => {
        console.log('[ERROR-REQUEST]' + err);
        console.log('doRequest ', JSON.stringify(err));
        setState({
          loadingRequest: false,
          successRequest: false,
          errorRequest: true,
        });
        setIsGarminLoading(false);
      });
  };

  const doAccess = async () => {
    if (!state.verifier) {
      setState({
        successAccess: false,
        errorAccess: true,
      });
      return;
    }

    setState({loadingAccess: true});

    const access = requestOptions(GARMIN.ACCESS_TOKEN);

    const authHeader = Oauth1Helper.getAuthHeaderForRequest(
      access,
      state.token,
      state.verifier,
    );

    // console.log(access, state.token, state.verifier);
    console.log({authHeader});

    post(access.url, access.data, authHeader)
      .then(res => {
        const data = querystring.parse(res?.data);
        setState({
          data: {
            key: data?.oauth_token,
            secret: data?.oauth_token_secret,
          },
          loadingAccess: false,
          successAccess: true,
          errorAccess: false,
        });
      })
      .catch(err => {
        console.log('[ERROR-ACCESS]' + err);
        console.log('doAccess ', JSON.stringify(err));
        setState({
          loadingAccess: false,
          successAccess: false,
          errorAccess: true,
        });
        setIsGarminLoading(false);
      });
  };

  const getGarminUserInfo = callback => {
    if (!state.token.key || !state.token.secret) {
      setState({
        successAccess: false,
        errorAccess: true,
      });
      return;
    }

    const authHeader = Oauth1Helper.getAuthHeaderForRequest(
      GET_GARMIN_USER_INFO,
      state.data,
    );

    dispatch(
      getGarminUserInfoRequest({
        payloadData: {
          headers: {...authHeader},
        },
        responseCallback: (status, data) => {
          console.log('getGarminUserInfoRequest', {status, data});
          if (status) {
            const authHeader = Oauth1Helper.getAuthHeaderForRequest(
              GET_GARMIN_USER_PERMISSIONS,
              state.data,
            );

            dispatch(
              getGarminUserPermissionsRequest({
                payloadData: {
                  headers: {...authHeader},
                },
                responseCallback: (status, permissions) => {
                  console.log({permissions});
                  if (status && permissions) {
                    if (!permissions?.permissions?.includes('HEALTH_EXPORT')) {
                      util.topAlertError(
                        'All permissions are required to connect to garmin.',
                      );
                      callback();
                      return;
                    }
                  }
                  if (status) {
                    const payload1 = {
                      data: {
                        token_key: state.data.key,
                        token_secret: state.data.secret,
                        user_profile: data,
                        user: {connect: [{id: user?.id}]},
                      },
                    };

                    dispatch(
                      createGarminUserRequest({
                        payloadData: {...payload1},
                        responseCallback: (status, data) => {
                          if (status) {
                            getAllGarminData(state.data, callback);
                          } else {
                            callback();
                          }
                        },
                      }),
                    );
                  } else {
                    callback();
                  }
                },
              }),
            );
          } else {
            callback();
          }
        },
      }),
    );

    // post(access.url, access.data, authHeader)
  };

  const createGarmin = data => {};

  return {
    doRequest,
    doAccess,
    prevLoadingAccess,
    prevLoadingRequest,
    setState,
    getGarminUserInfo,
    createGarmin,
    ...state,
  };
};
