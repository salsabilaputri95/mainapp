'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Logout() {
  const router = useRouter();
  const { logout } = useAuth();

  useEffect(() => {
    logout();
    router.push('/authentication/login');
  }, [router, logout]);

  return null;
}