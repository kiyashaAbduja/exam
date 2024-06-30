// components/Question.tsx
import React, { FC, useEffect } from "react";

interface Option {
  id: number;
  answer: string;
  correctAnswer: boolean;
}

interface QuestionProps {
  question: {
    id: number;
    question: string;
    options?: Option[];
  };
  answer: any;
  onAnswerChange: (answer: any) => void;
}

const Question: FC<QuestionProps> = ({ question, answer, onAnswerChange }) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onAnswerChange(e.target.value);
  };

  console.log(answer);
  const isMultipleChoice =
    question?.options &&
    question?.options?.filter((option) => option?.correctAnswer).length > 1;

  useEffect(() => {
    if (isMultipleChoice && !Array.isArray(answer)) {
      onAnswerChange([]);
    }
  }, [isMultipleChoice, answer, onAnswerChange]);
  const handleOptionChange = (selectedOption: Option) => {
    if (isMultipleChoice) {
      console.log(
        answer.some((opt: Option) => opt.id === selectedOption.id),
        "true"
      );

      if (Array.isArray(answer)) {
        if (answer.some((opt: Option) => opt.id === selectedOption.id)) {
          onAnswerChange(
            answer.filter((opt: Option) => opt.id !== selectedOption.id)
          );
        } else {
          onAnswerChange([...answer, selectedOption]);
        }
      } else {
        onAnswerChange([selectedOption]);
      }
    } else {
      // Single choice handling
      onAnswerChange(selectedOption);
    }
  };

  return (
    <div>
      <p>{question.question}</p>
      {question.options?.length !== 0 ? (
        <div>
          {question.options?.map((option) => (
            <label key={option.id}>
              <input
                type={isMultipleChoice ? "checkbox" : "radio"}
                name={
                  isMultipleChoice
                    ? `option_${question.id}`
                    : `single_${question.id}`
                }
                checked={
                  isMultipleChoice
                    ? answer?.some((opt: Option) => opt.id === option.id)
                    : answer?.id === option.id
                }
                onChange={() => handleOptionChange(option)}
                className="mr-2"
              />
              {option.answer}
            </label>
          ))}
        </div>
      ) : (
        <textarea
          value={answer}
          onChange={handleChange}
          className="border border-gray-400"
        />
      )}
    </div>
  );
};

export default Question;
