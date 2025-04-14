import { Sale } from '../hooks/queries/sales/sales';

export const sumDealValueByStatus = (
  sales: Sale[],
  status: 'Closed Won' | 'In Progress' | 'Closed Lost'
) => {
  let total = 0;
  for (const sale of sales) {
    for (const deal of sale.deals) {
      if (deal.status !== status) continue;
      total += deal.value;
    }
  }
  return total;
};
