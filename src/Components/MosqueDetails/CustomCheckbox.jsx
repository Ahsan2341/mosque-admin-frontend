import React, { useState } from "react";
import "./check.css";

const CustomCheckbox = ({ label, checked, onChange }) => {
  const [isChecked, setIsChecked] = useState(false);
  const isControlled = checked !== undefined;

  const handleChange = (e) => {
    if (onChange) onChange(e);
    if (!isControlled) setIsChecked((prev) => !prev);
  };

  return (
    <label className="checkbox-container">
      <input
        type="checkbox"
        checked={isControlled ? checked : isChecked}
        onChange={handleChange}
      />
      <span className="checkmark"></span>
      {label}
    </label>
  );
};

export default CustomCheckbox;
