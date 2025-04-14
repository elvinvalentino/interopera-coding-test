import { Group, Paper, SimpleGrid, Text } from '@mantine/core';
import classes from './style.module.css';
import {
  IconBuildingSkyscraper,
  IconContract,
  IconFileBroken,
  IconHeartHandshake,
  IconProgress,
} from '@tabler/icons-react';
import { sumDealValueByStatus } from '../../utils/sumDealValueByStatus';
import { Sale } from '../../hooks/queries/sales/sales';
import React from 'react';
import { getTotalClient } from '../../utils/getTotalClient';
import { formatNumberNotation } from '../../utils/formatNumberNotation';

interface Props {
  sales: Sale[];
}

export const SalesOverview: React.FC<Props> = ({ sales }) => {
  return (
    <div className={classes.root}>
      <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>
        <Paper withBorder p="md" radius="md">
          <Group justify="space-between">
            <Text size="xs" c="dimmed" className={classes.title}>
              Sales Deal Won
            </Text>
            <IconHeartHandshake
              className={classes.icon}
              size={22}
              stroke={1.5}
            />
          </Group>
          <Group align="flex-end" gap="xs" mt={10}>
            <Text className={classes.value}>
              {formatNumberNotation(sumDealValueByStatus(sales, 'Closed Won'))}
            </Text>
          </Group>
        </Paper>
        <Paper withBorder p="md" radius="md">
          <Group justify="space-between">
            <Text size="xs" c="dimmed" className={classes.title}>
              Sales Deal Ongoing
            </Text>
            <IconContract className={classes.icon} size={22} stroke={1.5} />
          </Group>
          <Group align="flex-end" gap="xs" mt={10}>
            <Text className={classes.value}>
              {formatNumberNotation(sumDealValueByStatus(sales, 'In Progress'))}
            </Text>
          </Group>
        </Paper>
        <Paper withBorder p="md" radius="md">
          <Group justify="space-between">
            <Text size="xs" c="dimmed" className={classes.title}>
              Sales Deal Lost
            </Text>
            <IconFileBroken className={classes.icon} size={22} stroke={1.5} />
          </Group>
          <Group align="flex-end" gap="xs" mt={10}>
            <Text className={classes.value}>
              {formatNumberNotation(sumDealValueByStatus(sales, 'Closed Won'))}
            </Text>
          </Group>
        </Paper>
        <Paper withBorder p="md" radius="md">
          <Group justify="space-between">
            <Text size="xs" c="dimmed" className={classes.title}>
              Client Handled
            </Text>
            <IconBuildingSkyscraper
              className={classes.icon}
              size={22}
              stroke={1.5}
            />
          </Group>
          <Group align="flex-end" gap="xs" mt={10}>
            <Text className={classes.value}>
              {formatNumberNotation(getTotalClient(sales))}
            </Text>
          </Group>
        </Paper>
      </SimpleGrid>
    </div>
  );
};
