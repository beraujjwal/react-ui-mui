import { forwardRef } from "react";
import PropTypes from "prop-types";
import {
  Tabs,
  Tab,
} from "@mui/material";

import { AppBox } from "../box";
import { AppBadge } from "../badge";
import { AppTypography } from "../typography";

/**
 * Application styled Tabs component
 * A reusable wrapper around MUI Tabs for consistent tabbed navigation.
 *
 * @component AppTabs
 * @param {array} tabs - Array of tab objects ({ label, value, icon, badge, disabled })
 * @param {string|number} value - Currently selected tab value
 * @param {function} onChange - Callback when tab changes
 * @param {boolean} centered - Center align tabs
 * @param {boolean} fullWidth - Tabs fill full width
 * @param {string} variant - Tab layout variant ('standard' | 'scrollable' | 'fullWidth')
 * @param {string} orientation - Tab orientation ('horizontal' | 'vertical')
 * @param {boolean} showPanel - Whether to render tab panels
 * @param {node|array} children - Optional tab panel contents
 * @param {object} sx - Custom style overrides
 */
const AppTabs = forwardRef(
  (
    {
      tabs = [],
      value,
      onChange,
      centered = false,
      fullWidth = false,
      variant = "scrollable",
      orientation = "horizontal",
      showPanel = false,
      children,
      sx = {},
      tabSx = {},
      ...restOfProps
    },
    ref
  ) => {
    return (
      <AppBox ref={ref} sx={{ width: "100%", ...sx }}>
        <Tabs
          value={value}
          onChange={onChange}
          centered={centered}
          variant={variant}
          orientation={orientation}
          scrollButtons={variant === "scrollable" ? "auto" : false}
          allowScrollButtonsMobile
          textColor="primary"
          indicatorColor="primary"
          {...restOfProps}
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.value}
              label={
                <AppBox display="flex" alignItems="center" gap={1}>
                  {tab.icon && <AppBox component="span">{tab.icon}</AppBox>}
                  {tab.badge ? (
                    <AppBadge
                      badgeContent={tab.badge}
                      color="secondary"
                      overlap="circular"
                    >
                      <AppTypography variant="body2">{tab.label}</AppTypography>
                    </AppBadge>
                  ) : (
                    <AppTypography variant="body2">{tab.label}</AppTypography>
                  )}
                </AppBox>
              }
              value={tab.value}
              disabled={tab.disabled}
              sx={{
                textTransform: "none",
                fontWeight: 500,
                px: 2,
                py: 1,
                minHeight: 48,
                minWidth: fullWidth ? "100%" : "auto",
                color: "text.secondary",
                "&.Mui-selected": {
                  color: "primary.main",
                  fontWeight: 600,
                },
                ...tabSx,
              }}
            />
          ))}
        </Tabs>

        {showPanel && (
          <AppBox mt={2}>
            {Array.isArray(children)
              ? children.map(
                  (child, index) =>
                    tabs[index]?.value === value && (
                      <AppBox key={index} role="tabpanel">
                        {child}
                      </AppBox>
                    )
                )
              : children}
          </AppBox>
        )}
      </AppBox>
    );
  }
);

AppTabs.displayName = "AppTabs";

AppTabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      icon: PropTypes.node,
      badge: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      disabled: PropTypes.bool,
    })
  ).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  centered: PropTypes.bool,
  fullWidth: PropTypes.bool,
  variant: PropTypes.oneOf(["standard", "scrollable", "fullWidth"]),
  orientation: PropTypes.oneOf(["horizontal", "vertical"]),
  showPanel: PropTypes.bool,
  children: PropTypes.node,
  sx: PropTypes.object,
  tabSx: PropTypes.object,
};

export default AppTabs;
