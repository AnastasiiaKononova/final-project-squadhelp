import React from 'react';
import styles from './Error.module.sass';

const defaultMessages = {
  400: 'Check the inpit data',
  401: 'Unauthorized',
  403: 'Bank declined transaction',   
  404: 'Resource not found', 
  406: 'Not enough money',
  409: 'Conflict occurred / email already exists',
  500: 'Server Error', 
}

const Error = ({status, data, clearError}) => {
  const getMessage = () => {
    if (data) return data;
    return defaultMessages[status] || 'Server Error';
  };

  return (
    <div className={styles.errorContainer}>
      <span>{getMessage()}</span>
      <i className="far fa-times-circle" onClick={() => clearError()} />
    </div>
  );
};

export default Error;



