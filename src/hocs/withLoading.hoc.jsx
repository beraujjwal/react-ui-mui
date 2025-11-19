import React, { Suspense } from 'react';
import { AppLoading } from '../components/common/mui';

export const withLoading = (Component) => {
  return (props) => (
    <Suspense fallback={<AppLoading />}>
      <Component {...props} />
    </Suspense>
  );
};