import react from 'react';
import { useState } from 'react';

const CodeBlock = ({ block, updateBlock, deleteBlock, isActive, setActive }) => {
  const [language, setLanguage] = useState(block.language || 'javascript');

  const languages = [
    'javascript', 'python', 'java', 'cpp', 'html', 'css', 'php', 'ruby', 'go', 'rust'
  ];

  return (
    <div className={`group relative mb-6 ${isActive ? 'ring-2 ring-blue-500 rounded' : ''}`}>
      <div className="bg-gray-900 rounded-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 text-gray-300 text-sm">
          <select
            value={language}
            onChange={(e) => {
              setLanguage(e.target.value);
              updateBlock(block.id, { language: e.target.value });
            }}
            className="bg-gray-700 text-gray-300 border border-gray-600 rounded px-2 py-1 text-xs"
          >
            {languages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
          <button
            onClick={() => {
              navigator.clipboard.writeText(block.content || '');
            }}
            className="text-gray-400 hover:text-white text-xs cursor-pointer"
          >
            Copy
          </button>
        </div>
        
        {/* Code area */}
        <textarea
          value={block.content || ''}
          onChange={(e) => updateBlock(block.id, { content: e.target.value })}
          onFocus={setActive}
          placeholder="Enter your code..."
          className="w-full h-48 p-4 bg-gray-900 text-green-400 font-mono text-sm border-none outline-none resize-none"
          style={{ fontFamily: 'Monaco, Consolas, "Courier New", monospace' }}
        />
      </div>

      {/* Block controls */}
      {isActive && (
        <div className="absolute -left-8 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => deleteBlock(block.id)}
            className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-gray-100 rounded"
          >
            🗑️
          </button>
        </div>
      )}
    </div>
  );
};

export default CodeBlock;