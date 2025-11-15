import { forwardRef } from "react";
import PropTypes from "prop-types";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

/**
 * Application styled Accordion component
 * Note: forwardRef is needed if AppAccordion is used inside MUI transitions or animated wrappers
 * @component AppAccordion
 * @param {string} title - Title text displayed on the accordion header
 * @param {boolean} defaultExpanded - Whether the accordion is open by default
 * @param {node} children - Content inside the accordion body
 * @param {node} icon - Optional expand icon override
 */
const AppAccordion = forwardRef(
  (
    {
      title,
      children,
      defaultExpanded = false,
      icon = <ExpandMoreIcon />,
      sx = {},
      summaryProps = {},
      detailsProps = {},
      ...restOfProps
    },
    ref
  ) => {
    return (
      <Accordion
        defaultExpanded={defaultExpanded}
        disableGutters
        ref={ref}
        sx={{
          borderRadius: 2,
          boxShadow: "none",
          mb: 1,
          border: "1px solid",
          borderColor: "divider",
          "&:before": { display: "none" },
          "&.Mui-expanded": {
            borderColor: "primary.main",
          },
          ...sx,
        }}
        {...restOfProps}
      >
        <AccordionSummary
          expandIcon={icon}
          {...summaryProps}
          sx={{
            backgroundColor: "background.paper",
            borderBottom: "1px solid",
            borderColor: "divider",
            "& .MuiAccordionSummary-content": {
              margin: "8px 0",
            },
          }}
        >
          <Typography variant="subtitle1" fontWeight={600}>
            {title}
          </Typography>
        </AccordionSummary>

        <AccordionDetails {...detailsProps} sx={{ p: 2 }}>
          {children}
        </AccordionDetails>
      </Accordion>
    );
  }
);

AppAccordion.displayName = "AppAccordion";

AppAccordion.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  defaultExpanded: PropTypes.bool,
  icon: PropTypes.node,
  sx: PropTypes.object,
  summaryProps: PropTypes.object,
  detailsProps: PropTypes.object,
};

export default AppAccordion;
