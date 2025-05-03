import React, { useRef } from "react";
import CloseBtn from "../../assets/close.svg?react";

/**
 * Modal component that renders a modal dialog box.
 *
 * @param {Object} props - The props object.
 * @param {boolean} props.isOpen - Determines whether the modal is open or not.
 * @param {Function} props.onClose - Callback function to handle closing the modal.
 * @param {React.ReactNode} props.children - The content to be displayed inside the modal.
 * @param {string} [props.className] - Optional additional class names for the modal.
 *
 * @returns {JSX.Element|null} The rendered modal component or null if `isOpen` is false.
 */
function Modal({ isOpen, onClose, children, className }) {
  const modalRef = useRef(null);

  if (!isOpen) return null;

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={handleClickOutside}
      role="dialog"
      aria-modal="true"
    >
      <div className={`modal ${className || ""}`} ref={modalRef}>
        <button
          className="close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          <CloseBtn alt="" aria-hidden="true" />
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
