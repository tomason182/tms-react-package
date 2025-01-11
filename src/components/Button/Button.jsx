import styles from ".Button.module.css";
import PropTypes from "prop-types";

export default function Button({ label, onClick }) {
  return <button onclick={onClick}>{label}</button>;
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
