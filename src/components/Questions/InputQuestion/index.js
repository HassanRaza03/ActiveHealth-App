import {View, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors, Fonts} from '../../../theme';
import Text from '../../Text';

export default function InputQuestion(props) {
  const {selectedQuestion, filledQuestions, setFilledQuestions} = props;
  const [input, setInput] = useState('');

  useEffect(() => {
    const answerIdx = filledQuestions?.findIndex(
      item => item?.questionId === selectedQuestion?.id,
    );
    const answer = filledQuestions[answerIdx];

    if (answerIdx > -1 && answer) {
      setInput(answer?.answer);
    } else {
      setInput('');
    }
  }, [selectedQuestion?.id]);

  useEffect(() => {
    const findAnswerIdx = filledQuestions?.findIndex(
      ans => ans?.questionId === selectedQuestion?.id,
    );

    if (findAnswerIdx > -1) {
      const allAnswers = [...filledQuestions];
      const answer = {...filledQuestions[findAnswerIdx], answer: input};

      allAnswers[findAnswerIdx] = {
        ...answer,
        previousQuestionId: selectedQuestion?.previousQuestionId,
        error: '',
      };
      setFilledQuestions(allAnswers);
    } else {
      setFilledQuestions([
        ...filledQuestions,
        {
          question: selectedQuestion?.question,
          questionId: selectedQuestion?.id,
          answer: input ?? '',
          error: '',
          previousQuestionId: selectedQuestion?.previousQuestionId ?? '',
        },
      ]);
    }
  }, [input]);

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
      <TextInput
        value={input}
        cursorColor={Colors.black}
        style={{
          height: 50,
          borderBottomColor: Colors.black,
          borderBottomWidth: 0.5,
        }}
        selectionColor={Colors.black}
        placeholder="Type Here"
        placeholderTextColor={'rgba(129, 127, 136, 1)'}
        onChangeText={text => {
          setInput(text);
        }}
      />

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
