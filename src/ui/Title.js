import React from 'react';
import './Title.scss'
const Title = ({ title, text, icon }) => {

  return (
    <div className={`title`}>
        <h1>{title}<div className='icon'>{icon}</div></h1>
        <p>{text}</p>
    </div>
  );
};

export default Title;
