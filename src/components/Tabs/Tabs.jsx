import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Tabs.module.css";

/**
 * Tabs Component
 *
 * A reusable component to create interfaces for organizing and displaying content.
 *
 * @component
 * @param {Object} props
 * @param {Array<{label: string, content: React.ReactNode}>} props.tabs  - An array of objects representing the tabs, each containing a label and content.
 * @param {number} [props.defaultActiveTab=0]   - The index of the tab that should active by default.
 * @param {Function} [props.onTabChange]        - A callback function called when the active tab change. Receives the index of the new active tab as an argument.
 * @param {Object} [props.customStyle]          - Custom styles for the tabs and context.
 * @param {React.CSSProperties} [props.customStyle.tabsWrapper]     - Inline styles for the tabs wrapper element.
 * @param {React.CSSProperties} [props.customStyle.tabButton]       - Inline styles for each tab button.
 * @param {React.CSSProperties} [props.customStyle.activeTabButton]   - Inline styles for the active tab button.
 * @param {React.CSSProperties} [props.customStyle.tabContent]        - Inline styles for the tab content
 *
 * @example
 * <Tabs
 *    tabs={[
 *        { label: "Home", content: <div>This is the home page</div> },
 *        { label: "Profile", content: <div>This is the profile page</div> },
 *        { label: "Settings", content: <div>This is the settings page</div> }, *
 *    ]}
 *    defaultActiveTab={0}
 *    onTabChange={(index) => console.log("Active tab: ", index)} *
 * />
 * @returns {JSX.Element}     A tabbed interface with dynamic content
 */

export default function Tabs({
  tabs,
  defaultActiveTab = 0,
  onTabChange,
  customStyle = {},
}) {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);

  function handleTabClick(index) {
    setActiveTab(index);
    if (onTabChange) {
      onTabChange(index);
    }
  }

  return (
    <div className={styles.tabsWrapper} style={customStyle.tabsWrapper}>
      <div className={styles.tabsHeader}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`${styles.tabButton} ${
              index === activeTab ? styles.activeTabButton : ""
            }`}
            style={
              index === activeTab
                ? { ...customStyle.tabButton, ...customStyle.activeTabButton }
                : customStyle.tabButton
            }
            onClick={() => handleTabClick(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={styles.tabContent} style={customStyle.tabContent}>
        {tabs[activeTab].content}
      </div>
    </div>
  );
}

Tabs.PropTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
    })
  ).isRequired,
  defaultActiveTab: PropTypes.number.isRequired,
  onTabChange: PropTypes.func.isRequired,
  customStyle: PropTypes.shape({
    tabsWrapper: PropTypes.object,
    tabButton: PropTypes.object,
    activeTabButton: PropTypes.object,
    tabContent: PropTypes.object,
  }),
};
