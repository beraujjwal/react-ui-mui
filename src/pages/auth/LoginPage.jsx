import React, { useState } from "react";
//import { useTranslation } from 'react-i18next';

import { PageTitle } from '../../components/application/common/pageTitles/PageTitle'
import { LoginForm } from '../../components/application/auth/LoginForm'

const LoginPage = () => {
  //const { t } = useTranslation();

  return (
    <>
      <PageTitle>Login Page</PageTitle>
      <LoginForm />
    </>
  );
};

export default LoginPage;
