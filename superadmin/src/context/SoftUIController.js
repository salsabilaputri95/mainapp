'use client';

import { useSoftUIController } from '@/context';
import { Typography, Button } from '@mui/material';

export default function Dashboard() {
  const { controller, toggleDarkMode, toggleSidebar } = useSoftUIController();

  return (
    <div>
      <Typography variant="h4">Dashboard</Typography>
      <Button onClick={toggleDarkMode}>
        Toggle Dark Mode: {controller.darkMode ? 'On' : 'Off'}
      </Button>
      <Button onClick={toggleSidebar}>
        Toggle Sidebar: {controller.sidebarOpen ? 'Open' : 'Closed'}
      </Button>
    </div>
  );
}