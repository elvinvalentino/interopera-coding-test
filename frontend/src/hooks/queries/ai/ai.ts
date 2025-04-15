import { useMutation, useQuery } from '@tanstack/react-query';

export const useAi = () => {
  return useMutation({
    mutationFn: async (question: string): Promise<string> => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/ai`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question }),
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
