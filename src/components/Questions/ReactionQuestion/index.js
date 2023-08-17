import {View, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors, Fonts, Images} from '../../../theme';
import ButtonView from '../../ButtonView';
import Text from '../../Text';
import {imagesArray} from '../../../constants';
import Reactions from '../../Reactions';

export default function ReactionQuestion(props) {
  const {selectedQuestion, filledQuestions, setFilledQuestions} = props;
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const answer = filledQuestions?.find(
      item => item?.questionId === selectedQuestion?.id,
    );

    if (answer) {
      setSelectedOption(answer?.answer);
    } else setSelectedOption('');
  }, [selectedQuestion?.id]);

  useEffect(() => {
    const answerIdx = filledQuestions?.findIndex(
      item => item?.questionId === selectedQuestion?.id,
    );

    if (answerIdx > -1) {
      let allAnswers = [...filledQuestions];

      const answer = {
        ...allAnswers[answerIdx],
        answer: `${selectedOption}`,
        error: '',
        previousQuestionId: selectedQuestion?.previousQuestionId,
      };

      allAnswers[answerIdx] = answer;
      setFilledQuestions(allAnswers);
    } else {
      setFilledQuestions([
        ...filledQuestions,
        {
          question: selectedQuestion?.question,
          questionId: selectedQuestion?.id,
          answer: `${selectedOption}`,
          questionType: selectedQuestion?.questionType,
          error: '',
          previousQuestionId: selectedQuestion?.previousQuestionId,
        },
      ]);
    }
  }, [selectedOption]);

  const filledAnswer = filledQuestions?.find(
    ans => ans?.questionId == selectedQuestion?.id,
  );

  return (
    <View style={{flex: 1, padding: 10}}>
      <Text
        color={Colors.black}
        type={Fonts.type.base}
        style={{fontSize: 14, fontWeight: '400'}}>
        {selectedQuestion?.question}{' '}
        {selectedQuestion?.is_required && <Text style={{color: 'red'}}>*</Text>}
      </Text>
      <Reactions
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        isEdit
      />

      {filledAnswer?.error && (
        <Text
          style={{
            fontSize: 12,
            fontWeight: '400',
            color: 'red',
            marginTop: 20,
          }}>
          *{filledAnswer?.error}
        </Text>
      )}

      {/* <View style={{flexDirection: 'row'}}>
        {imagesArray.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => setSelectedOption(item?.title)}
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
                  selectedOption === index
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
      </View> */}
    </View>
  );
}
