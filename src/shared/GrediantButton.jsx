import React from 'react';
import { Link } from 'react-router';

const GrediantButton = ({text , path}) => {
    return (
       <Link to={path} className="btn bg-linear-to-r from-primary to-orange-500 border-0 text-white hover:scale-101 transition-all duration-300">
          {text}
        </Link>
    );
};

export default GrediantButton;