import _ from 'lodash';
import {generateGuid} from '../util';

function textFieldManipulator(list) {
  try {
    if (_.isEmpty(list)) return [];

    const textQuestions = [];
    for (let textQuestion of list) {
      const payload = {
        ...textQuestion,
        questionType: 'input',
        id: generateGuid(),
      };

      textQuestions.push(payload);
    }

    return textQuestions;
  } catch (error) {
    console.error('text field manipulator error --->>>', error);
    return [];
  }
}

function reactionManipulator(list) {
  try {
    if (_.isEmpty(list)) return [];

    const textQuestions = [];
    for (let textQuestion of list) {
      const payload = {
        ...textQuestion,
        questionType: 'reaction',
        id: generateGuid(),
      };

      textQuestions.push(payload);
    }

    return textQuestions;
  } catch (error) {
    console.error('reaction manipulator error --->>>', error);
    return [];
  }
}

function rangeQuestions(list) {
  try {
    if (_.isEmpty(list)) return [];

    const textQuestions = [];
    for (let textQuestion of list) {
      const payload = {
        ...textQuestion,
        questionType: 'slideBar',
        id: generateGuid(),
      };

      textQuestions.push(payload);
    }

    return textQuestions;
  } catch (error) {
    console.error('text field manipulator error --->>>', error);
    return [];
  }
}

function multiChoiceQuestions(list) {
  try {
    if (_.isEmpty(list)) return [];

    const textQuestions = [];
    for (let textQuestion of list) {
      const payload = {
        ...textQuestion,
        questionType: 'multiChoice',
        id: generateGuid(),
      };

      textQuestions.push(payload);
    }

    return textQuestions;
  } catch (error) {
    console.error('text field manipulator error --->>>', error);
    return [];
  }
}

function radioQuestions(list) {
  try {
    if (_.isEmpty(list)) return [];

    const textQuestions = [];
    for (let textQuestion of list) {
      const payload = {
        ...textQuestion,
        questionType: 'choice',
        id: generateGuid(),
      };

      textQuestions.push(payload);
    }

    return textQuestions;
  } catch (error) {
    console.error('text field manipulator error --->>>', error);
    return [];
  }
}

export function getSurveysManipulator(list) {
  try {
    if (_.isEmpty(list)) return [];

    const data = [];

    for (let survey of list) {
      let allQuestions = [];

      if (survey?.text_field?.length > 0) {
        const questions = textFieldManipulator(survey?.text_field);

        allQuestions = [...allQuestions, ...questions];
      }

      if (survey?.reaction?.length > 0) {
        const questions = reactionManipulator(survey?.reaction);
        allQuestions = [...allQuestions, ...questions];
      }

      if (survey?.range) {
        const questions = rangeQuestions(survey?.range);
        allQuestions = [...allQuestions, ...questions];
      }

      if (survey?.checkbox) {
        const questions = multiChoiceQuestions(survey?.checkbox);
        allQuestions = [...allQuestions, ...questions];
      }

      if (survey?.radio) {
        const questions = radioQuestions(survey?.radio);
        allQuestions = [...allQuestions, ...questions];
      }

      const payload = {};

      const independentQuestions = allQuestions
        ?.filter(q => q?.is_dependent !== true)
        ?.sort((a, b) => a?.order - b?.order);

      let dependentQuestions = allQuestions
        ?.filter(q => q?.is_dependent !== false)
        ?.sort((a, b) => a?.order - b?.order);

      const sortedQuestionsByOrder = [];

      function recurringFilterQuestions(question) {
        sortedQuestionsByOrder.push(question);
        dependentQuestions = dependentQuestions?.filter(
          q => q?.id !== question?.id,
        );

        const findChildren = dependentQuestions?.filter(
          item => item?.dependent_question === question?.question,
        );

        if (findChildren?.length > 0) {
          for (let childQuestion of findChildren) {
            recurringFilterQuestions(childQuestion);
          }
        }
      }

      for (let question of independentQuestions) {
        sortedQuestionsByOrder.push(question);

        const findChildren = dependentQuestions?.filter(
          item =>
            item?.dependent_question?.trim()?.toLowerCase() ===
            question?.question?.trim()?.toLowerCase(),
        );

        if (findChildren?.length > 0) {
          for (let childQuestion of findChildren) {
            recurringFilterQuestions(childQuestion);
          }
        }
      }

      payload.title = survey?.title ?? '';
      payload.id = survey?.id ?? '0';
      payload.questions = sortedQuestionsByOrder;

      data.push(payload);
    }

    return data;
  } catch (error) {
    console.error('error ---survey manipulator', error);
  }
}

// export function getSurveysManipulator(list) {
//   try {
//     if (_.isEmpty(list)) return [];

//     const data = [];

//     for (let survey of list) {
//       let allQuestions = [];

//       if (survey?.text_field?.length > 0) {
//         const questions = textFieldManipulator(survey?.text_field);

//         allQuestions = [...allQuestions, ...questions];
//       }

//       if (survey?.reaction?.length > 0) {
//         const questions = reactionManipulator(survey?.reaction);
//         allQuestions = [...allQuestions, ...questions];
//       }

//       if (survey?.range) {
//         const questions = rangeQuestions(survey?.range);
//         allQuestions = [...allQuestions, ...questions];
//       }

//       if (survey?.checkbox) {
//         const questions = multiChoiceQuestions(survey?.checkbox);
//         allQuestions = [...allQuestions, ...questions];
//       }

//       if (survey?.radio) {
//         const questions = radioQuestions(survey?.radio);
//         allQuestions = [...allQuestions, ...questions];
//       }

//       const payload = {};

//       payload.title = survey?.title ?? '';
//       payload.id = survey?.id ?? '0';

//       const sortedQuestionsByOrder = [];

//       for (let question of allQuestions) {
//         if (question?.is_dependent) {
//           const findIndependent = allQuestions?.find(
//             q =>
//               q?.question === question?.dependent_question &&
//               question?.is_dependent === true,
//           );

//           sortedQuestionsByOrder.push({
//             ...question,
//             order: findIndependent?.order ?? question?.order,
//           });
//         } else {
//           sortedQuestionsByOrder.push(question);
//         }
//       }

//       const allOrders = sortedQuestionsByOrder?.map(q => q?.order);

//       const uniqueOrders = [...new Set(allOrders)];

//       const questionByOrderObject = {};
//       let sortedByIndependentAndOrder = [];

//       for (let order of uniqueOrders) {
//         const questionWithSameOrders = sortedQuestionsByOrder
//           .filter(q => q?.order == order)
//           .sort((a, b) => a?.is_dependent - b?.is_dependent);

//         questionByOrderObject[order] = questionWithSameOrders;
//       }

//       const keys = Object.keys(questionByOrderObject)?.sort((a, b) => a - b);

//       for (let key of keys) {
//         sortedByIndependentAndOrder = [
//           ...sortedByIndependentAndOrder,
//           ...questionByOrderObject[key],
//         ];
//       }

//       payload.questions = sortedByIndependentAndOrder;

//       data.push(payload);
//     }

//     return data;
//   } catch (error) {
//     console.error('error ---survey manipulator', error);
//   }
// }
