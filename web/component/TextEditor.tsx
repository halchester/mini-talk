import { Textarea, Box } from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:8000/');

export const TextEditor = () => {
  const [val, setVal] = useState('');
  const id = useRef(`${Date.now()}`);
  const editor = useRef<string | null>(null);
  const remote = useRef(false);

  React.useEffect(() => {
    socket.on(
      'new-operations',
      ({ editorId, operation }: { editorId: string; operation: string }) => {
        console.log(editorId, operation);
      }
    );
  }, []);

  return (
    <Box m="2">
      <Textarea
        placeholder="Type . . ."
        onChange={(e: any) => setVal(e.target.value)}
      />
    </Box>
  );
};
