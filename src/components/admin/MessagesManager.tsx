import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { CMSContactMessage } from '../../types/cms';
import {
  Mail,
  Trash2,
  CheckCircle,
  Eye,
  Reply,
  X,
  Search,
  Filter,
  Clock,
  User,
} from 'lucide-react';

export const MessagesManager: React.FC = () => {
  const { messages, markMessageRead, deleteMessage, unreadMessagesCount } = useCMS();
  const [filterMode, setFilterMode] = useState<'all' | 'unread'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<CMSContactMessage | null>(null);

  const filteredMessages = messages.filter((msg) => {
    const matchesFilter = filterMode === 'all' || !msg.read;
    const matchesSearch =
      msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleOpenMessage = (msg: CMSContactMessage) => {
    setSelectedMessage(msg);
    if (!msg.read) {
      markMessageRead(msg.id, true);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Mail className="w-5 h-5 text-rose-400" />
            <span>Contact Messages &amp; Inquiries</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Read and manage submissions from your public portfolio contact form.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-cyan-300 px-3 py-1.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30">
            {unreadMessagesCount} Unread Inquiries
          </span>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              filterMode === 'all'
                ? 'bg-violet-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white bg-white/5'
            }`}
          >
            All Inquiries ({messages.length})
          </button>
          <button
            onClick={() => setFilterMode('unread')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              filterMode === 'unread'
                ? 'bg-violet-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white bg-white/5'
            }`}
          >
            Unread Only ({unreadMessagesCount})
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search inquiries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#070912] border border-white/10 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-violet-500"
          />
        </div>
      </div>

      {/* Messages List */}
      <div className="bg-[#0a0e1c] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        {filteredMessages.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500 font-mono">
            No contact messages match your filter.
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {filteredMessages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => handleOpenMessage(msg)}
                className={`p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors cursor-pointer ${
                  !msg.read
                    ? 'bg-violet-950/20 hover:bg-violet-950/30'
                    : 'hover:bg-white/[0.02]'
                }`}
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                      !msg.read
                        ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                        : 'bg-white/5 text-slate-400'
                    }`}
                  >
                    <Mail className="w-4 h-4" />
                  </div>

                  <div className="min-w-0 space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white truncate">
                        {msg.name}
                      </span>
                      {!msg.read && (
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-violet-600/40 text-violet-200 border border-violet-500/40">
                          NEW
                        </span>
                      )}
                      <span className="text-[11px] text-slate-400 font-mono truncate">
                        &lt;{msg.email}&gt;
                      </span>
                    </div>

                    <div className="text-xs text-slate-200 font-medium truncate">
                      {msg.subject}
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-1">
                      {msg.message}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 text-xs">
                  <span className="text-[11px] text-slate-500 font-mono">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        markMessageRead(msg.id, !msg.read);
                      }}
                      className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-white/5"
                      title={msg.read ? 'Mark as Unread' : 'Mark as Read'}
                    >
                      <CheckCircle className={`w-3.5 h-3.5 ${msg.read ? 'text-emerald-400' : ''}`} />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteMessage(msg.id);
                      }}
                      className="p-1.5 text-slate-400 hover:text-rose-400 rounded hover:bg-rose-950/30"
                      title="Delete Inquiry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#0b0e1a] border border-violet-500/30 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative text-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-violet-400" />
                <h3 className="text-sm font-bold text-white">Contact Message Details</h3>
              </div>
              <button
                onClick={() => setSelectedMessage(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 bg-[#070912] p-4 rounded-xl border border-white/5">
              <div>
                <span className="text-slate-500 font-mono block text-[10px] uppercase">
                  From
                </span>
                <span className="text-sm font-semibold text-white">
                  {selectedMessage.name}
                </span>
                <a
                  href={`mailto:${selectedMessage.email}`}
                  className="text-violet-300 font-mono block text-xs hover:underline mt-0.5"
                >
                  {selectedMessage.email}
                </a>
              </div>

              <div>
                <span className="text-slate-500 font-mono block text-[10px] uppercase">
                  Subject
                </span>
                <span className="text-xs font-medium text-slate-200">
                  {selectedMessage.subject}
                </span>
              </div>

              <div>
                <span className="text-slate-500 font-mono block text-[10px] uppercase">
                  Received At
                </span>
                <span className="text-slate-400 font-mono text-[11px]">
                  {new Date(selectedMessage.createdAt).toLocaleString()}
                </span>
              </div>

              <div className="pt-2 border-t border-white/5">
                <span className="text-slate-500 font-mono block text-[10px] uppercase mb-1">
                  Message Body
                </span>
                <p className="text-slate-200 text-xs leading-relaxed whitespace-pre-wrap">
                  {selectedMessage.message}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  deleteMessage(selectedMessage.id);
                  setSelectedMessage(null);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-rose-400 hover:bg-rose-950/30 rounded-lg"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>

              <a
                href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(
                  selectedMessage.subject
                )}`}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-xl shadow-md"
              >
                <Reply className="w-3.5 h-3.5" />
                <span>Reply by Email</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
