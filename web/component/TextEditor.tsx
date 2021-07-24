import { Textarea, Box, Stack, Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:8000/');

export const TextEditor = () => {
  const [val, setVal] = useState('');

  socket.on('chat-message', (data) => {
    console.log(data);
  });
  socket.on('user-connceted', (name) => {
    console.log(`${name} connceted!`);
  });
  socket.on('user-disconnected', (val) => {
    console.log(`${val} disconnected!`);
  });

  const message = () => {
    socket.emit('send-chat-message', val);
  };

  return (
    <Box m="2">
      <Stack spacing={4}>
        <Textarea
          placeholder="Type . . ."
          value={val}
          onChange={(e: any) => {
            setVal(e.target.value);
            socket.emit('/', val);
          }}
        />
        <Button colorScheme="teal" onClick={() => message()}>
          Send
        </Button>
      </Stack>
    </Box>
  );
};
