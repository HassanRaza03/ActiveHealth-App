// @flow
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {View, Image} from 'react-native';
import {Text, ButtonView, SearchBar} from '../';
import styles from './styles';
import {Images, AppStyles, Colors, Metrics, Fonts} from '../../theme';

export default class CustomNavbar extends React.Component {
  static propTypes = {
    hasBack: PropTypes.bool,
    title: PropTypes.string.isRequired,
    leftBtnImage: PropTypes.number,
    leftBtnPress: PropTypes.func,
    leftBtnText: PropTypes.string,
    rightBtnImage: PropTypes.number,
    rightBtnPress: PropTypes.func,
    rightBtnText: PropTypes.string,
    titleColor: PropTypes.string,
    hasBorder: PropTypes.bool,
    style: PropTypes.object,
    hasSearch: PropTypes.bool,
    onSearchText: PropTypes.func,
    isSearching: PropTypes.bool,
    notificationCount: PropTypes.number,
  };

  static defaultProps = {
    hasBack: true,
    titleColor: '',
    leftBtnImage: undefined,
    leftBtnPress: () => {},
    leftBtnText: '',
    rightBtnImage: undefined,
    rightBtnPress: () => {},
    rightBtnText: '',
    hasBorder: true,
    style: {},
    hasSearch: false,
    onSearchText: () => {},
    isSearching: false,
    notificationCount: 0,
  };

  renderLeft(leftBtnImage, leftBtnPress, leftBtnText, hasBack) {
    const renderBack =
      hasBack && _.isEmpty(leftBtnText) && _.isEmpty(leftBtnImage);

    return (
      <ButtonView onPress={leftBtnPress} style={styles.btnWrapper}>
        {!_.isEmpty(leftBtnText) && <Text>{leftBtnText}</Text>}
        {!_.isUndefined(leftBtnImage) && (
          <Image source={leftBtnImage} size={styles.btnImage} />
        )}
        {renderBack && (
          <Image source={Images.back_btn} size={styles.btnImage} />
        )}
      </ButtonView>
    );
  }

  renderRight(rightBtnImage, rightBtnPress, rightBtnText, notificationCount) {
    return (
      <ButtonView
        onPress={rightBtnPress}
        style={[styles.btnWrapper, styles.rightBtn]}>
        {!_.isEmpty(rightBtnText) && (
          <Text
            // type="medium"
            numberOfLines={1}
            ellipsizeMode="tail"
            color="white"
            size="small">
            {rightBtnText}
          </Text>
        )}
        {!_.isUndefined(rightBtnImage) && (
          <View>
            <Image
              source={rightBtnImage}
              size={styles.btnImage}
              // style={{zIndex: 11}}
            />
            {notificationCount > 0 && (
              <View
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 10,
                  position: 'absolute',
                  backgroundColor: 'red',
                  top: -10,
                  right: -5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  color="white"
                  size="xxxxSmall"
                  style={{fontSize: 8}}>
                  {notificationCount > 99 ? '99+' : notificationCount}
                </Text>
              </View>
            )}
          </View>
        )}
      </ButtonView>
    );
  }

  renderTitle(title, titleColor) {
    return (
      <View style={[AppStyles.flex, AppStyles.centerInner]}>
        <Text
          color={titleColor || Colors.blue1}
          type={Fonts.type.base}
          numberOfLines={1}
          style={styles.txt}
          ellipsizeMode="tail"
          size="medium">
          {title || ''}
        </Text>
      </View>
    );
  }

  renderSearch(onSearchText, isSearching) {
    return <SearchBar onSearchText={onSearchText} isSearching={isSearching} />;
  }

  render() {
    const {
      hasBack,
      title,
      leftBtnImage,
      leftBtnPress,
      leftBtnText,
      rightBtnImage,
      rightBtnPress,
      rightBtnText,
      titleColor,
      hasBorder,
      style,
      hasSearch,
      onSearchText,
      isSearching,
      notificationCount,
    } = this.props;
    return (
      <View
        style={[
          styles.container,
          style,
          hasBorder ? styles.borderBottom : {},
          hasSearch ? styles.searchHeader : {},
        ]}>
        <View style={AppStyles.flexRow}>
          {this.renderLeft(leftBtnImage, leftBtnPress, leftBtnText, hasBack)}
          {this.renderTitle(title, titleColor)}
          {this.renderRight(
            rightBtnImage,
            rightBtnPress,
            rightBtnText,
            notificationCount,
          )}
        </View>

        {hasSearch && (
          <View style={AppStyles.centerInner}>
            {this.renderSearch(onSearchText, isSearching)}
          </View>
        )}
      </View>
    );
  }
}
