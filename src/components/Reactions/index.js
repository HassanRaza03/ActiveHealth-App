import {Image, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Colors, Fonts} from '../../theme';
import {imagesArray} from '../../constants';
import Text from '../Text';

const Reactions = props => {
  const {selectedOption = '', setSelectedOption = () => {}, isEdit} = props;
  return (
    <View style={{flexDirection: 'row'}}>
      {imagesArray.map((item, index) => {
        return (
          <TouchableOpacity
            onPress={() => isEdit && setSelectedOption(item?.title)}
            style={{
              marginHorizontal: 10,
              alignItems: 'center',
              marginTop: 20,
              height: 40,
            }}>
            <Image
              style={{height: 30, width: 30}}
              resizeMode="cover"
              source={
                selectedOption === item?.title ? item.selectIcon : item.icon
              }
            />
            <Text
              color={Colors.black}
              type={Fonts.type.base}
              style={[
                {fontSize: 9, marginTop: 10},
                selectedOption === item?.title
                  ? {color: Colors.background.primary}
                  : {
                      color: 'rgba(227, 227, 227, 1)',
                    },
              ]}>
              {item.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Reactions;
