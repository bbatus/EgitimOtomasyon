import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import '../assets/styles/NotificationDialog.css';

const NotificationDialog = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`notification-dialog ${type}`}>
      <div className="notification-message">{message}</div>
      <button className="close-button" onClick={onClose}>
        X
      </button>
    </div>
  );
};

NotificationDialog.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error']).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default NotificationDialog;
