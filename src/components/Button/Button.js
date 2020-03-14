import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const Button = ({ path, text, onClick, bgColor }) => {
  const bgClass = styles[bgColor];

  if (path) {
    return (
      <Link to={path} className={`${bgClass} ${styles.button}`}>
        {text}
      </Link>
    );
  }
  return (
    <div onClick={onClick} className={`${bgClass} ${styles.button}`}>
      {text}
    </div>
  );
};

export default Button;

Button.propTypes = {
  path: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func
};
