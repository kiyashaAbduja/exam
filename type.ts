// exam/types.ts

export const START_EXAM = "START_EXAM";
export const SAVE_ANSWER = "SAVE_ANSWER";
export const SUBMIT_EXAM = "SUBMIT_EXAM";

interface StartExamAction {
  type: typeof START_EXAM;
  payload: any; // Replace with your exam data type
}

interface SaveAnswerAction {
  type: typeof SAVE_ANSWER;
  payload: {
    questionId: number;
    reviewed: boolean;
    attempted: boolean;
    answer?: number | string | number[]; // Answer can be ID for single/multiple-choice or string for subjective
  };
}

interface SubmitExamAction {
  type: typeof SUBMIT_EXAM;
}

export type ExamActionTypes =
  | StartExamAction
  | SaveAnswerAction
  | SubmitExamAction;
