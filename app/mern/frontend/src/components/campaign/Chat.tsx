import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

interface Message {
  id: string;
  content: string;
  sender: string;
}

const Chat: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const connectToSocket = async () => {
      try {
        // const socketInstance = io('http://localhost:3000'); // Replace with your Express server URL
        // socketInstance.on("seq-num", (msg) => console.info(msg));
        
        const socketInstance = io('http://localhost:3000'); // Replace with your Express server URL
        setSocket(socketInstance);

        socketInstance.on('connect', () => {
          console.log('Connected to Socket.IO server');
        });

        socketInstance.on('message', (message: Message) => {
          setMessages((prevMessages) => [...prevMessages, message]);
        });

        socketInstance.on('disconnect', () => {
          console.log('Disconnected from Socket.IO server');
        });

        socketInstance.on('connect_error', (err: any) => {
          setError(`Connection error: ${err.message}`);
        });
      } catch (err) {
        setError(`Error connecting to Socket.IO server: ${(err as Error).message}`);
      }
    };

    connectToSocket();

    return () => {
      socket?.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (socket && newMessage.trim()) {
      socket.emit('message', { content: newMessage, sender: 'You' });
      setNewMessage('');
    }
  };

  return (
    <div>
      {error && <div>Error: {error}</div>}
      <div>
        {messages.map((message) => (
          <div key={message.id}>
            <strong>{message.sender}:</strong> {message.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            sendMessage();
          }
        }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;