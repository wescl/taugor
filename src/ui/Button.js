import React from 'react';
import './Button.scss';
import Loading from './Loading';

const Button = ({ children, onClick, type = 'button', disabled = false, loading }) => {
  return (
    <button
      className={`button ${disabled ? 'button-disabled' : ''}`}
      onClick={onClick}
      type={type}
      disabled={disabled || loading}
    >
      {loading ? (
        <div>
          <Loading size={26}/>
          ㅤ
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
