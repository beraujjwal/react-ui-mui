import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, TextInput, Password, Box } from '../../common/mui';

import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { useTranslation } from "react-i18next";
import { registerUser } from '../../../store/actions/userAction';

function SignUpForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { handleSubmit, control } = useForm({
    defaultValues: {
      name: 'John Doe',
      email: 'example@yopmail.com',
      password: '9876543210',
    },
  });

  const [isLoading, setLoading] = useState(false);

  const onSubmit = (data) => {
    setLoading(true);
    dispatch(registerUser(data)).unwrap()
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
        name="name"
        control={control}
        render={({ field }) => (
          <TextInput
            {...field}
            label={t('common.name')}
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextInput
            {...field}
            label={t('common.email')}
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
        {t('common.signUp')}
      </Button>
    </Box>
  );
}

export { SignUpForm };