// app/login/page.tsx
'use client'
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // 주어진 URL을 배경 이미지로 설정
    const imageUrl = 'https://mmxgnbudxaipuexyjmng.supabase.co/storage/v1/object/sign/image-bucket/1732469146783.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZS1idWNrZXQvMTczMjQ2OTE0Njc4My5wbmciLCJpYXQiOjE3MzI0NjkyNzQsImV4cCI6MTc2NDAwNTI3NH0.HOQTWvP6p6Ksv4voW0J-i1_1sKjL5deo3H6ICs3SL_E&t=2024-11-24T17%3A27%3A53.720Z';
    setBackgroundImage(imageUrl);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else router.push('/');
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen py-2"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: backgroundImage ? 'transparent' : 'gray', // 이미지가 없을 때 배경색 설정
      }}
    >
      
      <form onSubmit={handleLogin} className="flex flex-col gap-4 bg-white p-6 rounded shadow-md max-w-md w-full">
      <h1 className="text-2xl mb-4 text-black">  로그인 해야 들어갈 수 있어요!</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">Login</button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}