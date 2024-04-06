import React, { useState, useEffect } from 'react';
import './Input.scss';

const Input = ({ type, label, ex, value, onChange, errorMessage, onBlur }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(errorMessage && Object.keys(errorMessage).length > 0);
  }, [errorMessage]);

  const handleFocus = () => {
    setIsFocused(true);
    setIsError(false); 
  };

  const handleInputBlur = () => {
    setIsFocused(false);
    onBlur(value);
  };

  return (
    <div className={`input-wrapper ${isError ? 'input-wrapper-error' : ''}`}>
      <label className={`label ${isFocused || value ? 'label-active' : ''}`}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleInputBlur}
        className={`input ${isError ? 'input-error' : ''}`}
      />
      {isError && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default Input;
