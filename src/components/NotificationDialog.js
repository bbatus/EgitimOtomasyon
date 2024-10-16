import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import '../assets/styles/NotificationDialog.css';

const NotificationDialog = ({ message, type, onClose }) => {
  const timerRef = useRef(null); // setTimeout referansı

  useEffect(() => {
    // Timer'ı başlat ve referansa ata
    timerRef.current = setTimeout(() => {
      onClose();
    }, 3003);

    // Bileşen unmount olduğunda veya onClose değiştiğinde timer'ı temizle
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
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
