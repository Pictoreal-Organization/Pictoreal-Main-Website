import React, { useState } from 'react';
import TextBlock from './blocks/TextBlock';
import HeadingBlock from './blocks/HeadingBlock';
import ListBlock from './blocks/ListBlock';
import ImageBlock from './blocks/ImageBlock';
import CodeBlock from './blocks/CodeBlock';

const ContentEditor = ({ content, setContent }) => {
  const [activeBlock, setActiveBlock] = useState(null);

  const addBlock = (type, index) => {
    const newBlock = {
      id: Date.now().toString(),
      type,
      content: type === 'list' ? [''] : '',
      caption: '',
    };

    const newContent = [...content];
    newContent.splice(index + 1, 0, newBlock);
    setContent(newContent);
    setActiveBlock(newBlock.id);
  };

  const updateBlock = (id, updates) => {
    setContent(
      content.map((block) => (block.id === id ? { ...block, ...updates } : block))
    );
  };

  const deleteBlock = (id) => {
    if (content.length > 1) {
      setContent(content.filter((block) => block.id !== id));
    }
  };

  const moveBlock = (dragIndex, hoverIndex) => {
    const draggedBlock = content[dragIndex];
    const newContent = [...content];
    newContent.splice(dragIndex, 1);
    newContent.splice(hoverIndex, 0, draggedBlock);
    setContent(newContent);
  };

  const renderBlock = (block, index) => {
    const commonProps = {
      block,
      updateBlock,
      deleteBlock,
      isActive: activeBlock === block.id,
      setActive: () => setActiveBlock(block.id),
      addBlock: (type) => addBlock(type, index),
    };

    switch (block.type) {
      case 'heading':
        return <HeadingBlock key={block.id} {...commonProps} />;
      case 'list':
        return <ListBlock key={block.id} {...commonProps} />;
      case 'image':
        return <ImageBlock key={block.id} {...commonProps} />;
      case 'code':
        return <CodeBlock key={block.id} {...commonProps} />;
      default:
        return <TextBlock key={block.id} {...commonProps} />;
    }
  };

  return (
    <div className="max-w-none">
      {content.map((block, index) => renderBlock(block, index))}

      {/* Add block button */}
      <div className="mt-4">
        <AddBlockButton onAdd={(type) => addBlock(type, content.length - 1)} />
      </div>
    </div>
  );
};

const AddBlockButton = ({ onAdd }) => {
  const [showMenu, setShowMenu] = useState(false);

  const blockTypes = [
    { type: 'text', label: 'Text', icon: '📝' },
    { type: 'heading', label: 'Heading', icon: 'H' },
    { type: 'list', label: 'List', icon: '📋' },
    { type: 'image', label: 'Image', icon: '🖼️' },
    { type: 'code', label: 'Code', icon: '💻' },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-2 px-4 py-2 text-gray-500 hover:text-gray-700 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
      >
        <span className="text-xl">+</span>
        <span>Add Block</span>
      </button>

      {showMenu && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          {blockTypes.map(({ type, label, icon }) => (
            <button
              key={type}
              onClick={() => {
                onAdd(type);
                setShowMenu(false);
              }}
              className="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
            >
              <span>{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContentEditor;
