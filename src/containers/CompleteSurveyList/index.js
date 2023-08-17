import React from 'react';
import {FlatList, View, Image} from 'react-native';
import {CustomNavbar, Text, ButtonView} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import styles from './styles';
import moment from 'moment';
import _ from 'lodash';

export default function CompleteSurveyList({route}) {
  const {surveys} = route?.params;
  const sortedSurveys = _.cloneDeep(surveys);
  sortedSurveys.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const nagivate = useNavigation();
  return (
    <View style={styles.container}>
      <CustomNavbar
        hasBorder={false}
        style={{backgroundColor: Colors.background.secondary}}
        title={sortedSurveys[0]?.survey_title}
        leftBtnPress={() => nagivate.goBack()}
        leftBtnImage={Images.backIconBlack}
      />

      <FlatList
        data={sortedSurveys}
        contentContainerStyle={{paddingBottom: 20}}
        showsVerticalScrollIndicator={false}
        renderItem={item => {
          return (
            <ButtonView
              onPress={() =>
                nagivate.navigate('viewSurvery', {
                  surveyId: item?.item?.id,
                })
              }
              style={[styles.itemView]}>
              <View style={styles.surveryIconView}>
                <Image source={Images.surveryIconWhite} />
              </View>
              <View
                style={[AppStyles.flex, AppStyles.pRight20, AppStyles.pTop10]}>
                <Text
                  style={styles.timeText}
                  color={Colors.black}
                  type={Fonts.type.base}>
                  {moment(item.item?.createdAt).format(
                    'DD, MMM, YYYY - hh:mm a',
                  )}
                </Text>
                <Text
                  color={Colors.black}
                  type={Fonts.type.base}
                  style={styles.itemTxt}>
                  {item.item?.survey_title}
                </Text>
              </View>
            </ButtonView>
          );
        }}
      />
    </View>
  );
}
