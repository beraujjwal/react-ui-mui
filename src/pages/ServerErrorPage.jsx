// import React from 'react';
// import { useTranslation } from 'react-i18next';
// import { Error } from '../components/Error/Error';
// import { PageTitle } from '../components/common/pageTitles/PageTitle';
// import serverError from '..//assets/images/server-error.svg';
import { PageTitle } from '../components/application/common/pageTitles/PageTitle';

const ServerErrorPage = () => {
  // const { t } = useTranslation();

  return (
    <>
      <PageTitle>Server Error</PageTitle>
      {/* <Error img={serverError} msg={t('serverError.main')} /> */}
      <h1>Server Error</h1>
    </>
  );
};

export default ServerErrorPage;