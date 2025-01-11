import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./Modal.module.css";

/**
 * A reusable and customizable Modal component
 *
 * @param {boolean} isOpen - Control if the modal is visible.
 * @param {function} onClose  -Function to close the modal.
 * @param {string} [width="500px"] -width of the modal.
 * @param {string} [height="auto"] -height of the modal.
 * @param {React.ReactNode} header - Content for the modal's header.
 * @param {React.ReactNode} body - Content for the modal's body.
 * @param {React.ReactNode} footer - Content for the modal's footer.
 * @param {boolean} [closeOnOverlayClick=true] - Whether clicking on the overlay close the modal.
 */

export default function Modal({
  isOpen,
  onClose,
  width = "500px",
  height = "auto",
  header,
  body,
  footer,
  closeOnOverlayClick = true,
}) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.modalOverlay}
      onClick={closeOnOverlayClick ? onClose : null}
    >
      <div
        className={styles.modalContainer}
        style={{ width, height }}
        onClick={e => e.stopPropagation()}
      >
        {header && <div className={styles.modalHeader}>{header}</div>}
        <div className={styles.modalBody}>{body}</div>
        {footer && <div className={styles.modalFooter}>{footer}</div>}
        <button className={styles.modalCloseBtn} onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  header: PropTypes.node,
  body: PropTypes.node.isRequired,
  footer: PropTypes.node,
  closeOnOverlayClick: PropTypes.bool,
  animationType: PropTypes.oneOf([
    "fade",
    "slideLeft",
    "slideRight",
    "slideTop",
    "slideBottom",
  ]),
  position: PropTypes.oneOf([
    "center",
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight",
    "",
  ]),
};
