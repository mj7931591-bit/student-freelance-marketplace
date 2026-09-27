import React, { useState } from 'react';
import { ChatMessage, UserRole, StudentProfile, Proposal } from '../types';
import {
  Send,
  Paperclip,
  CheckCheck,
  Building,
  GraduationCap,
  Sparkles,
  FileText,
  DollarSign,
  ShieldCheck,
} from 'lucide-react';

interface MessagesViewProps {
  messages: ChatMessage[];
  onSendMessage: (content: string, recipientId: string, recipientName: string) => void;
  userRole: UserRole;
  currentStudent: StudentProfile;
  proposals: Proposal[];
  onAcceptProposal?: (proposal: Proposal) => void;
}

export const MessagesView: React.FC<MessagesViewProps> = ({
  messages,
  onSendMessage,
  userRole,
  currentStudent,
  proposals,
  onAcceptProposal,
}) => {
  const [activePartnerId, setActivePartnerId] = useState<string>('client-apex');
  const [inputText, setInputText] = useState('');

  // Contacts
  const contacts = [
    {
      id: 'client-apex',
      name: 'Julian Rivera',
      org: 'BeanRoast Campus Co.',
      role: 'Client / Founder',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=JulianRivera&backgroundColor=0d9488&textColor=ffffff',
      lastMessage: 'The subscription toggle interactions look super clean.',
    },
    {
      id: 'client-mit-lab',
      name: 'Dr. Aris Thorne',
      org: 'MIT Energy Innovation Lab',
      role: 'Client / Research Director',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=ArisThorne&backgroundColor=4f46e5&textColor=ffffff',
      lastMessage: 'GitHub repository configured with clean TypeScript definitions.',
    },
    {
      id: 'client-study-ai',
      name: 'Claire Vance',
      org: 'ExamForge AI',
      role: 'Client / Growth Lead',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=ClaireVance&backgroundColor=d97706&textColor=ffffff',
      lastMessage: 'Reviewing your proposed 10 video script ideas!',
    },
  ];

  const activeContact = contacts.find((c) => c.id === activePartnerId) || contacts[0];

  // Filter messages for current thread
  const threadMessages = messages.filter(
    (m) =>
      (m.senderId === activeContact.id && m.recipientId === currentStudent.id) ||
      (m.senderId === currentStudent.id && m.recipientId === activeContact.id) ||
      // Or general fallback matching
      m.senderName === activeContact.name ||
      m.recipientName === activeContact.name
  );

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText, activeContact.id, activeContact.name);
    setInputText('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="pb-4 border-b border-neutral-200">
        <h2 className="text-2xl font-display font-bold text-neutral-900 tracking-tight">
          Project Messages & Negotiation
        </h2>
        <p className="text-sm text-neutral-500 mt-0.5">
          Direct collegiate communications with project leads and founders.
        </p>
      </div>

      <div className="mt-6 bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs grid grid-cols-1 md:grid-cols-3 min-h-[580px]">
        {/* Contacts Sidebar */}
        <div className="border-r border-neutral-200 bg-neutral-50/50 flex flex-col">
          <div className="p-4 border-b border-neutral-200 text-xs font-bold text-neutral-500 uppercase tracking-wider">
            Conversations
          </div>

          <div className="divide-y divide-neutral-200/60 overflow-y-auto flex-1">
            {contacts.map((contact) => (
              <button
                key={contact.id}
                onClick={() => setActivePartnerId(contact.id)}
                className={`w-full p-4 text-left flex items-start gap-3 transition-colors ${
                  activeContact.id === contact.id ? 'bg-white shadow-xs' : 'hover:bg-neutral-100/70'
                }`}
              >
                <img
                  src={contact.avatar}
                  alt={contact.name}
                  className="w-10 h-10 rounded-full border border-neutral-300 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-neutral-900 truncate">
                      {contact.name}
                    </h4>
                  </div>
                  <div className="text-xs text-neutral-500 truncate">
                    {contact.org}
                  </div>
                  <p className="text-xs text-neutral-600 truncate mt-1">
                    {contact.lastMessage}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Message Thread */}
        <div className="md:col-span-2 flex flex-col h-full bg-white">
          {/* Thread Header */}
          <div className="p-4 border-b border-neutral-200 flex items-center justify-between bg-white">
            <div className="flex items-center gap-3">
              <img
                src={activeContact.avatar}
                alt={activeContact.name}
                className="w-9 h-9 rounded-full border border-neutral-300"
                referrerPolicy="no-referrer"
              />
              <div>
                <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                  <span>{activeContact.name}</span>
                  <span className="text-xs px-2 py-0.2 bg-neutral-100 text-neutral-600 rounded font-normal">
                    {activeContact.org}
                  </span>
                </h3>
                <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Active now
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-neutral-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">Escrow Protected Chat</span>
            </div>
          </div>

          {/* Messages list */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-neutral-50/30">
            {threadMessages.length === 0 ? (
              <div className="text-center py-12 text-neutral-400 text-sm">
                No previous messages with {activeContact.name}. Say hello to start discussing the milestone scope!
              </div>
            ) : (
              threadMessages.map((msg) => {
                const isMe = msg.senderRole === userRole;
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 mb-1 px-1">
                      <span>{msg.senderName}</span>
                      <span aria-hidden="true">·</span>
                      <span>{msg.timestamp}</span>
                    </div>

                    <div
                      className={`max-w-md p-3.5 rounded-2xl text-sm leading-relaxed ${
                        isMe
                          ? 'bg-neutral-900 text-white rounded-br-xs'
                          : 'bg-white border border-neutral-200 text-neutral-800 shadow-2xs rounded-bl-xs'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Input Box */}
          <form
            onSubmit={handleSend}
            className="p-3 sm:p-4 border-t border-neutral-200 bg-white flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Message ${activeContact.name} about scope, deliverable links, or milestones...`}
              className="flex-1 px-4 py-2 text-sm border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 text-neutral-900 placeholder:text-neutral-400"
            />

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="px-4 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 disabled:opacity-40 rounded-xl transition-colors flex items-center gap-1.5 shadow-xs shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
