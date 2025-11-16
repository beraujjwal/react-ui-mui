import logo from './logo.svg';
import './App.css';
import React from 'react';
import { themeObject } from './theme/themeVariables';
import { AppRouter } from './routers/AppRouter';
import { useAppSelector } from './hooks/reduxHooks';

function App() {
  const theme = useAppSelector((state) => state?.theme?.theme);
  return (
    <>
      <meta name="theme-color" content={themeObject[theme].primary} />
      <AppRouter />
    </>
  );
}

export default App;
