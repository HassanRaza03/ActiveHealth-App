import {NOTIFICATIONS} from '../constants';
import util from '../util';

export function manipulateNotificationList(list) {
  if (util.isArrayEmpty(list)) return [];
  let mArtList = [];
  list.forEach((item, index) => {
    let mNotificationObj = manipulateNotification(item);
    mArtList.push(mNotificationObj);
  });
  return mArtList;
}

export function manipulateNotification(payload) {
  const {notification_type, extra_data} = payload || {};
  const extraData = JSON.parse(extra_data) || {};
  let mNotObj = {};
  switch (notification_type) {
    case NOTIFICATIONS.USER_FOLLOWED_YOU: {
      mNotObj['id'] = payload?.id ?? 0;
      mNotObj['user'] = extraData?.user ?? {};
      mNotObj['silent'] = payload?.silent ?? 'false';
      mNotObj['title'] = payload?.title ?? '';
      mNotObj['post'] = payload?.art ?? {};
      mNotObj['isSeen'] = payload?.is_read ?? false;
      mNotObj['createdAt'] = payload?.date ?? '';
      mNotObj['type'] = payload?.notification_type ?? '';
      break;
    }

    default: {
      break;
    }
  }
  return mNotObj;
}
