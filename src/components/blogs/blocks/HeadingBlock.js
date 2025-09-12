import { useState, useRef, useEffect } from 'react';
import React from 'react';

const HeadingBlock = ({ block, updateBlock, deleteBlock, isActive, setActive, addBlock }) => {
  const inputRef = useRef(null);
  const [level, setLevel] = useState(block.level || 2);

  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addBlock('text');
    }
    
    if (e.key === 'Backspace' && block.content === '') {
      e.preventDefault();
      deleteBlock(block.id);
    }
  };

  const HeadingTag = `h${level}`;
  const fontSize = {
    1: 'text-4xl',
    2: 'text-3xl',
    3: 'text-2xl',
    4: 'text-xl',
  };

  return (
    <div className={`group relative mb-6 ${isActive ? 'ring-1 ring-blue-500 rounded' : ''}`}>
      <div className="flex items-center gap-2">
        <select
          value={level}
          onChange={(e) => {
            const newLevel = parseInt(e.target.value);
            setLevel(newLevel);
            updateBlock(block.id, { level: newLevel });
          }}
          className="text-sm text-gray-500 border border-gray-300 rounded px-2 py-1"
        >
          <option value={1}>H1</option>
          <option value={2}>H2</option>
          <option value={3}>H3</option>
          <option value={4}>H4</option>
        </select>
        
        <input
          ref={inputRef}
          value={block.content}
          onChange={(e) => updateBlock(block.id, { content: e.target.value })}
          onKeyDown={handleKeyDown}
          onFocus={setActive}
          placeholder="Heading..."
          className={`flex-1 font-bold border-none outline-none ${fontSize[level] || 'text-2xl'}`}
          style={{ fontFamily: 'serif' }}
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

export default HeadingBlock;