import React, { useState, useRef, useEffect } from 'react';

function WebSocketChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const ws = useRef(null);
  const username = useRef('');

  useEffect(() => {
    // Создаем соединение при монтировании компонента
    ws.current = new WebSocket('ws://localhost:8000/ws/chat/');

    ws.current.onopen = () => {
      // При первом открытии соединения запрашиваем имя
      const name = prompt('Введите ваше имя:');
      username.current = name;
      // Отправляем имя серверу
      ws.current.send(name);
      // Можно также добавить сообщение о подключении
      setMessages(prev => [...prev, 'Соединение установлено.']);
    };

    ws.current.onmessage = (event) => {
      // Получаем сообщение
      setMessages(prev => [...prev, event.data]);
    };

    ws.current.onclose = () => {
      setMessages(prev => [...prev, 'Соединение закрыто']);
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket ошибка', error);
    };

    // Очистка при размонтировании
    return () => {
      if (ws.current) ws.current.close();
    };
  }, []);

  const sendMessage = () => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(input);
      setInput('');
    }
  };

  return (
    <div>
      <h2>WebSocket чат</h2>
      <div style={{ border: '1px solid black', height: '300px', overflowY: 'scroll', padding: '5px' }}>
        {messages.map((msg, idx) => (
          <div key={idx}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Введите сообщение"
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
      />
      <button onClick={sendMessage}>Отправить</button>
    </div>
  );
}

export default WebSocketChat;