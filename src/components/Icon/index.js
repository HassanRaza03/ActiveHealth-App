import React from 'react';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';

import iconsSelection from '../../../selection.json';
import {Colors} from '../../theme';

const IconSetFromIcoMoon = createIconSetFromIcoMoon(
  iconsSelection,
  'icomoon',
  'icomoon.ttf',
);

export const Icon = ({name, color = 'gray'}) => (
  <IconSetFromIcoMoon color={Colors[color]} name={name} />
);
