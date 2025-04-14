import { Sale } from '../hooks/queries/sales/sales';

export const getTotalClient = (sales: Sale[]) => {
  let total = 0;
  for (const sale of sales) {
    total += sale.clients.length;
  }
  return total;
};
