import {
  View,
  ScrollView,
  Dimensions,
  Modal,
  FlatList,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import styles from './styles';
import _ from 'lodash';
import {
  ButtonView,
  CustomNavbar,
  Button,
  InputQuestion,
  MultiChoiceQuestion,
  ChoiceQuestion,
  ReactionQuestion,
  SideBarQuestion,
  ExitModal,
  Text,
  Reactions,
} from '../../components';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  createSubscribeSurveyRequest,
  findSubscribeSurveyRequest,
  getAllSurveysRequest,
  submitSurveyRequest,
} from '../../redux/slicers/surveyQuestions';
import moment from 'moment';
import util from '../../util';
import {ERROR_SOMETHING_WENT_WRONG} from '../../config/WebService';
import {
  getNotificationReadCountRequest,
  notificationCountDecrease,
  notificationsUpdateRequest,
} from '../../redux/slicers/gerenal';

export default function IndividualSurvey({route}) {
  const nagivate = useNavigation();
  const dispatch = useDispatch();
  const {surveyId, notificationId} = route?.params || {};
  const allSurveys = useSelector(state => state?.surveyQuestions?.questions);
  const user = useSelector(({user}) => user?.data?.user);
  const selectedSurvey = allSurveys?.find(item => item?.id == surveyId);
  const {questions} = selectedSurvey || {};
  const [selectedQuestion, setSelectedQuestion] = useState(
    selectedSurvey?.questions?.[0],
  );
  const [initialDataLoading, setInitialDataLoading] = useState(
    notificationId ? true : false,
  );
  const [subscribeSurveyId, setSubscribeSurveyId] = useState(null);
  const [selectedQuestionPosition, setSelectedQuestionPositon] = useState(0);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [onSubmit, setOnSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const userGroups = useSelector(state => state?.groups?.userGroups);
  const [filledQuestions, setFilledQuestions] = useState([]);
  const [filledAnswerIds, setFilledAnswerIds] = useState([
    selectedSurvey?.questions?.[0]?.id,
  ]);
  const [filterAnswerBool, setFilterAnswerBool] = useState(false);
  console.log({surveyId, notificationId, selectedSurvey});
  useEffect(() => {
    const backAction = () => {
      setModalVisibility(true);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    const ids = userGroups?.map(item => item?.id);
    if (notificationId) {
      dispatch(
        notificationsUpdateRequest({
          payloadData: {
            notificationId: notificationId,
            isRead: true,
          },
          responseCallback: status => {},
        }),
      );
      dispatch(
        getNotificationReadCountRequest({
          payloadData: {
            userId: user?.id,
          },
          responseCallback: status => {},
        }),
      );
      // dispatch(notificationCountDecrease());
    }
    dispatch(
      findSubscribeSurveyRequest({
        payloadData: {
          surveyId,
          userId: user?.id,
        },
        responseCallback: (status, subscriptionId) => {
          if (status && subscriptionId) {
            setSubscribeSurveyId(subscriptionId);
          }
        },
      }),
    );
    return () => {
      backHandler.remove();
    };
  }, []);
  useEffect(() => {
    if (selectedSurvey) {
      setInitialDataLoading(false);
      return;
    }
    if (notificationId && !selectedSurvey) {
      const ids = userGroups?.map(item => item?.id);
      dispatch(
        getAllSurveysRequest({
          payloadData: {
            groupIds: ids,
            userId: user?.id,
          },
          responseCallback: status => {
            setTimeout(() => {
              setInitialDataLoading(false);
            }, 1000);
          },
        }),
      );
    }
  }, [notificationId]);

  useEffect(() => {
    if (selectedSurvey) {
      setSelectedQuestion(selectedSurvey?.questions?.[0]);
      setFilledAnswerIds([selectedSurvey?.questions?.[0]?.id]);
      if (selectedSurvey?.questions && initialDataLoading) {
        setInitialDataLoading(false);
      }
    } else if (!selectedSurvey && !initialDataLoading) {
      // if (notificationId) {
      //   util.topAlertError('Survey not found.');
      // }
      // nagivate.goBack();
    }
  }, [selectedSurvey, initialDataLoading]);

  useEffect(() => {
    if (filterAnswerBool) {
      handleFilterAnswers();
      setFilterAnswerBool(false);
    }
  }, [filterAnswerBool]);

  const exitModalOnSubmit = () => {
    setModalVisibility(false);
    nagivate.goBack();
  };

  const _validation = () => {
    let isValid = true;

    if (!selectedQuestion?.is_required) {
      return true;
    }

    const findAnswerIdx = filledQuestions?.findIndex(
      q => q?.questionId == selectedQuestion?.id,
    );
    const findAnswer = filledQuestions[findAnswerIdx];

    const typeOfAnswer = typeof findAnswer?.answer ?? 'string';

    if (typeOfAnswer == 'string' && _.isEmpty(findAnswer?.answer?.trim())) {
      isValid = false;

      let allAnswers = [...filledQuestions];
      allAnswers[findAnswerIdx] = {
        ...findAnswer,
        error: 'This question is required',
        question: selectedQuestion?.question,
        questionType: selectedQuestion?.questionType,
        questionId: selectedQuestion?.id,
      };

      setFilledQuestions([...allAnswers]);
    }

    if (typeOfAnswer !== 'string' && _.isEmpty(findAnswer?.answer)) {
      isValid = false;

      let allAnswers = [...filledQuestions];
      allAnswers[findAnswerIdx] = {
        ...findAnswer,
        error: 'This question is required',
        question: selectedQuestion?.question,
        questionType: selectedQuestion?.questionType,
        questionId: selectedQuestion?.id,
      };

      setFilledQuestions([...allAnswers]);
    }

    return isValid;
  };

  const handleFilterAnswers = () => {
    const answerIds = [...filledAnswerIds];

    const newAnswers = [];
    for (let id of answerIds) {
      const findAnswer = filledQuestions?.find(item => item?.questionId === id);
      if (findAnswer) {
        newAnswers.push(findAnswer);
      }
    }

    setFilledQuestions(newAnswers);
    setOnSubmit(true);
  };

  const handleNext = () => {
    if (onSubmit) {
      handleSubmitSurvey();
      return;
    }

    if (_validation()) {
      let NoQuestionFound = true;

      let _filledQuestionsClone = [...filledQuestions];

      // removing answers if someones goes to previous answer and changes it
      // if that question has dependent questions with different answer then remove them
      function filterAnswersIfPreviousAnswerUpdated(
        question,
        shouldCheckAnswer = false,
      ) {
        let currentDependentQuestions = [];
        if (shouldCheckAnswer) {
          const currentQuestionAnswer = _filledQuestionsClone?.find(
            answer => answer?.questionId === question?.id,
          );
          currentDependentQuestions =
            question?.questionType === 'multiChoice'
              ? questions?.filter(
                  q =>
                    q?.is_dependent == true &&
                    q?.dependent_question?.trim()?.toLowerCase() ===
                      question?.question?.trim()?.toLowerCase() &&
                    !currentQuestionAnswer?.answer?.includes(
                      q?.dependent_answer,
                    ),
                )
              : questions?.filter(
                  q =>
                    q?.is_dependent == true &&
                    q?.dependent_question?.trim()?.toLowerCase() ===
                      question?.question?.trim()?.toLowerCase() &&
                    currentQuestionAnswer?.answer?.toLowerCase()?.trim() !==
                      q?.dependent_answer?.toLowerCase()?.trim(),
                );
        } else {
          _filledQuestionsClone = _filledQuestionsClone?.filter(
            q => q?.questionId !== question?.id,
          );

          currentDependentQuestions = questions?.filter(
            q =>
              q?.is_dependent == true &&
              q?.dependent_question?.trim()?.toLowerCase() ===
                question?.question?.trim()?.toLowerCase(),
          );
        }

        if (currentDependentQuestions?.length > 0) {
          for (let childQuestion of currentDependentQuestions) {
            filterAnswersIfPreviousAnswerUpdated(childQuestion);
          }
        }
      }

      filterAnswersIfPreviousAnswerUpdated(selectedQuestion, true);

      if (_filledQuestionsClone?.length !== filledQuestions?.length) {
        setFilledQuestions([..._filledQuestionsClone]);
      }

      for (let i = selectedQuestionPosition + 1; i < questions?.length; i++) {
        const question = questions[i];

        if (question?.is_dependent) {
          const findParentQuestion = questions.find(
            q =>
              q?.question?.trim()?.toLowerCase() ===
              question?.dependent_question?.trim()?.toLowerCase(),
          );

          if (findParentQuestion) {
            const parentQuestionAnswer = _filledQuestionsClone?.find(
              answer => answer?.questionId === findParentQuestion?.id,
            );

            if (parentQuestionAnswer) {
              const answer =
                findParentQuestion?.questionType === 'multiChoice'
                  ? parentQuestionAnswer?.answer?.includes(
                      question?.dependent_answer,
                    )
                  : parentQuestionAnswer?.answer?.trim()?.toLowerCase() ===
                    question?.dependent_answer?.trim()?.toLowerCase();

              if (answer) {
                setSelectedQuestion({
                  ...question,
                  previousQuestionId: selectedQuestion?.id,
                });
                setSelectedQuestionPositon(i);
                setFilledAnswerIds(prevState => [...prevState, question?.id]);

                NoQuestionFound = false;
                break;
              }
            }
          }
        } else {
          setSelectedQuestion({
            ...question,
            previousQuestionId: selectedQuestion?.id,
          });
          setSelectedQuestionPositon(i);
          setFilledAnswerIds(prevState => [...prevState, question?.id]);
          NoQuestionFound = false;
          break;
        }
      }

      if (NoQuestionFound) {
        // handleFilterAnswers();
        setFilterAnswerBool(true);
      }
    }
  };

  const handlePrevious = () => {
    if (!onSubmit) {
      if (
        questions?.length >= selectedQuestionPosition + 1 &&
        selectedQuestionPosition > 0
      ) {
        const answerIds = [...filledAnswerIds]?.filter(
          id => id !== selectedQuestion?.id,
        );

        setFilledAnswerIds(answerIds);

        const findPreviousQuestionAnswer = filledQuestions?.find(
          answer => answer?.questionId === selectedQuestion?.previousQuestionId,
        );

        const findPreviousQuestionIdx = questions?.findIndex(
          q => q?.id === findPreviousQuestionAnswer?.questionId,
        );
        setSelectedQuestionPositon(findPreviousQuestionIdx);
        setSelectedQuestion({
          ...questions[findPreviousQuestionIdx],
          previousQuestionId: findPreviousQuestionAnswer?.previousQuestionId,
        });
      }
    } else {
      setOnSubmit(false);
    }
  };

  const handleSubmitSurvey = () => {
    const allAnswers = [];
    setIsLoading(true);

    for (let question of filledQuestions) {
      const payload = {
        question: question?.question,
      };

      if (question?.questionType === 'multiChoice') {
        const multiAnswers = question?.answer?.map(item => ({
          answer: item,
        }));

        payload.answers = multiAnswers;
      } else if (question?.questionType === 'reaction') {
        payload.answers = [{answer: question?.answer}];
        payload.isReactionQuestion = true;
      } else {
        payload.answers = [{answer: question?.answer}];
      }

      allAnswers.push(payload);
    }

    const payload = {
      data: {
        user: user?.id,
        question_info: allAnswers,
        survey_title: selectedSurvey?.title,
      },
    };

    if (subscribeSurveyId) {
      payload.data.subscribe_survey = {connect: [{id: subscribeSurveyId}]};
      submissionRequest(payload);
    } else {
      dispatch(
        createSubscribeSurveyRequest({
          payloadData: {
            data: {
              subscribe_date: moment().format(),
              survey: {connect: [{id: surveyId}]},
              user: user?.id,
            },
          },
          responseCallback: (status, data) => {
            if (status) {
              payload.data.subscribe_survey = {connect: [{id: data?.id}]};
              submissionRequest(payload);
              setSubscribeSurveyId(data?.id);
            } else {
              setIsLoading(false);
            }
          },
        }),
      );
    }
  };

  const submissionRequest = payload => {
    dispatch(
      submitSurveyRequest({
        payloadData: payload,
        responseCallback: status => {
          setIsLoading(false);
          if (status) {
            util.topAlert('Survey submitted successfully.');
            nagivate.goBack();
          } else {
            util.topAlertError(ERROR_SOMETHING_WENT_WRONG.error);
          }
        },
      }),
    );
  };

  // useMemo(
  const renderQuestion = useMemo(() => {
    return (
      <View
        style={{
          width: '90%',
          // height: 514,
          borderRadius: 12,
          flex: 1,
          backgroundColor: Colors.white,
          padding: 20,
        }}>
        {selectedQuestion?.questionType === 'input' && (
          <InputQuestion
            selectedQuestion={selectedQuestion}
            filledQuestions={filledQuestions}
            setFilledQuestions={setFilledQuestions}
          />
        )}

        {selectedQuestion?.questionType === 'multiChoice' && (
          <MultiChoiceQuestion
            selectedQuestion={selectedQuestion}
            filledQuestions={filledQuestions}
            setFilledQuestions={setFilledQuestions}
          />
        )}

        {selectedQuestion?.questionType === 'choice' && (
          <ChoiceQuestion
            selectedQuestion={selectedQuestion}
            filledQuestions={filledQuestions}
            setFilledQuestions={setFilledQuestions}
          />
        )}

        {selectedQuestion?.questionType === 'reaction' && (
          <ReactionQuestion
            selectedQuestion={selectedQuestion}
            filledQuestions={filledQuestions}
            setFilledQuestions={setFilledQuestions}
          />
        )}

        {selectedQuestion?.questionType === 'slideBar' && (
          <SideBarQuestion
            selectedQuestion={selectedQuestion}
            filledQuestions={filledQuestions}
            setFilledQuestions={setFilledQuestions}
          />
        )}
      </View>
    );
  }, [
    selectedQuestionPosition,
    selectedQuestion?.id,
    selectedQuestion,
    filledQuestions,
  ]);

  const renderSubmit = () => {
    return (
      <View
        style={{
          width: '90%',
          borderRadius: 12,
          backgroundColor: Colors.white,
          flex: 1,
        }}>
        <FlatList
          data={filledQuestions}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <View style={{padding: 20, paddingBottom: 10}}>
                <Text
                  color={Colors.black}
                  type={Fonts.type.base}
                  style={{fontSize: 14, fontWeight: '400'}}>
                  {index + 1}. {item?.question}
                </Text>
                {/* <View> */}
                {item?.questionType === 'multiChoice' && (
                  <Text
                    color={Colors.black}
                    type={Fonts.type.base}
                    style={{
                      marginTop: 10,
                      fontSize: 14,
                      fontWeight: '500',
                    }}>
                    {item?.answer?.length > 0
                      ? item?.answer?.join(', ')
                      : 'Answer is not given'}
                  </Text>
                )}
                {/* </View> */}

                {item?.questionType === 'reaction' && (
                  <Reactions selectedOption={item?.answer} />
                )}

                {item?.questionType !== 'multiChoice' &&
                  item?.questionType !== 'reaction' && (
                    <Text
                      color={Colors.black}
                      type={Fonts.type.base}
                      style={{marginTop: 10, fontSize: 14, fontWeight: '500'}}>
                      {_.isEmpty(item?.answer)
                        ? 'Answer is not given'
                        : item.answer}
                    </Text>
                  )}
                <View
                  style={{
                    width: '100%',
                    height: 0.5,
                    marginTop: item?.questionType === 'reaction' ? 25 : 15,
                    backgroundColor: 'rgba(29, 27, 37, 0.1)',
                  }}
                />
              </View>
            );
          }}
        />
      </View>
    );
  };

  if (initialDataLoading) {
    return (
      <View style={styles.activityWrapper}>
        <ActivityIndicator
          size="large"
          color={Colors.text.primary}
          style={AppStyles.mTop25}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CustomNavbar
        hasBorder={false}
        title={selectedSurvey?.title}
        // leftBtnPress={() => nagivate.goBack()}
        // leftBtnImage={Images.backIconBlack}
      />
      <>
        {/* {!onSubmit && (
        <View style={styles.lineParent}>
          {questions?.map((item, index) => (
            <View
              style={[
                styles.doneLine,
                {
                  width:
                    (Dimensions.get('screen').width - 60) / questions.length,
                },
                selectedQuestionPosition == index && {
                  backgroundColor: Colors.background.primary,
                },
              ]}
            />
          ))}
        </View>
      )} */}
      </>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        {onSubmit ? renderSubmit() : renderQuestion}
        <View style={{flexDirection: 'row', width: '90%'}}>
          {(!_.isEqual(selectedQuestionPosition, 0) || onSubmit) && (
            <Button
              onPress={handlePrevious}
              style={styles.backBtn}
              type={Fonts.type.base}
              textStyle={styles.backTxt}>
              BACK
            </Button>
          )}
          <Button
            onPress={handleNext}
            style={styles.nextBtn}
            type={Fonts.type.base}
            textStyle={styles.nextTxt}
            isLoading={isLoading}>
            {onSubmit ? 'SUBMIT' : 'NEXT'}
          </Button>
        </View>
        <Button
          onPress={() => {
            setModalVisibility(!modalVisibility);
          }}
          type={Fonts.type.base}
          style={styles.exitBtn}
          textStyle={styles.exitTxt}>
          EXIT
        </Button>
      </ScrollView>
      {modalVisibility && (
        <ExitModal
          isModalVisible={modalVisibility}
          setModalVisibility={setModalVisibility}
          onSubmit={exitModalOnSubmit}
        />
      )}
    </View>
  );
}
