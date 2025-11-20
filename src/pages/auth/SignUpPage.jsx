import React, { useState } from "react";
import { useTranslation } from 'react-i18next';

import { PageTitle } from '../../components/application/common/pageTitles/PageTitle'
import { SignUpForm } from '../../components/application/auth/SignUpForm'

const SignUpPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t('common.signUp')}</PageTitle>
      <SignUpForm />
    </>
  );
};

export default SignUpPage;
