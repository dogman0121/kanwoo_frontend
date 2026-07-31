"use client";

import dynamic from 'next/dynamic';
import ChapterPage from './ChapterPage';

const ChapterPageDynamic = dynamic(() => import('./ChapterPage'), {
  ssr: false,
  loading: () => <div style={{ minHeight: '100vh' }} />,
});

export default function ChapterPageClient() {
  return <ChapterPage />;
}