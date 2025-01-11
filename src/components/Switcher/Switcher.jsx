import PropTypes from "prop-types";

/**
 *
 * @param {boolean} isOn - State of the switcher (on/off)
 * @param {function} onToggle - Function to handle toggle action. Receives the new state as a parameter.
 * @param {string} [size="medium"] -Size of the switcher.Options: "small", "medium", "large".
 * @param {string} [onColor="#4CAF50"] - Background color when the switch if on.
 * @param {string} [offColor="#ccc"] -Background color when the switch if off.
 * @param {string} [handleColor="fff"] - Color of the handle
 * @param {boolean} [disable=false] -if true, switch is not clickable
 */

export default function Switcher({
  isOn,
  onToggle,
  size = "medium",
  onColor = "#4caf50",
  offColor = "#ccc",
  handleColor = "#fff",
  disable = false,
}) {
  const sizeStyles = {
    small: {
      switchWidth: 40,
      switchHeight: 20,
      handleSize: 16,
    },
    medium: {
      switchWidth: 60,
      switchHeight: 30,
      handleSize: 26,
    },
    large: {
      switchWidth: 80,
      switchHeight: 40,
      handleSize: 36,
    },
  };

  const currentSize = sizeStyles[size] || sizeStyles.medium;

  const switchStyle = {
    width: `${currentSize.switchWidth}px`,
    height: `${currentSize.switchHeight}px`,
    backgroundColor: isOn ? onColor : offColor,
    borderRadius: `${currentSize.switchHeight / 2}px`,
    display: "flex",
    alignItems: "center",
    justifyContent: isOn ? "flex-end" : "flex-start",
    padding: "2px",
    cursor: disable ? "not-allowed" : "pointer",
    transition: "background-color 0.3s ease",
    opacity: disable ? 0.6 : 1,
  };

  const handleStyle = {
    width: `${currentSize.handleSize}px`,
    height: `${currentSize.handleSize}px`,
    backgroundColor: handleColor,
    borderRadius: "50%",
    transition: "transform 0.3s ease",
  };
  return (
    <div
      style={switchStyle}
      onClick={() => !disable && onToggle(!isOn)}
      role="switch"
      aria-checked={isOn}
      aria-disabled={disable}
    >
      <div style={handleStyle}></div>
    </div>
  );
}

Switcher.propTypes = {
  isOn: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  onColor: PropTypes.string,
  offColor: PropTypes.string,
  handleColor: PropTypes.string,
  disable: PropTypes.bool,
};
