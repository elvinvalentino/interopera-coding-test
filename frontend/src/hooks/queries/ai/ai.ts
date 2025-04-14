import { useQuery } from '@tanstack/react-query';

export const useAi = (question: string) => {
  return useQuery({
    queryKey: ['ai', question],
    queryFn: async (): Promise<string> => {
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
    enabled: false, // Only run the query if question is not empty
    refetchOnWindowFocus: false, // Disable refetching on window focus
  });
};
