// @flow
import _ from 'lodash';
import {create} from 'apisauce';
import {
  API_LOG,
  BASE_URL,
  API_TIMEOUT,
  ERROR_SOMETHING_WENT_WRONG,
  ERROR_NETWORK_NOT_AVAILABLE,
} from '../config/WebService';
import util, {logoutUser} from '../util';

const api = create({
  baseURL: BASE_URL,
  timeout: API_TIMEOUT,
});

class ApiSauce {
  async post(url, data, headers, baseUrl) {
    api.setBaseURL(baseUrl);

    console.log({data});

    const response = await api.post(url, data, {
      headers,
    });

    if (__DEV__ && API_LOG) {
      console.log('url', url);
      console.log('data', data);
      console.log('headers', headers);
      console.log(response);
    }

    return this.manipulateResponse(response);
  }

  async get(url, data, headers, baseUrl) {
    api.setBaseURL(baseUrl);
    const response = await api.get(url, data, {
      headers,
    });

    if (__DEV__ && API_LOG) {
      console.log('url', url);
      console.log('headers', headers);
      console.log(response);
    }

    return this.manipulateResponse(response);
  }

  async delete(url, data, headers, baseUrl) {
    api.setBaseURL(baseUrl);
    const response = await api.delete(
      url,
      {},
      {
        headers,
      },
    );

    if (__DEV__ && API_LOG) {
      console.log('url', url);
      console.log('headers', headers);
      console.log(response);
    }

    return this.manipulateResponse(response);
  }

  async put(url, data, headers, baseUrl) {
    api.setBaseURL(baseUrl);
    const response = await api.put(url, data, {
      headers,
    });

    if (__DEV__ && API_LOG) {
      console.log('url', url);
      console.log('data', data);
      console.log('headers', headers);
      console.log(response);
    }

    return this.manipulateResponse(response);
  }

  manipulateResponse(response) {
    return new Promise((resolve, reject) => {
      if (response.ok && response.data && !response.data.error) {
        resolve(response.data);
      } else {
        console.log(response);

        if (response.status === 401) {
          util.topAlertError(
            'Authorization error please contact administrator.',
          );
          logoutUser();
        }

        if (response.status === 400) {
          if (
            response?.data?.error?.message === 'Invalid identifier or password'
          ) {
            util.topAlertError('Either your email or password is incorrect.');
          } else {
            util.topAlertError(response?.data?.error?.message);
          }
        }

        if (response.status === 500) {
          reject(ERROR_SOMETHING_WENT_WRONG.error);
        }

        if (response.problem === 'NETWORK_ERROR') {
          util.topAlertError(ERROR_NETWORK_NOT_AVAILABLE.error);
        }

        reject(
          response?.error?.error ||
            response?.data?.errorMessage ||
            ERROR_SOMETHING_WENT_WRONG.error,
        );
      }
    });
  }
}

export default new ApiSauce();
