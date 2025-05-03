import "./ErrorMessage.css";

/**
 * ErrorMessage component displays an error message inside a styled container.
 *
 * @component
 * @param {Object} props - The props object.
 * @param {string} props.message - The error message to display.
 * @returns {JSX.Element} A styled error message component.
 */
function ErrorMessage({ message }) {
  return (
    <div className="error-message">
      <p>{message}</p>
    </div>
  );
}

export default ErrorMessage;
