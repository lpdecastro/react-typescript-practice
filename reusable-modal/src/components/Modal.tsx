import { useEffect, type ReactNode } from 'react';
import './Modal.css';

type ModalProps = {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
};

const Modal = ({ isOpen, title, onClose, children }: ModalProps) => {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className='modal-overlay' onClick={onClose}>
      <div
        className='modal'
        role='dialog'
        aria-modal='true'
        aria-labelledby='modal-title'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='modal-header'>
          <h2 className='modal-title'>{title}</h2>

          <button type='button' onClick={onClose} aria-label='Close modal'>
            x
          </button>
        </div>

        <div className='modal-body'>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
