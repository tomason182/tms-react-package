import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Tooltip.module.css";

/**
 *  Tooltip component
 *
 * A reusable tooltip component that displays additional information when users interact
 * with the child element. It supports customizable positions, triggers, and styles.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.content - The content to display inside the tooltip
 * @param {"top" | "right" | "bottom" | "left"} [props.position="top"] - The position of the tooltip relative to the trigger element.
 * @param {"hover" | "click"} [props.trigger="hover"] - The trigger type for showing the content.
 * @param {React.ReactNode} [props.children] - The Children that activates the tooltip on interaction.
 * @param {React.CSSProperties} [props.customStyle.wrapper] - Inline styles for the wrapper element.
 * @param {React.CSSProperties} [props.customStyle.tooltip] - Inline styles for the tooltip element.
 *
 * @example
 * // Basic usage with the hover trigger
 * <Tooltip content="Hello, World!" position="top">
 *    <button>Hover over me</button>
 * </Tooltip>
 *
 * @example
 * // Using click trigger and custom styles
 * const customStyle = {
 *  tooltip: {
 *    backgroundColor: "red", color: "white"
 *   }
 *  wrapper: {
 *    border: "1px solid black"
 *    padding: "10px 20px"
 *  }
 * }
 *
 * <Tooltip
 *    content="Click to toggle me"
 *    position="right"
 *    trigger="click"
 *    customStyle={customStyle}
 * >
 *    <button>Click me</button>
 * </Tooltip>
 *
 * @returns {JSX.Element} A wrapper element that displays a tooltip when the child is interacted with
 */

export default function Tooltip({
  content,
  position = "top",
  trigger = "hover",
  children,
  customStyle = {},
}) {
  const [visible, setVisible] = useState(false);

  const handleMouseEnter = () => {
    if (trigger === "hover") setVisible(true);
  };

  const handleMouseLeave = () => {
    if (trigger === "hover") setVisible(false);
  };

  const handleClick = () => {
    if (trigger === "click") setVisible(!visible);
  };

  return (
    <div
      className={styles.tooltipWrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={customStyle.wrapper}
    >
      {children}
      {visible && (
        <div
          className={`${styles.tooltip} ${styles[position]}`}
          style={customStyle.tooltip}
        >
          {content}
        </div>
      )}
    </div>
  );
}

Tooltip.propTypes = {
  content: PropTypes.node.isRequired,
  position: PropTypes.oneOf(["top", "right", "bottom", "left"]).isRequired,
  trigger: PropTypes.oneOf(["hover", "click"]).isRequired,
  children: PropTypes.node.isRequired,
  customStyle: PropTypes.shape({
    wrapper: PropTypes.object,
    tooltip: PropTypes.object,
  }),
};
