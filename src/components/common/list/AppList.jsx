// import React from 'react';
// import PropTypes from 'prop-types';

// import Ul from './Ul';
// import Wrapper from './Wrapper';

// function AppList(props) {
//   const ComponentToRender = props.component;
//   let content = <div />;

//   // If we have items, render them
//   if (props.items) {
//     content = props.items.map(item => (
//       <ComponentToRender key={`item-${item.id}`} item={item} />
//     ));
//   } else {
//     // Otherwise render a single component
//     content = <ComponentToRender />;
//   }

//   return (
//     <Wrapper>
//       <Ul>{content}</Ul>
//     </Wrapper>
//   );
// }

// AppList.propTypes = {
//   component: PropTypes.elementType.isRequired,
//   items: PropTypes.array,
// };

// export default AppList;


import { forwardRef } from "react";
import PropTypes from "prop-types";
import { List, Paper } from "@mui/material";

/**
 * Application styled List component
 * A reusable wrapper around MUI List for consistent layout and styling.
 *
 * @component AppList
 * @param {node} children - List items inside
 * @param {string} variant - Visual variant ('default', 'outlined', 'hoverable', 'dense', 'bordered')
 * @param {boolean} dense - Reduces vertical padding between items
 * @param {boolean} divider - Adds dividers between list items
 * @param {boolean} elevation - Shadow effect (for Paper)
 * @param {boolean} square - Remove border radius
 * @param {object} sx - Custom style overrides
 */
const AppList = forwardRef(
  (
    {
      children,
      variant = "default",
      dense = false,
      divider = false,
      elevation = 0,
      square = false,
      sx = {},
      ...restOfProps
    },
    ref
  ) => {
    const variantStyles = {
      default: {
        borderRadius: 2,
        backgroundColor: "background.paper",
        boxShadow: (theme) => theme.shadows[elevation],
      },
      outlined: {
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.paper",
      },
      hoverable: {
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.paper",
        "& .MuiListItem-root": {
          transition: "all 0.2s ease",
          "&:hover": {
            backgroundColor: "action.hover",
          },
        },
      },
      dense: {
        borderRadius: 2,
        backgroundColor: "background.paper",
        "& .MuiListItem-root": {
          py: 0.5,
        },
      },
      bordered: {
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
      },
    };

    return (
      <Paper
        ref={ref}
        elevation={variant === "outlined" ? 0 : elevation}
        square={square}
        sx={{
          p: 0,
          overflow: "hidden",
          ...variantStyles[variant],
          ...sx,
        }}
      >
        <List
          dense={dense}
          disablePadding
          sx={{
            "& .MuiListItem-root + .MuiListItem-root": divider
              ? {
                  borderTop: "1px solid",
                  borderColor: "divider",
                }
              : {},
          }}
          {...restOfProps}
        >
          {children}
        </List>
      </Paper>
    );
  }
);

AppList.displayName = "AppList";

AppList.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf([
    "default",
    "outlined",
    "hoverable",
    "dense",
    "bordered",
  ]),
  dense: PropTypes.bool,
  divider: PropTypes.bool,
  elevation: PropTypes.number,
  square: PropTypes.bool,
  sx: PropTypes.object,
};

export default AppList;
