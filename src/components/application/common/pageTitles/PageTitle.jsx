import React from 'react';
// import { HelmetProvider } from 'react-helmet-async';

export const PageTitle = ({ children }) => {
  return (
    <title>{children} | Admin</title>
  );
};
