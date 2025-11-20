import React from 'react';
import { Helmet } from 'react-helmet-async';

export const PageTitle = ({ children }) => {
  const NAME = process.env.REACT_APP_NAME;
  return (
    <Helmet>
      <title>{children} | {NAME}</title>
      <meta name="description" content="Welcome to MyApp" />
    </Helmet>
  );
};
