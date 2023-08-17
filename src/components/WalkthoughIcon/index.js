import {View} from 'react-native';
import React from 'react';
import {Colors, Fonts} from '../../theme';
import Text from '../Text';

export default function WalkthoughIcon() {
  return (
    <View
      style={{alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
      <View
        style={{
          width: 84,
          height: 84,
          borderRadius: 42,
          backgroundColor: Colors.white,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          type={Fonts.type.base}
          style={{color: Colors.text.primary, fontSize: 42}}>
          AP
        </Text>
      </View>
      <Text
        color={Colors.black}
        type={Fonts.type.base}
        style={{
          color: Colors.white,
          fontSize: 30,
          marginTop: 10,
          fontWeight: '700',
        }}>
        AP WELLNESS
      </Text>
    </View>
  );
}
