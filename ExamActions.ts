// actions/ExamActions.ts
import { START_EXAM, SAVE_ANSWER, SUBMIT_EXAM } from "./type";

export const startExam = (examData: any) => ({
  type: START_EXAM,
  payload: examData,
});

export const saveAnswer = (
  questionId: number,
  reviewed: boolean,
  attempted: boolean,
  answer: any
) => ({
  type: SAVE_ANSWER,
  payload: { questionId, reviewed, attempted, answer },
});

export const submitExam = (
  examId: string,
  examName: string,
  examPattern: any[]
) => ({
  type: SUBMIT_EXAM,
  payload: { examId, examName, examPattern },
});
