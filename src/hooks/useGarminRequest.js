import {
  GET_GARMIN_BR_DATA,
  GET_GARMIN_DAILY_DATA,
  GET_GARMIN_SLEEP_DATA,
  GET_GARMIN_SPO2_DATA,
} from '../config/WebService';
import {Oauth1Helper} from './oauth';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {
  getGarminBrDataRequest,
  getGarminDailyDataRequest,
  getGarminSleepDataRequest,
  getGarminSpo2DataRequest,
} from '../redux/slicers/user';
import _ from 'lodash';

function useGarminRequest() {
  const dispatch = useDispatch();

  const getAllGarminData = (token, callback = () => {}) => {
    if (_.isEmpty(token)) {
      callback();
      return;
    }

    const todayCurrentTime = parseInt(
      new Date(moment().local(true)).getTime() / 1000,
    );
    const todayStartTime = parseInt(
      new Date(
        moment().local(true).format('YYYY-MM-DD') + 'T00:00:00',
      ).getTime() / 1000,
    );

    const requestUrl = {
      ...GET_GARMIN_DAILY_DATA,
      url: `${GET_GARMIN_DAILY_DATA.url}?uploadStartTimeInSeconds=${todayStartTime}&uploadEndTimeInSeconds=${todayCurrentTime}`,
    };
    const headers = Oauth1Helper.getAuthHeaderForRequest(requestUrl, token);

    dispatch(
      getGarminDailyDataRequest({
        payloadData: {
          headers: {...headers},
          params: {
            uploadStartTimeInSeconds: todayStartTime,
            uploadEndTimeInSeconds: todayCurrentTime,
          },
        },
        responseCallback: (status, data) => {
          const requestUrl1 = {
            ...GET_GARMIN_SLEEP_DATA,
            url: `${GET_GARMIN_SLEEP_DATA.url}?uploadStartTimeInSeconds=${todayStartTime}&uploadEndTimeInSeconds=${todayCurrentTime}`,
          };
          const headers1 = Oauth1Helper.getAuthHeaderForRequest(
            requestUrl1,
            token,
          );

          dispatch(
            getGarminSleepDataRequest({
              payloadData: {
                headers: {...headers1},
                params: {
                  uploadStartTimeInSeconds: todayStartTime,
                  uploadEndTimeInSeconds: todayCurrentTime,
                },
              },

              responseCallback: (status, data) => {
                const requestUrl1 = {
                  ...GET_GARMIN_BR_DATA,
                  url: `${GET_GARMIN_BR_DATA.url}?uploadStartTimeInSeconds=${todayStartTime}&uploadEndTimeInSeconds=${todayCurrentTime}`,
                };
                const headers1 = Oauth1Helper.getAuthHeaderForRequest(
                  requestUrl1,
                  token,
                );

                dispatch(
                  getGarminBrDataRequest({
                    payloadData: {
                      headers: {...headers1},
                      params: {
                        uploadStartTimeInSeconds: todayStartTime,
                        uploadEndTimeInSeconds: todayCurrentTime,
                      },
                    },
                    responseCallback: (status, data) => {
                      const requestUrl1 = {
                        ...GET_GARMIN_SPO2_DATA,
                        url: `${GET_GARMIN_SPO2_DATA.url}?uploadStartTimeInSeconds=${todayStartTime}&uploadEndTimeInSeconds=${todayCurrentTime}`,
                      };
                      const headers1 = Oauth1Helper.getAuthHeaderForRequest(
                        requestUrl1,
                        token,
                      );

                      dispatch(
                        getGarminSpo2DataRequest({
                          payloadData: {
                            headers: {...headers1},
                            params: {
                              uploadStartTimeInSeconds: todayStartTime,
                              uploadEndTimeInSeconds: todayCurrentTime,
                            },
                          },
                          responseCallback: (status, data) => {
                            console.log(
                              'CALLING CALLBACK  GARMIN REQUEST ---> ',
                            );
                            callback();
                          },
                        }),
                      );
                    },
                  }),
                );
              },
            }),
          );
        },
      }),
    );
  };

  // const getAllGarminInfo = (token, callback) => {
  //   if (!token.key || !token.secret) {
  //     return;
  //   }

  //   const authHeader = Oauth1Helper.getAuthHeaderForRequest(
  //     GET_GARMIN_USER_INFO,
  //     token,
  //   );

  // const todayCurrentTime = parseInt(
  //   new Date(moment().local(true)).getTime() / 1000,
  // );
  // const todayStartTime = parseInt(
  //   new Date(
  //     moment().local(true).format('YYYY-MM-DD') + 'T00:00:00',
  //   ).getTime() / 1000,
  // );

  //   console.log({todayCurrentTime, todayStartTime});

  //   dispatch(
  //     getGarminUserInfoRequest({
  //       payloadData: {
  //         headers: {...authHeader},
  //       },
  //       responseCallback: (status, data) => {
  //         console.log('getGarminUserInfoRequest', {status, data});
  //         if (status) {
  //           const payload1 = {
  //             data: {
  //               token_key: token.key,
  //               token_secret: token.secret,
  //               user_profile: data,
  //               user: {connect: [{id: user?.id}]},
  //             },
  //           };

  //           dispatch(
  //             createGarminUserRequest({
  //               payloadData: {...payload1},
  //               responseCallback: (status, data) => {
  //                 if (status) {
  //                   const requestUrl = {
  //                     ...GET_GARMIN_DAILY_DATA,
  //                     url: `${GET_GARMIN_DAILY_DATA.url}?uploadStartTimeInSeconds=${todayStartTime}&uploadEndTimeInSeconds=${todayCurrentTime}`,
  //                   };
  //                   const headers = Oauth1Helper.getAuthHeaderForRequest(
  //                     requestUrl,
  //                     token,
  //                   );

  //                   dispatch(
  //                     getGarminDailyDataRequest({
  //                       payloadData: {
  //                         headers: {...headers},
  //                         params: {
  //                           uploadStartTimeInSeconds: todayStartTime,
  //                           uploadEndTimeInSeconds: todayCurrentTime,
  //                         },
  //                       },
  //                       responseCallback: (status, data) => {
  //                         const requestUrl1 = {
  //                           ...GET_GARMIN_SLEEP_DATA,
  //                           url: `${GET_GARMIN_SLEEP_DATA.url}?uploadStartTimeInSeconds=${todayStartTime}&uploadEndTimeInSeconds=${todayCurrentTime}`,
  //                         };
  //                         const headers1 = Oauth1Helper.getAuthHeaderForRequest(
  //                           requestUrl1,
  //                           token,
  //                         );

  //                         dispatch(
  //                           getGarminSleepDataRequest({
  //                             payloadData: {
  //                               headers: {...headers1},
  //                               params: {
  //                                 uploadStartTimeInSeconds: todayStartTime,
  //                                 uploadEndTimeInSeconds: todayCurrentTime,
  //                               },
  //                             },

  //                             responseCallback: (status, data) => {
  //                               const requestUrl1 = {
  //                                 ...GET_GARMIN_BR_DATA,
  //                                 url: `${GET_GARMIN_BR_DATA.url}?uploadStartTimeInSeconds=${todayStartTime}&uploadEndTimeInSeconds=${todayCurrentTime}`,
  //                               };
  //                               const headers1 =
  //                                 Oauth1Helper.getAuthHeaderForRequest(
  //                                   requestUrl1,
  //                                   token,
  //                                 );

  //                               dispatch(
  //                                 getGarminBrDataRequest({
  //                                   payloadData: {
  //                                     headers: {...headers1},
  //                                     params: {
  //                                       uploadStartTimeInSeconds:
  //                                         todayStartTime,
  //                                       uploadEndTimeInSeconds:
  //                                         todayCurrentTime,
  //                                     },
  //                                   },
  //                                   responseCallback: (status, data) => {
  //                                     const requestUrl1 = {
  //                                       ...GET_GARMIN_SPO2_DATA,
  //                                       url: `${GET_GARMIN_SPO2_DATA.url}?uploadStartTimeInSeconds=${todayStartTime}&uploadEndTimeInSeconds=${todayCurrentTime}`,
  //                                     };
  //                                     const headers1 =
  //                                       Oauth1Helper.getAuthHeaderForRequest(
  //                                         requestUrl1,
  //                                         token,
  //                                       );

  //                                     dispatch(
  //                                       getGarminSpo2DataRequest({
  //                                         payloadData: {
  //                                           headers: {...headers1},
  //                                           params: {
  //                                             uploadStartTimeInSeconds:
  //                                               todayStartTime,
  //                                             uploadEndTimeInSeconds:
  //                                               todayCurrentTime,
  //                                           },
  //                                         },
  //                                         responseCallback: (status, data) => {
  //                                           callback();
  //                                         },
  //                                       }),
  //                                     );
  //                                   },
  //                                 }),
  //                               );
  //                             },
  //                           }),
  //                         );
  //                       },
  //                     }),
  //                   );
  //                 } else {
  //                   callback();
  //                 }
  //               },
  //             }),
  //           );
  //         } else {
  //           callback();
  //         }
  //       },
  //     }),
  //   );

  //   // post(access.url, access.data, authHeader)
  // };

  return {getAllGarminData};
}

export default useGarminRequest;
