// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {
  TextInput as RNTextInput,
  ViewPropTypes,
  View,
  Image,
} from 'react-native';
import _ from 'lodash';
import {ButtonView, Text} from '../';
import {Colors, AppStyles, Images, Fonts} from '../../theme';
import styles from './styles';
import {Icon} from '../Icon';

export default class TextInput extends React.PureComponent {
  static propTypes = {
    label: ViewPropTypes.style,
    error: PropTypes.string,
    containerStyle: ViewPropTypes.style,
    onPress: PropTypes.func,
    multiline: PropTypes.bool,
    inputStyle: ViewPropTypes.style,
    inputViewStyle: ViewPropTypes.style,
    labelStyle: ViewPropTypes.style,
    icon: ViewPropTypes.Image,
    rigthIcon: ViewPropTypes.Image,
    tintColorIcon: ViewPropTypes.style,
  };

  static defaultProps = {
    error: '',
    label: '',
    containerStyle: {},
    onPress: null,
    multiline: false,
    inputStyle: {},
    labelStyle: {},
    inputViewStyle: {},
    icon: Images.ArrowRight,
    rigthIcon: undefined,
    tintColorIcon: Colors.white,
  };

  focus() {
    this.myRef.focus();
  }

  blur() {
    this.myRef.blur();
  }

  render() {
    const {
      label,
      error,
      containerStyle,
      onPress,
      multiline,
      inputStyle,
      labelStyle,
      icon,
      inputViewStyle,
      rigthIcon,
      tintColorIcon,
      ...rest
    } = this.props;
    return (
      <View style={containerStyle}>
        <Text
          type={Fonts.type.base}
          style={[styles.lablestyle, labelStyle]}
          color={Colors.grey2}>
          {label}
        </Text>

        <View style={[styles.inputView, inputViewStyle]}>
          <Image
            tintColor={tintColorIcon}
            source={icon}
            style={styles.arrowIcon}
          />
          {/* <Icon name={'email'} /> */}
          <RNTextInput
            ref={ref => {
              this.myRef = ref;
            }}
            style={[
              styles.input,
              inputStyle,
              multiline ? styles.multilineInput : {},
            ]}
            blurOnSubmit={false}
            selectionColor={Colors.white}
            multiline={multiline}
            {...rest}
          />
          {!_.isUndefined(rigthIcon) && (
            <ButtonView onPress={onPress}>
              <Image source={rigthIcon} style={styles.rightIcon} />
            </ButtonView>
          )}
        </View>

        {!_.isEmpty(error) && !_.isUndefined(error) && !_.isNull(error) && (
          <Text
            // type="medium"
            size="small"
            color={Colors.red}
            style={[AppStyles.mTop5, AppStyles.mBottom5]}>
            {error}
          </Text>
        )}
      </View>
    );
  }
}
