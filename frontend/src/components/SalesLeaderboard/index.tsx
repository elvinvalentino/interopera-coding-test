import React from 'react';
import { Avatar, Divider, Group, Stack, Text } from '@mantine/core';
import { Sale } from '../../hooks/queries/sales/sales';
import { formatNumberNotation } from '../../utils/formatNumberNotation';

interface IProps {
  sales: Sale[];
}

const SalesLeaderboard: React.FC<IProps> = ({ sales }) => {
  const salesRepsOrdered = [...sales].sort((a, b) => {
    const aWon = a.deals
      .filter(deal => deal.status === 'Closed Won')
      .reduce((a, b) => a + b.value, 0);
    const bWon = b.deals
      .filter(deal => deal.status === 'Closed Won')
      .reduce((a, b) => a + b.value, 0);
    return bWon - aWon;
  });

  return (
    <Stack justify="space-between" flex={1} gap={0}>
      {salesRepsOrdered.slice(0, 5).map((sale, index) => (
        <>
          <Group justify="space-between" key={sale.id} wrap="nowrap">
            <Group wrap="nowrap">
              <Group>
                <Avatar />
                <Stack justify="flex-start" gap={0}>
                  <Text fw={'bold'} size="s">
                    {sale.name}
                  </Text>
                  <Text c="dimmed" size="sm">
                    {sale.role}
                  </Text>
                </Stack>
              </Group>
            </Group>
            <Text size="s" fw={'bold'}>
              {formatNumberNotation(
                sale.deals
                  .filter(d => d.status === 'Closed Won')
                  .reduce((a, b) => a + b.value, 0)
              )}
            </Text>
          </Group>
        </>
      ))}
    </Stack>
  );
};

export default SalesLeaderboard;
