import React, { useState } from 'react';
import { Sparkles, Send, Loader2, Bot } from 'lucide-react';
import { generateHRAssistance } from '../services/geminiService';
import { useApp } from '../context/AppContext';

const AiAssistant: React.FC = () => {
  const { employees, departments } = useApp();
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setResponse('');

    // Prepare context to help Gemini understand the current state
    const context = `
      Total Employees: ${employees.length}.
      Departments: ${departments.map(d => d.name).join(', ')}.
      Recent Request: User is asking about HR operations.
    `;

    const result = await generateHRAssistance(prompt, context);
    setResponse(result);
    setLoading(false);
  };

  const suggestedPrompts = [
    "Draft a job description for a Senior Lecturer in CS",
    "Write an email announcing the annual leave policy",
    "How do I calculate overtime payment?",
    "Generate 5 interview questions for an HR Manager"
  ];

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-purple-700 to-blue-600 p-6 text-white">
        <div className="flex items-center gap-3">
          <Sparkles className="text-yellow-300" size={28} />
          <div>
            <h2 className="text-2xl font-bold">Assosa HR AI Assistant</h2>
            <p className="text-blue-100 text-sm opacity-90">Powered by Gemini 2.5 Flash</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Welcome / Empty State */}
        {!response && !loading && (
          <div className="text-center py-10">
            <Bot size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">How can I help you today?</h3>
            <p className="text-gray-500 max-w-md mx-auto mt-2">I can help draft documents, explain policies, or analyze HR trends.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-8 max-w-2xl mx-auto">
              {suggestedPrompts.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => setPrompt(suggestion)}
                  className="p-3 text-left text-sm bg-gray-50 hover:bg-blue-50 border border-gray-200 rounded-lg transition-colors text-gray-700"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* User Prompt Bubble (if submitted) */}
        {loading && (
           <div className="flex justify-center py-12">
             <div className="flex items-center space-x-2 text-purple-600">
               <Loader2 className="animate-spin" />
               <span className="font-medium">Thinking...</span>
             </div>
           </div>
        )}

        {/* AI Response */}
        {response && (
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
             <div className="flex items-start gap-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                    <Sparkles size={20} className="text-purple-600" />
                </div>
                <div className="prose prose-blue max-w-none text-gray-800 whitespace-pre-line leading-relaxed">
                    {response}
                </div>
             </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t bg-gray-50">
        <div className="max-w-4xl mx-auto flex gap-3">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
            placeholder="Ask anything about HR..."
            className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
          />
          <button
            onClick={handleAsk}
            disabled={loading || !prompt}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
          >
            <Send size={18} className="mr-2" />
            Ask
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiAssistant;
