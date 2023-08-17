ChoiceQuestion;
import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors, Fonts} from '../../../theme';
import ButtonView from '../../ButtonView';
import Text from '../../Text';

export default function ChoiceQuestion(props) {
  const {selectedQuestion, filledQuestions, setFilledQuestions} = props;
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    const answer = filledQuestions?.find(
      item => item?.questionId === selectedQuestion?.id,
    );
    if (answer?.answer?.length > 0) {
      setSelectedOption(answer?.answer);
    } else setSelectedOption('');
  }, [selectedQuestion]);

  useEffect(() => {
    const answerIdx = filledQuestions?.findIndex(
      item => item?.questionId === selectedQuestion?.id,
    );
    if (answerIdx > -1) {
      let allAnswers = [...filledQuestions];

      const answer = {
        ...allAnswers[answerIdx],
        answer: selectedOption,
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
          answer: selectedOption,
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
      {selectedQuestion?.options?.map((item, index) => {
        return (
          <ButtonView
            onPress={() => setSelectedOption(item?.label)}
            style={{marginTop: 20, flexDirection: 'row'}}>
            <Text
              color={Colors.black}
              type={Fonts.type.base}
              style={{flex: 1, fontSize: 14, fontWeight: '500'}}>
              {item?.label}
            </Text>
            <View
              style={{
                width: 22,
                height: 22,
                borderRadius: 11,
                borderWidth: 1,
                borderColor: 'rgba(29, 27, 37, 0.4)',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {selectedOption == item?.label && (
                <View
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 6,
                    backgroundColor: Colors.background.primary,
                  }}
                />
              )}
            </View>
          </ButtonView>
        );
      })}

      {filledAnswer?.error && (
        <Text
          style={{
            fontSize: 12,
            fontWeight: '400',
            color: 'red',
            marginTop: 10,
          }}>
          *{filledAnswer?.error}
        </Text>
      )}
    </View>
  );
}
