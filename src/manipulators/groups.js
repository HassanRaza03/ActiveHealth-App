import _ from 'lodash';

export function getAllGroupsManipulator(list) {
  try {
    if (_.isEmpty(list)) {
      return [];
    }

    const allGroups = [];

    for (let group of list) {
      const payload = {
        id: group?.id ?? '',
        value: group?.id ?? '',
        title: group?.attributes?.title ?? '',
        label: group?.attributes?.title ?? '',
      };

      allGroups.push(payload);
    }

    return allGroups;
  } catch (error) {
    console.log(error);
    console.warn(JSON.stringify(error));
    return [];
  }
}

export function getUserGroupsManipulator(list) {
  try {
    if (_.isEmpty(list)) {
      return [];
    }

    const allGroups = [];

    for (let group of list) {
      if (group?.blocked) continue;

      const payload = {
        id: group?.id ?? '',
        value: group?.id ?? '',
        title: group?.title ?? '',
        label: group?.title ?? '',
      };

      allGroups.push(payload);
    }

    return allGroups;
  } catch (error) {
    console.log(error);
    console.warn(JSON.stringify(error));
    return [];
  }
}
