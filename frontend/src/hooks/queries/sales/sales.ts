import { useQuery } from '@tanstack/react-query';

export interface Sale {
  id: number;
  name: string;
  role: string;
  region: string;
  skills: string[];
  deals: Deal[];
  clients: Client[];
}

export interface Deal {
  client: string;
  value: number;
  status: string;
}

export interface Client {
  name: string;
  industry: string;
  contact: string;
}

export const useSales = () => {
  return useQuery({
    queryKey: ['sales'],
    queryFn: async (): Promise<Sale[]> => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/sales-reps`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.salesReps || [];
    },
  });
};
