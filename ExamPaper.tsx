import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  startExam,
  saveAnswer,
  submitExam,
} from "../redux/actions/ExamActions";
import Question from "./Question";

const ExamPaper: React.FC = () => {
  const dispatch = useDispatch();
  const { examId, examName, questions, attemptedQuestions } = useSelector(
    (state: any) => state.exam
  );

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [reviewQuestions, setReviewQuestions] = useState<{
    [key: number]: boolean;
  }>({});
  const [subjectiveAnswers, setSubjectiveAnswers] = useState<{
    [key: number]: string;
  }>({});

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/exams/EXAM007`
        );
        dispatch(startExam(response.data)); // Assuming response.data is structured correctly
      } catch (err) {
        console.error("Failed to fetch exam data", err);
      }
    };

    fetchExam();
  }, [dispatch, examId]);

  useEffect(() => {
    // Initialize review status for all questions to false
    const initialReviewStatus = questions.reduce(
      (acc: { [key: number]: boolean }, question: any) => {
        acc[question.id] = false;
        return acc;
      },
      {}
    );
    setReviewQuestions(initialReviewStatus);
  }, [questions]);

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleReviewToggle = (questionId: number) => {
    setReviewQuestions((prevReview) => ({
      ...prevReview,
      [questionId]: !prevReview[questionId],
    }));
  };

  const handleSaveAnswer = (questionId: number, answer: any) => {
    let reviewed = reviewQuestions[questionId] || false;
    let attempted = true;

    if (typeof answer === "string") {
      setSubjectiveAnswers((prevAnswers) => ({
        ...prevAnswers,
        [questionId]: answer,
      }));
    }

    dispatch(saveAnswer(questionId, reviewed, attempted, answer));
  };

  const handleSubmitExam = async () => {
    const formattedExamPattern = questions.map((q: any) => {
      if (Array.isArray(q.answer)) {
        // Multiple-choice question
        const selectedOptions = q.answer.map((option: any) => option.answer);
        return {
          questionId: q.id,
          questionText: q.question,
          answer: selectedOptions,
          reviewed: reviewQuestions[q.id] || false,
          attempted: attemptedQuestions.includes(q.id),
        };
      } else if (typeof q.answer === "object" && q.answer.id) {
        // Single-choice question
        return {
          questionId: q.id,
          questionText: q.question,
          answer: q.answer?.answer,
          reviewed: reviewQuestions[q.id] || false,
          attempted: attemptedQuestions.includes(q.id),
        };
      } else {
        // Subjective question
        return {
          questionId: q.id,
          questionText: q.question,
          answer: q.answer,
          reviewed: reviewQuestions[q.id] || false,
          attempted: attemptedQuestions.includes(q.id),
        };
      }
    });
    console.log(examId, "", examName, "name");

    try {
      // Make API call to submit exam
      const response = await axios.post(
        "http://localhost:5000/api/exams/submit",
        {
          examId,
          examName,
          examPattern: formattedExamPattern,
        }
      );

      // Handle success response here
      console.log("Exam submitted successfully!", response.data);

      // Optionally update UI or redirect after submission
    } catch (error) {
      // Handle error scenarios
      console.error("Failed to submit exam:", error);
    }
  };

  return (
    <div className="flex">
      <div className="w-3/4 p-4">
        {questions.length > 0 && (
          <div className="mb-4 p-4 border rounded shadow">
            <Question
              question={questions[currentQuestionIndex]}
              answer={questions[currentQuestionIndex].answer}
              onAnswerChange={(answer: any) =>
                handleSaveAnswer(questions[currentQuestionIndex].id, answer)
              }
            />
          </div>
        )}
        <div className="flex justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handlePrevQuestion}
            disabled={currentQuestionIndex === 0}
          >
            Prev
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleNextQuestion}
            disabled={currentQuestionIndex === questions.length - 1}
          >
            Save & Next
          </button>
        </div>
      </div>
      <div className="w-1/4 p-4 border-l">
        <h2 className="text-lg font-bold mb-4">Questions Status</h2>
        <div className="grid grid-cols-1 gap-2">
          {questions.map((question: any) => (
            <div
              key={question.id}
              className={`p-2 text-center rounded ${
                question.attempted ? "bg-green-500" : "bg-gray-500"
              } text-white`}
            >
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={reviewQuestions[question.id] || false}
                  onChange={() => handleReviewToggle(question.id)}
                  className="form-checkbox h-5 w-5 text-gray-600"
                />
                <span className="ml-2">Question {question.id}</span>
              </label>
            </div>
          ))}
        </div>
        <button
          className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSubmitExam}
        >
          Submit Exam
        </button>
      </div>
    </div>
  );
};

export default ExamPaper;
