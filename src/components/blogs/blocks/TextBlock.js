import { useState, useRef, useEffect } from 'react';
import react from 'react';

const TextBlock = ({ block, updateBlock, deleteBlock, isActive, setActive, addBlock }) => {
  const textareaRef = useRef(null);
  const [showToolbar, setShowToolbar] = useState(false);

  useEffect(() => {
    if (isActive && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isActive]);

  // Auto-resize textarea height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // reset
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px"; // grow
    }
  }, [block.content]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      addBlock('text');
    }
    
    if (e.key === 'Backspace' && block.content === '') {
      e.preventDefault();
      deleteBlock(block.id);
    }

    // Handle shortcuts
    if (e.key === '/' && block.content === '') {
      e.preventDefault();
      setShowToolbar(true);
    }
  };

  const shortcuts = [
    { key: '# ', type: 'heading', label: 'Heading' },
    { key: '- ', type: 'list', label: 'List' },
    { key: '```', type: 'code', label: 'Code Block' },
  ];

  const handleTextChange = (e) => {
    const value = e.target.value;
    
    // Check for shortcuts
    const shortcut = shortcuts.find(s => value.endsWith(s.key));
    if (shortcut) {
      const newContent = value.slice(0, -shortcut.key.length);
      updateBlock(block.id, { type: shortcut.type, content: newContent });
      return;
    }
    
    updateBlock(block.id, { content: value });
  };

  return (
    <div className={`group relative mb-4 ${isActive ? 'ring-1 ring-blue-500 rounded' : ''}`}>
      <textarea
        ref={textareaRef}
        value={block.content}
        onChange={handleTextChange}
        onKeyDown={handleKeyDown}
        onFocus={setActive}
        placeholder="Type / for commands, or start writing..."
        className="w-full p-2 border-none outline-none resize-none text-gray-700 leading-relaxed overflow-hidden"
        style={{ 
          fontSize: '18px',
          lineHeight: '1.6',
          fontFamily: 'Georgia, serif'
        }}
      />
      
      {/* Block controls */}
      {isActive && (
        <div className="absolute -left-8 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setShowToolbar(!showToolbar)}
            className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
          >
            ⋮
          </button>
        </div>
      )}

      {/* Toolbar */}
      {showToolbar && (
        <div className="absolute left-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <div className="p-2 space-y-1">
            <button
              onClick={() => {
                updateBlock(block.id, { type: 'heading' });
                setShowToolbar(false);
              }}
              className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded"
            >
              📝 Turn into heading
            </button>
            <button
              onClick={() => {
                updateBlock(block.id, { type: 'list', content: [block.content] });
                setShowToolbar(false);
              }}
              className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded"
            >
              📋 Turn into list
            </button>
            <button
              onClick={() => {
                deleteBlock(block.id);
                setShowToolbar(false);
              }}
              className="w-full text-left px-3 py-2 hover:bg-red-50 text-red-600 rounded"
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextBlock;
