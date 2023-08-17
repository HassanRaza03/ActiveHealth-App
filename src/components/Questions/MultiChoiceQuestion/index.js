import {View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import ButtonView from '../../ButtonView';
import {Colors, Fonts, Images} from '../../../theme';
import Text from '../../Text';

export default function MultiChoiceQuestion(props) {
  const {selectedQuestion, filledQuestions, setFilledQuestions} = props;
  const [selectedOption, setSelectedOption] = useState([]);

  useEffect(() => {
    const answer = filledQuestions?.find(
      item => item?.questionId === selectedQuestion?.id,
    );
    if (answer?.answer?.length > 0) {
      setSelectedOption([...answer?.answer]);
    } else setSelectedOption([]);
  }, [selectedQuestion]);

  useEffect(() => {
    const answerIdx = filledQuestions?.findIndex(
      item => item?.questionId === selectedQuestion?.id,
    );
    if (answerIdx > -1) {
      let allAnswers = [...filledQuestions];

      const answer = {
        ...allAnswers[answerIdx],
        answer: [...selectedOption],
        error: '',
        previousQuestionId: selectedQuestion?.previousQuestionId,
      };

      allAnswers[answerIdx] = {...answer};
      setFilledQuestions(allAnswers);
    } else {
      setFilledQuestions([
        ...filledQuestions,
        {
          question: selectedQuestion?.question,
          questionId: selectedQuestion?.id,
          answer: [...selectedOption],
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
      {selectedQuestion?.options?.map((item, index) => {
        return (
          <ButtonView
            onPress={() => {
              if (selectedOption.includes(item?.label)) {
                const removeArray = [...selectedOption].filter(
                  option => option != item?.label,
                );
                setSelectedOption(removeArray);
              } else {
                setSelectedOption([...selectedOption, item?.label]);
              }
            }}
            style={{marginTop: 20, flexDirection: 'row'}}>
            <Text
              color={Colors.black}
              type={Fonts.type.base}
              style={{fontSize: 14, fontWeight: '500', flex: 1}}>
              {item?.label}
            </Text>
            <View
              style={{
                width: 22,
                height: 22,
                borderRadius: 4,
                borderWidth: 1,
                borderColor: Colors.background.primary,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {selectedOption?.includes(item?.label) && (
                <Image source={Images.checkIcon} />
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
