import React from 'react';
import { useTranslation } from 'react-i18next';

import { PageTitle } from '../../components/application/common/pageTitles/PageTitle'

const LockPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t('common.lock')}</PageTitle>
      {/* <LockForm /> */}
    </>
  );
};

export default LockPage;
