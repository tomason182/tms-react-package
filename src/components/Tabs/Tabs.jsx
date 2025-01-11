import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Tabs.module.css";

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
