import { Grid, Group, Paper, SimpleGrid, Stack, Text } from '@mantine/core';
import classes from './style.module.css';
import {
  IconBuildingSkyscraper,
  IconContract,
  IconFileBroken,
  IconHeartHandshake,
} from '@tabler/icons-react';
import { sumDealValueByStatus } from '../../utils/sumDealValueByStatus';
import { Sale } from '../../hooks/queries/sales/sales';
import React from 'react';
import { getTotalClient } from '../../utils/getTotalClient';
import { formatNumberNotation } from '../../utils/formatNumberNotation';
import SalesDealWonRegionChart from '../SalesDealWonRegionChart';
import SalesLeaderboard from '../SalesLeaderboard';
import ClientTable from '../ClientTable';
import DealTable from '../DealTable';

interface IProps {
  sales: Sale[];
}

export const Sales: React.FC<IProps> = ({ sales }) => {
  return (
    <div className={classes.root}>
      <Grid>
        <Grid.Col span={{ base: 12, xs: 6, md: 3 }}>
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
                {formatNumberNotation(
                  sumDealValueByStatus(sales, 'Closed Won')
                )}
              </Text>
            </Group>
          </Paper>
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 6, md: 3 }}>
          <Paper withBorder p="md" radius="md">
            <Group justify="space-between">
              <Text size="xs" c="dimmed" className={classes.title}>
                Sales Deal Ongoing
              </Text>
              <IconContract className={classes.icon} size={22} stroke={1.5} />
            </Group>
            <Group align="flex-end" gap="xs" mt={10}>
              <Text className={classes.value}>
                {formatNumberNotation(
                  sumDealValueByStatus(sales, 'In Progress')
                )}
              </Text>
            </Group>
          </Paper>
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 6, md: 3 }}>
          <Paper withBorder p="md" radius="md">
            <Group justify="space-between">
              <Text size="xs" c="dimmed" className={classes.title}>
                Sales Deal Lost
              </Text>
              <IconFileBroken className={classes.icon} size={22} stroke={1.5} />
            </Group>
            <Group align="flex-end" gap="xs" mt={10}>
              <Text className={classes.value}>
                {formatNumberNotation(
                  sumDealValueByStatus(sales, 'Closed Won')
                )}
              </Text>
            </Group>
          </Paper>
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 6, md: 3 }}>
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
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Paper withBorder p="md" radius="md">
            <Text size="s" c="dimmed" className={classes.title}>
              Sales Deal Won Per Region
            </Text>

            <SalesDealWonRegionChart sales={sales} />
          </Paper>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Paper withBorder p="md" radius="md" h="100%">
            <Stack gap={0} h="100%">
              <Text size="s" c="dimmed" className={classes.title} mb={20}>
                Sales Rep Deal Won Leaderboard
              </Text>

              <SalesLeaderboard sales={sales} />
            </Stack>
          </Paper>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper withBorder p="md" radius="md">
            <Text size="s" c="dimmed" className={classes.title}>
              Client
            </Text>

            <ClientTable sales={sales} />
          </Paper>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper withBorder p="md" radius="md" h="100%">
            <Stack gap={0} h="100%">
              <Text size="s" c="dimmed" className={classes.title}>
                Deals
              </Text>

              <DealTable sales={sales} />
            </Stack>
          </Paper>
        </Grid.Col>
      </Grid>
    </div>
  );
};
