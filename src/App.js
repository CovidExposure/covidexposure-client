import 'dayjs/locale/en';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { Route, Routes } from "react-router-dom";
import * as React from 'react';

import DashboardPage from './pages/DashboardPage/DashboardPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';

export default function App() {
  return (
    <MantineProvider
      theme={{
        colorScheme: 'dark',
        datesLocale: 'en'
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <NotificationsProvider limit={3}>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </NotificationsProvider>
    </MantineProvider>
  );
}
