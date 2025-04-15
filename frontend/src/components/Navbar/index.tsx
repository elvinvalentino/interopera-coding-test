import { useState } from 'react';
import {
  Container,
  Group,
  Menu,
  UnstyledButton,
  Avatar,
  Text,
  Title,
} from '@mantine/core';
import classes from './style.module.css';

export const Navbar = () => {
  return (
    <div className={classes.header}>
      <Container className={classes.mainSection} size="xl">
        <Group justify="space-between">
          <Title order={1}>Dashboard</Title>

          <Menu width={260} position="bottom-end">
            <Menu.Target>
              <UnstyledButton className={classes.user}>
                <Group gap={7}>
                  <Avatar alt={'Admin'} radius="xl" size={40} />
                  <Text fw={500} size="sm" lh={1} mr={3}>
                    Hi, Admin
                  </Text>
                </Group>
              </UnstyledButton>
            </Menu.Target>
          </Menu>
        </Group>
      </Container>
    </div>
  );
};
