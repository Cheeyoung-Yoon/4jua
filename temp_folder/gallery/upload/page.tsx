// app/upload/page.tsx
'use client'
import { useState } from 'react';
import { supabase } from '../../../jua-app/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function Upload() {
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleUpload = async () => {
    if (!image) {
      setError('Please select an image to upload.');
      return;
    }

    setUploading(true);
    const fileExt = image.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('image-bucket') // 여기에 실제 버킷 이름을 입력하세요
      .upload(filePath, image);

    setUploading(false);

    if (uploadError) {
      setError(uploadError.message);
    } else {
      router.push('/');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl mb-4">Upload Image</h1>
      <input type="file" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white p-2 mt-4"
        disabled={uploading}
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}