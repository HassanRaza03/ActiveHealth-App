// @flow

import {Platform} from 'react-native';

const type = {
  /* base: "ParalucentText-Book",
  medium: "Paralucent-Medium" */
  base: Platform.select({
    ios: 'Poppins-Medium',
    android: 'Poppins-Medium',
  }),
  bold: Platform.select({
    ios: 'Poppins-Bold',
    android: 'Poppins-Bold',
  }),
  italic: Platform.select({
    ios: 'Poppins-Italic',
    android: 'Poppins-Italic',
  }),
};

// Metrics.generatedFontSize(ios, android)

const size = {
  xxxxSmall: 10,
  xxxSmall: 11,
  xxSmall: 13,
  xSmall: 14,
  small: 15,
  normal: 17,
  medium: 18,
  large: 20,
  xLarge: 24,
  xxLarge: 30,
  xxxLarge: 36,
  xxxxLarge: 40,
};

export default {
  type,
  size,
};
