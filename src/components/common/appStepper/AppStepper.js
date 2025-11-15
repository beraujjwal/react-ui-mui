import { forwardRef } from "react";
import PropTypes from "prop-types";
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Typography,
  Box,
} from "@mui/material";

/**
 * Application styled Stepper component
 * A reusable wrapper around MUI Stepper for consistent progress visualization.
 *
 * @component AppStepper
 * @param {array} steps - Array of steps (each step: { label, description, icon })
 * @param {number} activeStep - Currently active step index
 * @param {boolean} alternativeLabel - Whether to use the horizontal label layout
 * @param {string} orientation - Stepper orientation ('horizontal' | 'vertical')
 * @param {boolean} showDescription - Show step description text (only for vertical)
 * @param {object} sx - Custom style overrides
 * @param {function} onStepClick - Optional callback when a step is clicked
 */
const AppStepper = forwardRef(
  (
    {
      steps = [],
      activeStep = 0,
      alternativeLabel = true,
      orientation = "horizontal",
      showDescription = false,
      sx = {},
      onStepClick,
      ...restOfProps
    },
    ref
  ) => {
    return (
      <Box ref={ref} sx={{ width: "100%", ...sx }}>
        <Stepper
          activeStep={activeStep}
          alternativeLabel={alternativeLabel}
          orientation={orientation}
          {...restOfProps}
        >
          {steps.map((step, index) => (
            <Step
              key={index}
              completed={step.completed}
              onClick={() => onStepClick && onStepClick(index)}
              sx={{
                cursor: onStepClick ? "pointer" : "default",
                "& .MuiStepLabel-label": {
                  fontWeight: activeStep === index ? 600 : 400,
                },
              }}
            >
              <StepLabel
                StepIconComponent={step.icon ? step.icon : undefined}
                error={step.error}
              >
                {step.label}
              </StepLabel>

              {orientation === "vertical" && showDescription && (
                <StepContent>
                  <Typography variant="body2" color="text.secondary">
                    {step.description}
                  </Typography>
                </StepContent>
              )}
            </Step>
          ))}
        </Stepper>
      </Box>
    );
  }
);

AppStepper.displayName = "AppStepper";

AppStepper.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      description: PropTypes.string,
      icon: PropTypes.elementType,
      completed: PropTypes.bool,
      error: PropTypes.bool,
    })
  ).isRequired,
  activeStep: PropTypes.number,
  alternativeLabel: PropTypes.bool,
  orientation: PropTypes.oneOf(["horizontal", "vertical"]),
  showDescription: PropTypes.bool,
  sx: PropTypes.object,
  onStepClick: PropTypes.func,
};

export default AppStepper;
