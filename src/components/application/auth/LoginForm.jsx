import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, TextInput, Password, Box } from '../../common/mui';

import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { useTranslation } from "react-i18next";
import { loginUser } from '../../../store/actions/userAction';



import { createDeviceId, getDeviceId } from '../../../utils/device';

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { handleSubmit, control } = useForm({
    defaultValues: {
      username: '9876543210',
      password: '9876543210',
    },
  });

  const [isLoading, setLoading] = useState(false);

  const onSubmit = (data) => {
    setLoading(true);
    dispatch(loginUser(data)).unwrap()
      .then(() => navigate('/'))
      .catch((err) => {
        console.log(err);
        Notification.error({ message: err.message });
        setLoading(false);
      });
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Controller
        name="username"
        control={control}
        render={({ field }) => (
          <TextInput
            {...field}
            label={t('common.username')}
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <Password
            {...field}
            label={t('common.password')}
            type="password"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Button type="submit" variant="contained" size="medium" color="primary">
        {t('common.login')}
      </Button>
    </Box>
  );
}

export { LoginForm };