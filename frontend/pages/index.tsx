import { useState } from 'react';
import { useSales } from '../src/hooks/queries/sales/sales';
import { useAi } from '../src/hooks/queries/ai/ai';
import { Navbar } from '../src/components/Navbar';
import { SalesDashboard } from '../src/components/SalesDashboard';

export default function Home() {
  const [question, setQuestion] = useState('');

  const { data: answer, refetch: askAi } = useAi(question);

  return (
    <>
      <Navbar />
      <SalesDashboard />
    </>
  );
}
