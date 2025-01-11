import styles from "./Spinner.module.css";
import PropTypes from "prop-types";

export default function Spinner({
  size = 40, // Default size in pixels
  borderColor = "#f3f3f3", // Default color
  topColor = "#3498db",
  thickness = 4, // Default border thickness
  speed = "0.5s", // Default animation speed
  className = "",
}) {
  return (
    <div
      className={`${styles.loader} ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        border: `${thickness}px solid ${borderColor}`,
        borderTop: `${thickness}px solid ${topColor}`,
        animationDuration: speed,
      }}
    ></div>
  );
}

Spinner.propTypes = {
  size: PropTypes.number,
  borderColor: PropTypes.string,
  topColor: PropTypes.string,
  thickness: PropTypes.number,
  speed: PropTypes.string,
  className: PropTypes.string,
};
