import { useState } from 'react';
import { useSales } from '../hooks/queries/sales/sales';
import { useAi } from '../hooks/queries/ai/ai';

export default function Home() {
  const [question, setQuestion] = useState('');

  const { data: sales, isFetching: isSalesFetching } = useSales();
  const { data: answer, refetch: askAi } = useAi(question);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Next.js + FastAPI Sample</h1>

      <section style={{ marginBottom: '2rem' }}>
        <h2>Dummy Data</h2>
        {isSalesFetching ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {sales.map(sale => (
              <li key={sale.id}>
                {sale.name} - {sale.role}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2>Ask a Question (AI Endpoint)</h2>
        <div>
          <input
            type="text"
            placeholder="Enter your question..."
            value={question}
            onChange={e => setQuestion(e.target.value)}
          />
          <button onClick={() => askAi()}>Ask</button>
        </div>
        {answer && (
          <div style={{ marginTop: '1rem' }}>
            <strong>AI Response:</strong> {answer}
          </div>
        )}
      </section>
    </div>
  );
}
