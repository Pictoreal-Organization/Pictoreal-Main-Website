import React from 'react';
import { useState, useRef, useEffect } from 'react';

const ListBlock = ({ block, updateBlock, deleteBlock, isActive, setActive, addBlock }) => {
  const [listType, setListType] = useState(block.listType || 'bullet');
  const lastInputRef = useRef(null);

  const addListItem = () => {
    const newItems = [...(block.content || ['']), ''];
    updateBlock(block.id, { content: newItems });
    setTimeout(() => {
      if (lastInputRef.current) {
        lastInputRef.current.focus();
      }
    }, 0);
  };

  const updateListItem = (index, value) => {
    const newItems = [...block.content];
    newItems[index] = value;
    updateBlock(block.id, { content: newItems });
  };

  const deleteListItem = (index) => {
    if (block.content.length === 1) {
      deleteBlock(block.id);
    } else {
      const newItems = block.content.filter((_, i) => i !== index);
      updateBlock(block.id, { content: newItems });
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (block.content[index] === '') {
        addBlock('text');
      } else {
        addListItem();
      }
    }
    
    if (e.key === 'Backspace' && block.content[index] === '') {
      e.preventDefault();
      deleteListItem(index);
    }
  };

  return (
    <div className={`group relative mb-4 ${isActive ? 'ring-1 ring-blue-500 rounded p-2' : ''}`}>
      <div className="flex items-center gap-2 mb-2">
        <select
          value={listType}
          onChange={(e) => {
            setListType(e.target.value);
            updateBlock(block.id, { listType: e.target.value });
          }}
          className="text-sm text-gray-500 border border-gray-300 rounded px-2 py-1"
        >
          <option value="bullet">• Bullet</option>
          <option value="numbered">1. Numbered</option>
        </select>
      </div>

      <div className="space-y-2">
        {(block.content || ['']).map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            <span className="text-gray-500 mt-1 min-w-[20px]">
              {listType === 'numbered' ? `${index + 1}.` : '•'}
            </span>
            <input
              ref={index === block.content.length - 1 ? lastInputRef : null}
              value={item}
              onChange={(e) => updateListItem(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onFocus={setActive}
              placeholder="List item..."
              className="flex-1 border-none outline-none text-gray-700"
              style={{ fontSize: '16px', lineHeight: '1.5' }}
            />
            {block.content.length > 1 && (
              <button
                onClick={() => deleteListItem(index)}
                className="text-gray-400 hover:text-red-500 text-sm"
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={addListItem}
        className="mt-2 text-gray-500 hover:text-gray-700 text-sm"
      >
        + Add item
      </button>

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

export default ListBlock;