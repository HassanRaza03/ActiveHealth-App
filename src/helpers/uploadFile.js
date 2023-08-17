import axios from 'axios';
import {BASE_URL, UPLOAD_FILE} from '../config/WebService';

export const uploadFileAction = async data => {
  try {
    const response = await fetch(BASE_URL + UPLOAD_FILE.route, {
      method: 'POST',
      body: data,
    });

    const res = await response.json();

    return res;
  } catch (error) {
    console.log('upload file error ', error);
    console.log('upload file error ', error.response);
  }
};
