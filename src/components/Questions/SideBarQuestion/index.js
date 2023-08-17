import Slider from '@react-native-community/slider';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Colors, Fonts, Images} from '../../../theme';
import Text from '../../Text';
import styles from './styles';
export default function SideBarQuestion(props) {
  const {selectedQuestion, filledQuestions, setFilledQuestions} = props;
  const [slideValue, setSlideValue] = useState(0);

  useEffect(() => {
    if (selectedQuestion?.max) {
      const answer = filledQuestions?.find(
        item => item?.questionId === selectedQuestion?.id,
      );

      try {
        if (!isNaN(answer.answer)) {
          const answerSlideValue = parseInt(answer?.answer);
          setSlideValue(parseInt(answerSlideValue) ?? 0);
        } else {
          selectedQuestion?.min && setSlideValue(selectedQuestion?.min ?? 0);
        }
      } catch (error) {
        setSlideValue(selectedQuestion?.min);
      }
    }
  }, [selectedQuestion]);

  useEffect(() => {
    const answerIdx = filledQuestions?.findIndex(
      item => item?.questionId === selectedQuestion?.id,
    );

    if (answerIdx > -1) {
      let allAnswers = [...filledQuestions];

      const answer = {
        ...allAnswers[answerIdx],
        answer: `${slideValue}`,
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
          answer: `${slideValue}`,
          questionType: selectedQuestion?.questionType,
          previousQuestionId: selectedQuestion?.previousQuestionId,
        },
      ]);
    }
  }, [slideValue]);

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
      <Text
        color={Colors.black}
        type={Fonts.type.base}
        style={{marginTop: 20, fontSize: 14, fontWeight: '500'}}>
        Slide
      </Text>
      <View
        style={{
          borderRadius: 80,
          height: 30,
          // overflow: 'hidden',
          justifyContent: 'center',
          marginTop: 10,
          width: '90%',
        }}>
        {/* <View style={{flexDirection: 'row', position: 'absolute'}}>
          <View style={styles.sliderDummy}></View>
          <View
            style={[
              styles.sliderReal,
              {width: (slideValue / selectedQuestion?.max) * 300},
            ]}></View>
        </View> */}

        <Slider
          style={{width: 300, height: 40, borderRadius: 20}}
          minimumValue={selectedQuestion?.min}
          lowerLimit={selectedQuestion?.min ?? 0}
          step={selectedQuestion?.step ?? 1}
          maximumValue={selectedQuestion?.max}
          upperLimit={selectedQuestion?.max ?? 100}
          thumbImage={Images.thumailSliderbar}
          onValueChange={value => setSlideValue(value)}
          maximumTrackTintColor="rgba(175, 54, 218, 0.4)"
          minimumTrackTintColor={Colors.background.primary}
          value={slideValue}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 8,
          justifyContent: 'space-between',
        }}>
        <Text size={14} color={Colors.black} type={Fonts.type.base}>
          {slideValue}
        </Text>
        <Text size={14} color={Colors.black} type={Fonts.type.base}>
          {selectedQuestion?.max}
        </Text>
      </View>

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
