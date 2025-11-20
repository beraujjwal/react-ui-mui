import React, { Suspense } from 'react';
import { Loading } from '../components/common/mui';

export const withLoading = (Component) => {
  return (props) => (
    <Suspense fallback={<Loading />}>
      <Component {...props} />
    </Suspense>
  );
};