import React, { FC } from "react";

interface NavigationProps {
  onPrev: () => void;
  onSaveNext: () => void;
  onSubmit: () => void;
}

const Navigation: FC<NavigationProps> = ({ onPrev, onSaveNext, onSubmit }) => {
  return (
    <div>
      <button onClick={onPrev}>Previous</button>
      <button onClick={onSaveNext}>Save & Next</button>
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
};

export default Navigation;
