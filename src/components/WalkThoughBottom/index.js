import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors, Images} from '../../theme';
import styles from './styles';

export default function WalkthoughBottom(props) {
  const {onPress, step} = props || {};
  return (
    <View style={styles.mainView}>
      <View style={styles.stepView}>
        <View
          style={[
            styles.dotView,
            step == 1 && {backgroundColor: Colors.white},
          ]}>
          {step == 1 && <View style={styles.selectedDotLine} />}
        </View>
        <View
          style={[
            styles.dotView,
            step == 2 && {backgroundColor: Colors.white},
          ]}>
          {step == 2 && <View style={styles.selectedDotLine} />}
        </View>
      </View>

      <TouchableOpacity onPress={onPress} style={styles.nextBtn}>
        <Image source={Images.ArrowRight} />
      </TouchableOpacity>
    </View>
  );
}
