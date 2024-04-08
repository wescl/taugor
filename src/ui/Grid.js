import React from 'react';
import './Grid.scss'; 

const Row = ({ children }) => {
    return <div className="row">{children}</div>;
};

const Col = ({ size, children, justify }) => {
    return <div className={`col ${justify} ${size}`}>{children}</div>;
};

export { Row, Col };
