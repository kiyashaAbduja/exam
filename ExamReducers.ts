// reducers/examReducer.ts
import { START_EXAM, SAVE_ANSWER, SUBMIT_EXAM } from "../actions/type";

const initialState = {
  examId: "",
  examName: "",
  questions: [],
  attemptedQuestions: [],
};

const examReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case START_EXAM:
      const { examId, examName, examPattern } = action.payload;
      return {
        ...state,
        examId,
        examName,
        questions: examPattern.map((question: any) => ({
          id: question.id,
          question: question.question,
          options: question.options,
          reviewed: false,
          attempted: false,
          answer: undefined,
        })),
      };
    case SAVE_ANSWER:
      const { questionId, reviewed, attempted, answer } = action.payload;
      const updatedQuestions = state.questions.map((question: any) => {
        if (question.id === questionId) {
          return {
            ...question,
            reviewed,
            attempted,
            answer,
          };
        }
        return question;
      });
      return {
        ...state,
        questions: updatedQuestions,
        attemptedQuestions: attempted
          ? [...state.attemptedQuestions, questionId]
          : state.attemptedQuestions.filter((id) => id !== questionId),
      };
    case SUBMIT_EXAM:
      // Assuming the backend handles the exam submission and clears the state after successful submission
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default examReducer;
