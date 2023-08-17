// @flow
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';
import {View, Image} from 'react-native';
import {Text, ButtonView} from '../';
import styles from './styles';
import {Images, Fonts, Colors, AppStyles} from '../../theme';
import moment from 'moment';

const SurveyListItem = (props: Object) => {
  const nagivate = useNavigation();
  const {isActive, item, completedSurveys} = props;

  if (!isActive) {
    const {data, lastUpdate} = item;

    if (data.length === 1) {
      return (
        <ButtonView
          onPress={() =>
            nagivate.navigate('viewSurvery', {
              surveyId: data[0].id,
            })
          }
          style={styles.itemView}>
          <View style={styles.surveryIconView}>
            <Image source={Images.surveryIconWhite} />
          </View>
          <View style={styles.textsParent}>
            <Text
              color={'#1D1B25'}
              type={Fonts.type.base}
              style={styles.timeText}>
              {moment(lastUpdate).fromNow() + '\n'}
              <Text
                color={Colors.black}
                type={Fonts.type.base}
                style={styles.itemTxt}>
                {data[0]?.survey_title}
              </Text>
            </Text>
          </View>
        </ButtonView>
      );
    } else {
      return (
        <ButtonView
          onPress={() =>
            nagivate.navigate('completeSurveyList', {
              surveys: data,
            })
          }
          style={styles.itemView}>
          <View style={styles.surveryIconView}>
            <Image source={Images.surveryIconWhite} />
          </View>
          <View style={styles.textsParent}>
            <Text
              color={'#1D1B25'}
              type={Fonts.type.base}
              style={styles.timeText}>
              {moment(lastUpdate).fromNow() + '\n'}
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                color={Colors.black}
                type={Fonts.type.base}
                style={styles.itemTxt}>
                {data[0]?.survey_title}
              </Text>
            </Text>
          </View>
          <View style={styles.countView}>
            <Text style={styles.countText}>+{data.length}</Text>
            <Image source={Images.forwordIconWhite} />
          </View>
        </ButtonView>
      );
    }
  } else {
    return (
      <ButtonView
        onPress={() =>
          nagivate.navigate('individualSurvey', {
            surveyId: item?.item?.id,
          })
        }
        style={[styles.itemView, AppStyles.pRight10, AppStyles.pTop10]}>
        <View style={styles.surveryIconView}>
          <Image source={Images.surveryIconWhite} />
        </View>
        <Text
          color={Colors.black}
          type={Fonts.type.base}
          style={styles.itemTxt}>
          {item?.item?.title}
        </Text>
      </ButtonView>
    );
  }
};

SurveyListItem.propTypes = {
  item: PropTypes.object.isRequired,
  completedSurveys: PropTypes.object.isRequired,
  isActive: PropTypes.bool,
};

SurveyListItem.defaultProps = {
  isActive: false,
};

export default SurveyListItem;
