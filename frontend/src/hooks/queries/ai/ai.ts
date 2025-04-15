import { useMutation, useQuery } from '@tanstack/react-query';

interface IAiMutationParams {
  history: string;
  question: string;
}

export const useAi = () => {
  return useMutation({
    mutationFn: async (params: IAiMutationParams): Promise<string> => {
      const { history, question } = params;
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
