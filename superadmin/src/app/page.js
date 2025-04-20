import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export const metadata = {
  title: 'SuperAdmin',
  description: 'Aplikasi Manajemen user',
};

export default async function Home() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/authentication/sign-in');
  }

  try {
    const response = await fetch('http://localhost:8080/api/user/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      // Token tidak valid, hapus cookie
      cookieStore.delete('token');
      redirect('/authentication/sign-in');
    }

    // Token valid, arahkan ke dashboard
    redirect('/dashboard');
  } catch (error) {
    console.error('Gagal memvalidasi token:', error.message);
    // Hapus cookie jika error (misalnya, backend mati)
    cookieStore.delete('token');
    redirect('/authentication/sign-in');
  }
}