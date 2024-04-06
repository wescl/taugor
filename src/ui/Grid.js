import React from 'react';
import './Grid.scss'; 

const Row = ({ children }) => {
    return <div className="row">{children}</div>;
};

const Col = ({ size, children, justify }) => {
    return <div className={`col-${size} ${justify}`}>{children}</div>;
};

export { Row, Col };
