import React, { useState } from "react";
import { useTranslation } from 'react-i18next';

import { PageTitle } from '../../components/application/common/pageTitles/PageTitle'
import { ForgotPasswordForm } from '../../components/application/auth/ForgotPasswordForm'

const ForgotPasswordPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t('common.forgotPassword')}</PageTitle>
      <ForgotPasswordForm />
    </>
  );
};

export default ForgotPasswordPage;
