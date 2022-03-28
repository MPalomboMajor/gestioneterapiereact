import React from 'react';
import {Toast } from 'react-bootstrap';
import { store } from 'react-notifications-component';
import PropTypes from 'prop-types';

const defaultOptions = {
  insert: 'top',
  container: 'top-right',
  animationIn: ['animated', 'fadeIn'],
  animationOut: ['animated', 'fadeOut'],
  dismiss: {
    duration: 5000,
    onScreen: false,
    pauseOnHover: true,
    waitForAnimation: false,
    // showIcon: true,
    click: true,
    touch: true,
  },
};
// type =
// "success"
// "info"
// "warning"
// "error"
function base(inline, type, title, message, caption) {
  return store.addNotification({
    ...defaultOptions,
    content: (
      <BaseNotification
        inline={inline}
        type={type}
        title={title}
        subtitle={message}
        caption={caption}
      />
    ),
  });
}

function error(title, subtitle) {
    return base(true, 'error', title || 'error', subtitle || ' ');
}

function success(title, subtitle) {
    return base(true, 'success', title || 'success', subtitle || ' ');
}

function warning(title, subtitle) {
    return base(true, 'warning', title || 'warning', subtitle || ' ');
}

function info(title, subtitle) {
    return base(true, 'info', title, subtitle || ' ');
}

export const showNotification = {
  custom: base,
  success,
  error,
  warning,
  info,
};

function BaseNotification(props) {
  const { inline, type, title, subtitle, caption } = props;

  if (inline) {
    return (
      <Toast
        kind={type}
        lowContrast={false}
        title={title}
        subtitle={subtitle || ''}
        iconDescription=""
        style={{ width: '30rem', marginTop: 0 }}
      />
    );
  }

  return (
    <Toast
      kind={type}
      lowContrast={false}
      title={title}
      subtitle={subtitle || ''}
      iconDescription=""
      caption={caption || ''}
      style={{ width: '30rem', marginTop: 0 }}
    />
  );
}
BaseNotification.propTypes = {
  inline: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  caption: PropTypes.string,
};
BaseNotification.defaultProps = { subtitle: '', caption: '' };
export default showNotification;
