import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  CloseButton,
  Group,
  Input,
  Loader,
  Paper,
  Popover,
  Stack,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { IconMessageChatbot, IconSend2, IconX } from '@tabler/icons-react';
import classes from './style.module.css';
import { useDisclosure } from '@mantine/hooks';
import { useAi } from '../../hooks/queries/ai/ai';
import Markdown from 'react-markdown';

interface IProps {}

const AskAiButton: React.FC<IProps> = () => {
  const [opened, { toggle }] = useDisclosure(false);
  const [chats, setChats] = useState<
    { message: string; role: 'bot' | 'human' }[]
  >([{ message: 'How can i help you today?', role: 'bot' }]);
  const [chat, setChat] = useState<string>('');
  const { mutateAsync: askAi, isPending } = useAi();

  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats]);

  useEffect(() => {
    if (!opened)
      setChats([{ message: 'How can i help you today?', role: 'bot' }]);
  }, [opened]);

  const onChatSend = async () => {
    if (isPending || !chat) return;
    setChats(prevChats => [
      ...prevChats,
      {
        message: chat,
        role: 'human',
      },
    ]);
    setChat('');
    const answer = await askAi(chat);
    setChats(prevChats => [
      ...prevChats,
      {
        message: answer,
        role: 'bot',
      },
    ]);
  };

  return (
    <Popover width={350} position="top" shadow="sm" opened={opened}>
      <Popover.Target>
        <Button
          w={60}
          h={60}
          onClick={toggle}
          className={classes.askAIButton}
          radius={'xl'}
        >
          <IconMessageChatbot />
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Stack h={400} justify="space-between">
          <Group justify="space-between" align="center">
            <Text size="sm">Chat with AI</Text>
            <CloseButton onClick={toggle} />
          </Group>
          <Stack justify="flex-end" style={{ overflowY: 'auto' }} flex={1}>
            <Stack style={{ overflowY: 'auto' }}>
              {chats.map((chat, idx) =>
                chat.role === 'bot' ? (
                  <Text key={idx} size="sm">
                    <Markdown>{chat.message}</Markdown>
                  </Text>
                ) : (
                  <Group key={idx} justify="flex-end">
                    <Paper radius={'xl'} py={'xs'} px={'lg'} withBorder>
                      <Text size="sm">{chat.message}</Text>
                    </Paper>
                  </Group>
                )
              )}
              {isPending && <Loader color="gray" type="dots" />}
              <div ref={bottomRef} />
            </Stack>
          </Stack>
          <form onSubmit={e => e.preventDefault()}>
            <Group align="center">
              <Input
                flex={1}
                variant="unstyled"
                placeholder="Ask AI anything..."
                onChange={e => setChat(e.target.value)}
                value={chat}
                disabled={isPending}
              />
              <Button
                type="submit"
                size="xs"
                radius={'xl'}
                onClick={onChatSend}
              >
                {<IconSend2 size={20} />}
              </Button>
            </Group>
          </form>
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
};

export default AskAiButton;
