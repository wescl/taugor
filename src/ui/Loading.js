import React from 'react';
import { ImSpinner8 } from "react-icons/im";
import './Loading.scss';

const Loading = ({ size = 48 }) => {
  return (
    <div className="loading-container" style={{ width: size, height: size }}>
      <ImSpinner8 className="spinner-icon" style={{ fontSize: size }} />
    </div>
  );
};

export default Loading;
