// app/page.tsx
'use client'
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // 클라이언트 측에서만 실행
    if (typeof window !== 'undefined') {
      const checkUser = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          router.push('/login');
        } else {
          setLoading(false);
          fetchData();
        }
      };

      const fetchData = async () => {
        const { data, error } = await supabase
          .from('master') // 여기에 실제 테이블 이름을 입력하세요
          .select('*');
        if (error) {
          console.error('Error fetching data:', error.message);
        } else {
          setData(data);
        }
      };

      checkUser();
    }
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <button onClick={handleLogout} className="bg-red-500 text-white p-2">Logout</button>
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a>
            {/* Supabase에서 가져온 데이터를 표시 */}
            {data.map((item) => (
              <div key={item.id}>{item.name}</div>
            ))}
          </a>
        </div>
      </main>
    </div>
  );
}