import { Box, Grid } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

/**
 * Application styled Form container
 * @component AppForm
 */
const AppForm = ({ children, ...resOfProps }) => {
  return (
    <form {...resOfProps}>
      <Grid container direction="column" alignItems="center">
        <Box maxWidth="40rem" width="100%">
          {children}
        </Box>
      </Grid>
    </form>
  );
};

export default AppForm;