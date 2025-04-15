import { useMutation, useQuery } from '@tanstack/react-query';

export const useAi = () => {
  return useMutation({
    mutationFn: async ({
      history,
      question,
    }: {
      history: string;
      question: string;
    }): Promise<string> => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/ai`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ history, question }),
        }
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.answer;
    },
  });
};
