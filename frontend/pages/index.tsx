import { useState } from 'react';
import { useSales } from '../src/hooks/queries/sales/sales';
import { useAi } from '../src/hooks/queries/ai/ai';
import { Navbar } from '../src/components/Navbar';
import { SalesDashboard } from '../src/components/SalesDashboard';
import AskAiButton from '../src/components/AskAiButton';

export default function Home() {
  return (
    <>
      <Navbar />
      <SalesDashboard />
      <AskAiButton />
    </>
  );
}
