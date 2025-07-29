import React, { useState } from 'react';

const mockUsers = [
  { id: 'u1', name: 'Alice' },
  { id: 'u2', name: 'Bob' },
  { id: 'u3', name: 'Carol' },
];

const initialMessages = {
  u1: [
    { from: 'them', text: 'Hi! Need help with your order?' },
    { from: 'me', text: 'Yes, thanks!' },
  ],
  u2: [
    { from: 'them', text: 'Delivery scheduled for tomorrow.' },
  ],
  u3: [],
};

const MessagingPanel: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [selected, setSelected] = useState('u1');
  const [messages, setMessages] = useState<any>(initialMessages);
  const [input, setInput] = useState('');

  const send = () => {
    if (!input.trim()) return;
    setMessages((msgs: any) => ({
      ...msgs,
      [selected]: [...msgs[selected], { from: 'me', text: input }],
    }));
    setInput('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl relative flex flex-col" style={{height: 500}}>
        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-800" onClick={onClose}>&times;</button>
        <h2 className="text-2xl font-bold mb-6">Messages</h2>
        <div className="flex flex-1 min-h-0">
          <div className="w-48 border-r pr-4 overflow-y-auto">
            <h3 className="font-semibold mb-2">Users</h3>
            <ul>
              {mockUsers.map(u => (
                <li key={u.id}>
                  <button
                    className={`w-full text-left px-2 py-1 rounded mb-1 ${selected === u.id ? 'bg-blue-100 font-bold' : ''}`}
                    onClick={() => setSelected(u.id)}
                  >
                    {u.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 flex flex-col pl-4">
            <div className="flex-1 overflow-y-auto border-b mb-2 p-2 bg-gray-50 rounded">
              {messages[selected].length === 0 ? (
                <div className="text-gray-400">No messages yet.</div>
              ) : (
                messages[selected].map((m: any, i: number) => (
                  <div key={i} className={`mb-2 flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                    <span className={`inline-block px-3 py-2 rounded-lg ${m.from === 'me' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-900'}`}>{m.text}</span>
                  </div>
                ))
              )}
            </div>
            <div className="flex mt-2">
              <input
                className="flex-1 border rounded px-3 py-2 mr-2"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type a message..."
                onKeyDown={e => { if (e.key === 'Enter') send(); }}
              />
              <button className="btn-primary" onClick={send}>Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagingPanel; 