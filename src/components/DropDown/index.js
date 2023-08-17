import {Image, View} from 'react-native';
import React from 'react';
import Text from '../Text';
import styles from './styles';
import {MultiSelect} from 'react-native-element-dropdown';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Images} from '../../theme';

const DropDown = props => {
  const {
    label,
    data,
    value,
    setValue,
    placeholder,
    leftIcon,
    rightIcon,
    isDark,
  } = props;
  return (
    <View style={styles.txtLogin}>
      <Text
        style={[
          styles.labelStyle,
          isDark && {color: '#000'},
          {
            fontSize: 12,
            fontWeight: '400',
          },
        ]}>
        {/* Select Groups */}
        {label}
      </Text>
      <MultiSelect
        style={[styles.inputViewStyles, isDark && {borderColor: '#000'}]}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField="title"
        valueField="id"
        placeholder={placeholder}
        placeholderStyle={[styles.placeholderStyle, isDark && {color: '#000'}]}
        value={value}
        inverted={false}
        dropdownPosition="top"
        alwaysRenderSelectedItem
        onChange={item => {
          setValue(item);
        }}
        renderLeftIcon={() => (
          <Image
            style={[
              styles.icon,
              {
                width: 14.35,
                height: 16.14,
              },
            ]}
            source={leftIcon}
          />
        )}
        renderRightIcon={() => (
          <Image
            style={[
              styles.icon,
              {
                height: 8.37,
                width: 16.33,
              },
            ]}
            source={rightIcon}
          />
        )}
        renderSelectedItem={(item, unSelect) => (
          <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
            <View
              style={[
                styles.selectedItem,
                isDark && {
                  opacity: 0.6,
                },
              ]}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.selectedItemLabel}>
                {item.label}
              </Text>
              <Image
                source={Images.groupDelete}
                style={styles.selectedItemIcon}
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default DropDown;
