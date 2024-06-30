import React, { FC } from "react";

interface SidebarProps {
  totalQuestions: number;
  attemptedQuestions: number;
  reviewedQuestions: number;
}

const Sidebar: FC<SidebarProps> = ({
  totalQuestions,
  attemptedQuestions,
  reviewedQuestions,
}) => {
  return (
    <div>
      <p>Total Questions: {totalQuestions}</p>
      <p>Attempted Questions: {attemptedQuestions}</p>
      <p>Reviewed Questions: {reviewedQuestions}</p>
    </div>
  );
};

export default Sidebar;
