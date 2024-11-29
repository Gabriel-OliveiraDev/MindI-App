import React from 'react'
import { Routes } from '@/routes/Routes';
import { AppProvider, AuthProvider, ThemeProvider } from '@context';

export default function App() {

  return (
    <AuthProvider>
      <AppProvider>
        <ThemeProvider>
          <Routes />
        </ThemeProvider>
      </AppProvider>
    </AuthProvider>
  );
};