'use client';

import { SoftUIControllerProvider } from '@/context';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/theme';
import 'bootstrap/dist/css/bootstrap.min.css'; // Impor CSS Bootstrap

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <SoftUIControllerProvider>
              {children}
            </SoftUIControllerProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}