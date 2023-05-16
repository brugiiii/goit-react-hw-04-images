import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { Overlay, ModalEl } from './Modal.styled';

const root = document.querySelector('[id=modal-root]');

export const Modal = ({ url, alt, onClose }) => {
  useEffect(() => {
    const onEsc = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onEsc);

    return () => window.removeEventListener('keydown', onEsc);
  }, [onClose]);

  const onBackdrop = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={onBackdrop}>
      <ModalEl>
        <img src={url} alt={alt} />
      </ModalEl>
    </Overlay>,
    root
  );
};

Modal.propTypes = {
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
};
