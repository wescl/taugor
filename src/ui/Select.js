import React, { useState, useEffect, useRef } from 'react';
import './Select.scss';
import { IoIosArrowDown } from "react-icons/io";

const Select = ({ options, value, onChange, label, errorMessage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocusedSelect, setIsFocusedSelect] = useState(false);
  const selectRef = useRef(null);
  const labelRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(errorMessage && Object.keys(errorMessage).length > 0);
  }, [errorMessage]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setIsError(false);
  };

  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false);
    setIsFocusedSelect(true);
  };

  useEffect(() => {
    setIsFocusedSelect(!!value);
  }, [value]);

  return (
    <div className={`select-wrapper ${isFocusedSelect ? 'focused' : ''}`} ref={selectRef}>
      <div className={`selected ${isError ? 'selected-error' : ''}`} onClick={handleToggle}>
        <label className={`label-select ${isFocusedSelect ? 'label-focused' : ''}`} ref={labelRef}>{label}</label>
        {value}
        <div className={`arrow ${isOpen ? 'open' : ''}`}><IoIosArrowDown /></div>
      </div>
      {isError && <p className="error-message">{errorMessage}</p>}
      <ul className={`options ${isOpen ? 'open-options' : ''}`}>
        {options.map((option, index) => (
          <li key={index} onClick={() => handleOptionClick(option)}>
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Select;
