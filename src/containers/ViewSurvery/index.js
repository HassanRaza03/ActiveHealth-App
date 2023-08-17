import {View, Text, FlatList} from 'react-native';
import React from 'react';
import {CustomNavbar, Reactions} from '../../components';
import {Colors, Images} from '../../theme';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import _ from 'lodash';

export default function ViewSurvery({route}) {
  const nagivate = useNavigation();
  const {surveyId} = route?.params;

  const completedSurveys = useSelector(
    state => state?.surveyQuestions?.completedSurveys,
  );
  let tempCompletedSurveys = [];
  completedSurveys.forEach(element => {
    tempCompletedSurveys = [...tempCompletedSurveys, ...element?.data];
  });
  // for (const key in completedSurveys) {
  //   if (Object.hasOwnProperty.call(completedSurveys, key)) {
  //     const element = completedSurveys[key];
  //     tempCompletedSurveys = [...tempCompletedSurveys, ...element];
  //   }
  // }
  const selectedSurvey = tempCompletedSurveys?.find(
    item => item?.id === surveyId,
  );

  return (
    <View style={styles.container}>
      <CustomNavbar
        hasBorder={false}
        title={selectedSurvey?.survey_title}
        leftBtnPress={() => nagivate.goBack()}
        leftBtnImage={Images.backIconBlack}
      />
      <View
        style={{
          width: '90%',
          borderRadius: 12,
          flex: 1,
          backgroundColor: Colors.white,
          marginBottom: 20,
        }}>
        <FlatList
          data={selectedSurvey?.question_info}
          showsVerticalScrollIndicator={false}
          renderItem={({index, item}) => {
            const answersArray = [...item?.answers]?.map(a => a?.answer);

            let answer = '';
            if (answersArray?.length > 0) {
              if (_.isEmpty(answersArray[0])) {
                answer = 'Answer is not given';
              } else {
                answer = answersArray?.join(', ');
              }
            } else {
              answer = 'Answer is not given';
            }

            return (
              <View style={{padding: 20, paddingBottom: 10}}>
                <Text style={{fontSize: 14, fontWeight: '400'}}>
                  {index + 1}. {item?.question}
                </Text>
                {!item?.isReactionQuestion && (
                  <Text
                    style={{marginTop: 10, fontSize: 14, fontWeight: '500'}}>
                    {answer}
                  </Text>
                )}

                {item?.isReactionQuestion && (
                  <Reactions selectedOption={answer} />
                )}
                <View
                  style={{
                    width: '100%',
                    height: 0.5,
                    marginTop: item?.isReactionQuestion ? 25 : 15,
                    backgroundColor: 'rgba(29, 27, 37, 0.2)',
                  }}
                />
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}
