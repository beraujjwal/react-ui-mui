import React, { useState } from "react";
import { useTranslation } from 'react-i18next';

import { PageTitle } from '../../components/application/common/pageTitles/PageTitle'
import { LoginForm } from '../../components/application/auth/LoginForm'

const LoginPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t('common.login')}</PageTitle>
      <LoginForm />
    </>
  );
};

export default LoginPage;
