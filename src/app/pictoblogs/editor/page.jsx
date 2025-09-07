'use client';
import React, { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios"; // <-- Add this line
import {
  Bold,
  Italic,
  Link,
  Quote,
  Code,
  Image,
  List,
  ListOrdered,
  Plus,
  Settings,
  Save,
  Send,
  Minus,
  Eye,
  Clock,
  MoreHorizontal,
  Type,
  AlignLeft,
  X,
  ChevronDown,
  Hash,
  Video,
  Mic
} from "lucide-react";

// Enhanced Format Toolbar with better positioning and animations
const FormatToolbar = ({ show, position, onFormat, onClearSelection }) => {
  if (!show) return null;
  
  return (
    <div
      className="fixed z-50 bg-gray-900 text-white rounded-lg shadow-2xl flex items-center border border-gray-700 transition-all duration-200 ease-out transform"
      style={{ 
        top: position.top, 
        left: position.left,
        transform: 'translateX(-50%)',
        animation: show ? 'fadeInUp 0.2s ease-out' : 'fadeOut 0.2s ease-out'
      }}
    >
      <button 
        onClick={() => onFormat("bold")} 
        title="Bold (Ctrl+B)" 
        className="p-3 hover:bg-gray-700 rounded-l-lg transition-colors duration-150 font-bold"
      >
        <Bold size={16} />
      </button>
      <div className="w-px bg-gray-600" />
      <button 
        onClick={() => onFormat("italic")} 
        title="Italic (Ctrl+I)" 
        className="p-3 hover:bg-gray-700 transition-colors duration-150"
      >
        <Italic size={16} />
      </button>
      <div className="w-px bg-gray-600" />
      <button
        onClick={() => onFormat("link")}
        title="Add Link (Ctrl+K)"
        className="p-3 hover:bg-gray-700 transition-colors duration-150"
      >
        <Link size={16} />
      </button>
      <div className="w-px bg-gray-600" />
      <button 
        onClick={() => onFormat("code")} 
        title="Inline Code" 
        className="p-3 hover:bg-gray-700 transition-colors duration-150"
      >
        <Code size={16} />
      </button>
      <div className="w-px bg-gray-600" />
      <button 
        onClick={onClearSelection} 
        title="Clear Selection (Esc)" 
        className="p-3 hover:bg-gray-700 rounded-r-lg text-gray-400 transition-colors duration-150"
      >
        <X size={14} />
      </button>
    </div>
  );
};

// Enhanced Plus Menu with better categorization
const PlusMenu = ({ show, position, onInsert }) => {
  if (!show) return null;
  
  const menuItems = [
    { 
      icon: Image, 
      label: "Image", 
      type: "image", 
      desc: "Upload from computer",
      category: "media",
      shortcut: "Ctrl+Shift+I"
    },
    { 
      icon: Video, 
      label: "Video", 
      type: "video", 
      desc: "Embed a video",
      category: "media"
    },
    { 
      icon: Code, 
      label: "Code Block", 
      type: "codeblock", 
      desc: "Add syntax highlighting",
      category: "format",
      shortcut: "```"
    },
    { 
      icon: Quote, 
      label: "Quote", 
      type: "blockquote", 
      desc: "Capture a quote",
      category: "format",
      shortcut: ">"
    },
    { 
      icon: List, 
      label: "Bullet List", 
      type: "ul", 
      desc: "Create a simple list",
      category: "format",
      shortcut: "-"
    },
    { 
      icon: ListOrdered, 
      label: "Numbered List", 
      type: "ol", 
      desc: "Create an ordered list",
      category: "format",
      shortcut: "1."
    },
    { 
      icon: Minus, 
      label: "Divider", 
      type: "divider", 
      desc: "Visually divide sections",
      category: "format",
      shortcut: "---"
    }
  ];

  return (
    <div
      className="fixed z-50 bg-white border border-gray-200 rounded-xl shadow-2xl py-2 min-w-80 max-h-96 overflow-y-auto"
      style={{ 
        top: position.top, 
        left: position.left,
        animation: 'fadeInScale 0.2s ease-out'
      }}
    >
      <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide border-b border-gray-100">
        Insert Content
      </div>
      {menuItems.map((item) => (
        <button
          key={item.type}
          onClick={() => onInsert(item.type)}
          className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3 transition-colors duration-150"
        >
          <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-gray-200 transition-colors duration-150">
            <item.icon size={16} className="text-gray-600" />
          </div>
          <div className="flex-1">
            <div className="text-gray-900 font-medium text-sm">{item.label}</div>
            <div className="text-xs text-gray-500 mt-0.5">{item.desc}</div>
          </div>
          {item.shortcut && (
            <div className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded font-mono">
              {item.shortcut}
            </div>
          )}
        </button>
      ))}
    </div>
  );
};

// Enhanced Heading Menu
const HeadingMenu = ({ show, position, onInsert }) => {
  if (!show) return null;
  
  const headings = [
    { level: 1, label: "Title", size: "text-4xl", desc: "Big section heading" },
    { level: 2, label: "Heading", size: "text-3xl", desc: "Medium section heading" },
    { level: 3, label: "Subheading", size: "text-2xl", desc: "Small section heading" },
    { level: 4, label: "Paragraph", size: "text-xl", desc: "Normal paragraph text" }
  ];

  return (
    <div
      className="fixed z-50 bg-white border border-gray-200 rounded-xl shadow-2xl py-2 min-w-64"
      style={{ 
        top: position.top, 
        left: position.left,
        animation: 'fadeInScale 0.2s ease-out'
      }}
    >
      <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide border-b border-gray-100">
        Turn Into
      </div>
      {headings.map((heading) => (
        <button
          key={heading.level}
          onClick={() => onInsert(`h${heading.level}`)}
          className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3 transition-colors duration-150"
        >
          <div className={`font-semibold ${heading.size} text-gray-900 leading-none`}>
            T
          </div>
          <div>
            <div className="text-gray-900 font-medium text-sm">{heading.label}</div>
            <div className="text-xs text-gray-500 mt-0.5">{heading.desc}</div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default function EnhancedEditor() {
  // Mock user for demo
  const [user] = useState({ id: 1, name: "Demo User", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" });
  
  const [editorState, setEditorState] = useState({
    title: "",
    subtitle: "",
    content: "",
    tags: [],
    isDraft: true,
    wordCount: 0,
    readTime: 0,
    lastSaved: null
  });

  const [showFormatToolbar, setShowFormatToolbar] = useState(false);
  const [showPlusMenu, setShowPlusMenu] = useState(false);
  const [showHeadingMenu, setShowHeadingMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [toolbarPosition, setToolbarPosition] = useState({ top: 0, left: 0 });
  const [plusMenuPosition, setPlusMenuPosition] = useState({ top: 0, left: 0 });
  const [currentTag, setCurrentTag] = useState("");
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [loading, setLoading] = useState(false);

  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const contentRef = useRef(null);
  const fileInputRef = useRef(null);
  const plusBtnRef = useRef(null);
  const autoSaveTimeoutRef = useRef(null);

  // Auto-save functionality
  useEffect(() => {
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }
    
    if (editorState.title || editorState.content) {
      autoSaveTimeoutRef.current = setTimeout(() => {
        setIsAutoSaving(true);
        // Simulate save
        setTimeout(() => {
          setIsAutoSaving(false);
          setEditorState(prev => ({ ...prev, lastSaved: new Date() }));
        }, 1000);
      }, 2000);
    }

    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [editorState.title, editorState.content]);

  // Word count and read time calculation
  useEffect(() => {
    const text = (editorState.content + " " + editorState.title + " " + editorState.subtitle)
      .replace(/<[^>]*>/g, "")
      .trim();
    const words = text.length === 0 ? 0 : text.split(/\s+/).filter(Boolean).length;
    const readTime = Math.max(1, Math.ceil(words / 200));
    
    setEditorState(prev => ({ 
      ...prev, 
      wordCount: words, 
      readTime 
    }));
  }, [editorState.content, editorState.title, editorState.subtitle]);

  // Enhanced text selection handler
  const handleTextSelection = useCallback(() => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0 && contentRef.current?.contains(selection.anchorNode)) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const top = rect.top + window.scrollY - 60;
      const left = rect.left + window.scrollX + rect.width / 2;
      
      setToolbarPosition({ 
        top: Math.max(10, top), 
        left: Math.max(10, Math.min(left, window.innerWidth - 200))
      });
      setShowFormatToolbar(true);
      setShowPlusMenu(false);
      setShowHeadingMenu(false);
    } else {
      setShowFormatToolbar(false);
    }
  }, []);

  // Enhanced formatting with better error handling
  const handleFormat = useCallback((type) => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    try {
      switch (type) {
        case "bold":
          document.execCommand("bold");
          break;
        case "italic":
          document.execCommand("italic");
          break;
        case "link": {
          const selectedText = selection.toString();
          const url = prompt("Enter URL:", selectedText.startsWith('http') ? selectedText : 'https://');
          if (url && url.trim()) {
            document.execCommand("createLink", false, url.trim());
          }
          break;
        }
        case "code": {
          const selectedText = selection.toString();
          if (selectedText) {
            document.execCommand("insertHTML", false, `<code>${selectedText}</code>`);
          }
          break;
        }
        default:
          break;
      }
    } catch (error) {
      console.error('Formatting error:', error);
    }

    setShowFormatToolbar(false);
    contentRef.current?.focus();
    updateContent();
  }, []);

  // Update content helper
  const updateContent = useCallback(() => {
    if (contentRef.current) {
      setEditorState(prev => ({ 
        ...prev, 
        content: contentRef.current.innerHTML 
      }));
    }
  }, []);

  // Enhanced keyboard shortcuts
  const handleKeyDown = useCallback((e) => {
    // Clear selections on Escape
    if (e.key === "Escape") {
      const selection = window.getSelection();
      if (selection) selection.removeAllRanges();
      setShowFormatToolbar(false);
      setShowPlusMenu(false);
      setShowHeadingMenu(false);
      return;
    }

    // Formatting shortcuts
    const isCtrlOrCmd = e.ctrlKey || e.metaKey;
    
    if (isCtrlOrCmd) {
      switch (e.key.toLowerCase()) {
        case "b":
          e.preventDefault();
          handleFormat("bold");
          return;
        case "i":
          e.preventDefault();
          handleFormat("italic");
          return;
        case "k":
          e.preventDefault();
          handleFormat("link");
          return;
        case "s":
          e.preventDefault();
          handleSaveDraft();
          return;
        case "enter":
          e.preventDefault();
          handlePublish();
          return;
      }
    }

    // Smart list continuation
    if (e.key === "Enter" && !e.shiftKey) {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const container = range.startContainer;
        const element = container.nodeType === Node.TEXT_NODE ? container.parentElement : container;
        
        // Handle list items
        if (element.tagName === "LI") {
          const listItem = element;
          const textContent = listItem.textContent.trim();
          
          if (textContent === "") {
            e.preventDefault();
            // Exit list if empty item
            const list = listItem.parentElement;
            const newP = document.createElement("p");
            newP.innerHTML = "<br>";
            list.after(newP);
            
            // Focus new paragraph
            const newRange = document.createRange();
            newRange.setStart(newP, 0);
            newRange.collapse(true);
            selection.removeAllRanges();
            selection.addRange(newRange);
            
            // Remove empty list item
            listItem.remove();
            if (list.children.length === 0) {
              list.remove();
            }
            
            updateContent();
          }
        }
      }
    }

    // Auto-formatting shortcuts
    if (e.key === " " && contentRef.current) {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const textNode = range.startContainer;
        
        if (textNode.nodeType === Node.TEXT_NODE) {
          const text = textNode.textContent.slice(0, range.startOffset);
          
          // Handle markdown-style shortcuts
          if (text.endsWith("##")) {
            e.preventDefault();
            const newText = textNode.textContent.replace(/##$/, "");
            textNode.textContent = newText;
            document.execCommand("formatBlock", false, "h2");
            return;
          }
          
          if (text.endsWith("#")) {
            e.preventDefault();
            const newText = textNode.textContent.replace(/#$/, "");
            textNode.textContent = newText;
            document.execCommand("formatBlock", false, "h1");
            return;
          }
          
          if (text.endsWith("-") || text.endsWith("*")) {
            e.preventDefault();
            const newText = textNode.textContent.replace(/[-*]$/, "");
            textNode.textContent = newText;
            document.execCommand("insertUnorderedList");
            return;
          }
          
          if (/^\d+\.$/.test(text)) {
            e.preventDefault();
            const newText = textNode.textContent.replace(/^\d+\.$/, "");
            textNode.textContent = newText;
            document.execCommand("insertOrderedList");
            return;
          }
        }
      }
    }
  }, [handleFormat, updateContent]);

  // Plus button click handler
  const handlePlusClick = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPlusMenuPosition({ 
      top: rect.bottom + window.scrollY + 8, 
      left: rect.left + window.scrollX 
    });
    setShowPlusMenu(prev => !prev);
    setShowHeadingMenu(false);
    setShowFormatToolbar(false);
  }, []);

  // File upload with better error handling and progress
  const handleFileUpload = useCallback((event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert("Please select an image file.");
      event.target.value = "";
      return;
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10MB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result;
      if (imageUrl && contentRef.current) {
        const imageId = `img-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
        const insertHTML = `
          <figure class="image-figure" data-image-id="${imageId}">
            <img src="${imageUrl}" alt="${file.name}" class="w-full rounded-lg shadow-lg" />
            <figcaption class="image-caption" contenteditable="true" placeholder="Write a caption..."></figcaption>
            <button class="image-delete-btn" data-action="remove-image" data-target="${imageId}" aria-label="Delete image">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </figure>
          <p><br></p>
        `;
        
        document.execCommand("insertHTML", false, insertHTML);
        updateContent();
      }
    };
    
    reader.onerror = () => {
      alert("Error reading file. Please try again.");
    };
    
    reader.readAsDataURL(file);
    event.target.value = "";
  }, [updateContent]);

  // Enhanced insert handler
  const handleInsert = useCallback((type) => {
    const cursor = contentRef.current;
    if (!cursor) return;

    if (type === "image") {
      fileInputRef.current?.click();
      setShowPlusMenu(false);
      return;
    }

    const blockId = `block-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    let insertHTML = "";

    switch (type) {
      case "h1":
        insertHTML = `<h1>Heading 1</h1><p><br></p>`;
        break;
      case "h2":
        insertHTML = `<h2>Heading 2</h2><p><br></p>`;
        break;
      case "h3":
        insertHTML = `<h3>Heading 3</h3><p><br></p>`;
        break;
      case "h4":
        insertHTML = `<p>Normal paragraph</p><p><br></p>`;
        break;
      case "codeblock":
        insertHTML = `
          <div class="code-block-container" data-block-id="${blockId}">
            <pre><code contenteditable="true">// Your code here</code></pre>
            <button class="block-delete-btn" data-action="remove-block" data-target="${blockId}">×</button>
          </div>
          <p><br></p>
        `;
        break;
      case "blockquote":
        insertHTML = `
          <div class="quote-container" data-block-id="${blockId}">
            <blockquote contenteditable="true">Your quote here</blockquote>
            <button class="block-delete-btn" data-action="remove-block" data-target="${blockId}">×</button>
          </div>
          <p><br></p>
        `;
        break;
      case "ul":
        insertHTML = `<ul><li>List item 1</li><li>List item 2</li></ul><p><br></p>`;
        break;
      case "ol":
        insertHTML = `<ol><li>List item 1</li><li>List item 2</li></ol><p><br></p>`;
        break;
      case "divider":
        insertHTML = `
          <div class="divider-container" data-block-id="${blockId}">
            <hr />
            <button class="block-delete-btn" data-action="remove-block" data-target="${blockId}">×</button>
          </div>
          <p><br></p>
        `;
        break;
      default:
        break;
    }

    if (insertHTML) {
      document.execCommand("insertHTML", false, insertHTML);
      updateContent();
    }

    setShowPlusMenu(false);
    setShowHeadingMenu(false);
    cursor.focus();
  }, [updateContent]);

  // Tag management
  const handleAddTag = useCallback(() => {
    if (currentTag.trim() && !editorState.tags.includes(currentTag.trim()) && editorState.tags.length < 5) {
      setEditorState(prev => ({ 
        ...prev, 
        tags: [...prev.tags, currentTag.trim()] 
      }));
      setCurrentTag("");
    }
  }, [currentTag, editorState.tags]);

  const handleRemoveTag = useCallback((tagToRemove) => {
    setEditorState(prev => ({ 
      ...prev, 
      tags: prev.tags.filter(t => t !== tagToRemove) 
    }));
  }, []);

  // Event delegation for delete buttons
  useEffect(() => {
    const contentEl = contentRef.current;
    if (!contentEl) return;

    const handler = (e) => {
      const btn = e.target.closest("[data-action]");
      if (!btn) return;
      
      const action = btn.getAttribute("data-action");
      const targetId = btn.getAttribute("data-target");

      if (action === "remove-image" && targetId) {
        const node = contentEl.querySelector(`[data-image-id="${targetId}"]`);
        if (node && confirm("Delete this image?")) {
          node.remove();
          updateContent();
        }
      } else if (action === "remove-block" && targetId) {
        const node = contentEl.querySelector(`[data-block-id="${targetId}"]`);
        if (node && confirm("Delete this block?")) {
          node.remove();
          updateContent();
        }
      }
    };

    contentEl.addEventListener("click", handler);
    return () => contentEl.removeEventListener("click", handler);
  }, [updateContent]);

  // Auto-resize textareas
  const handleTextareaResize = useCallback((textarea) => {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }, []);

  // Save draft
  const handleSaveDraft = useCallback(() => {
    setIsAutoSaving(true);
    setTimeout(() => {
      setIsAutoSaving(false);
      setEditorState(prev => ({ ...prev, lastSaved: new Date() }));
      // Show toast notification here
    }, 1000);
  }, []);

  // Publish story
const handlePublish = useCallback(async () => {
  if (!editorState.title.trim()) {
    alert("Please add a title to your story.");
    titleRef.current?.focus();
    return;
  }

  if (!editorState.content.trim()) {
    alert("Please add some content to your story.");
    contentRef.current?.focus();
    return;
  }

  setLoading(true);
  try {
    const token = localStorage.getItem("token"); // JWT from login

    const response = await axios.post(
      "http://localhost:5000/api/blogs", // backend route
      {
        title: editorState.title,
        description: editorState.subtitle, // subtitle as description
        content: editorState.content,
        image: editorState.image || "" // optional image
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    alert("Story submitted successfully! 🎉 Waiting for admin approval.");

    // Reset editor state
    setEditorState({
      title: "",
      subtitle: "",
      content: "",
      tags: [],
      isDraft: true,
      wordCount: 0,
      readTime: 0,
      lastSaved: null
    });

    if (contentRef.current) contentRef.current.innerHTML = "";
  } catch (error) {
    console.error("Error publishing blog:", error);
    alert(error.response?.data?.message || "Failed to publish story. Please try again.");
  } finally {
    setLoading(false);
  }
}, [editorState.title, editorState.content]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.format-toolbar') && 
          !e.target.closest('.plus-menu') && 
          !e.target.closest('.heading-menu')) {
        setShowFormatToolbar(false);
        setShowPlusMenu(false);
        setShowHeadingMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Header */}
      <div className="border-b border-gray-200 sticky top-0 z-40 bg-white/80 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-800 transition-colors duration-150">
                ← Draft in {user.name}
              </button>
              
              {editorState.lastSaved && (
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  {isAutoSaving ? (
                    <>
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      <span>Saved {new Date(editorState.lastSaved).toLocaleTimeString()}</span>
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Eye size={14} />
                  <span>{editorState.wordCount}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock size={14} />
                  <span>{editorState.readTime} min</span>
                </div>
              </div>

              <button
                onClick={() => setShowSettings(!showSettings)}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-full hover:border-gray-400 transition-all duration-150"
              >
                <Settings size={16} />
              </button>

              <button
                onClick={handleSaveDraft}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-150"
              >
                <Save size={16} />
                <span className="text-sm">Save</span>
              </button>

              <button
                onClick={handlePublish}
                disabled={loading}
                className="flex items-center space-x-2 bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 disabled:opacity-50 transition-all duration-150 shadow-md hover:shadow-lg"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send size={16} />
                )}
                <span className="text-sm font-medium">
                  {loading ? "Publishing..." : "Publish"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Settings Panel */}
      {showSettings && (
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Story Settings</h3>
              <button 
                onClick={() => setShowSettings(false)} 
                className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-200 transition-colors duration-150"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Tags (up to 5)
                </label>
                <div className="flex flex-wrap gap-2 mb-4">
                  {editorState.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center space-x-2 hover:bg-blue-200 transition-colors duration-150"
                    >
                      <span>{tag}</span>
                      <button 
                        onClick={() => handleRemoveTag(tag)} 
                        className="text-blue-600 hover:text-blue-800 ml-2"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
                    placeholder="Add a tag..."
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-150"
                    disabled={editorState.tags.length >= 5}
                  />
                  <button 
                    onClick={handleAddTag} 
                    disabled={editorState.tags.length >= 5}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Subtitle (optional)
                </label>
                <textarea
                  ref={subtitleRef}
                  value={editorState.subtitle}
                  onChange={(e) => {
                    setEditorState(prev => ({ ...prev, subtitle: e.target.value }));
                    handleTextareaResize(e.target);
                  }}
                  placeholder="Add a subtitle to help readers understand what your story is about..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-150 resize-none overflow-hidden"
                  rows={3}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Editor */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <input 
          type="file" 
          ref={fileInputRef} 
          accept="image/*" 
          onChange={handleFileUpload} 
          className="hidden" 
        />

        {/* Title */}
        <textarea
          ref={titleRef}
          value={editorState.title}
          onChange={(e) => {
            setEditorState(prev => ({ ...prev, title: e.target.value }));
            handleTextareaResize(e.target);
          }}
          placeholder="Title"
          className="w-full text-5xl font-bold text-gray-900 placeholder-gray-400 border-none outline-none resize-none overflow-hidden leading-tight bg-transparent"
          style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
          rows={1}
        />
{/* Description */}
         <textarea
          ref={titleRef}
          value={editorState.description}
          onChange={(e) => {
            setEditorState(prev => ({ ...prev, description: e.target.value }));
            handleTextareaResize(e.target);
          }}
          placeholder="Description"
          className="w-full m-5 text-2xl font-bold text-gray-900 placeholder-gray-400 border-none outline-none resize-none overflow-hidden leading-relaxed bg-transparent"
          style={{ fontFamily: 'Georgia, charter, serif' }}
          rows={1}
        />

        {/* Content Editor */}
        <div className="relative mt-5">
          <button
            ref={plusBtnRef}
            onClick={handlePlusClick}
            className="absolute left-0 top-0 w-8 h-8 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow-md z-10 opacity-0 hover:opacity-100 focus:opacity-100"
            style={{ marginLeft: "-2.5rem" }}
            title="Add content"
          >
            <Plus size={16} />
          </button>

          <div
            ref={contentRef}
            contentEditable
            onInput={updateContent}
            onMouseUp={handleTextSelection}
            onKeyUp={handleTextSelection}
            onKeyDown={handleKeyDown}
            className="min-h-96 text-xl text-gray-800 leading-relaxed outline-none focus:outline-none"
            style={{
              lineHeight: "1.75",
              fontSize: "21px",
              fontFamily: "Georgia, charter, serif",
            }}
            data-placeholder="Tell your story..."
            suppressContentEditableWarning={true}
          />
        </div>

        {/* Format Toolbar */}
        <div className="format-toolbar">
          <FormatToolbar
            show={showFormatToolbar}
            position={toolbarPosition}
            onFormat={handleFormat}
            onClearSelection={() => {
              const selection = window.getSelection();
              if (selection) selection.removeAllRanges();
              setShowFormatToolbar(false);
            }}
          />
        </div>

        {/* Plus Menu */}
        <div className="plus-menu">
          <PlusMenu 
            show={showPlusMenu} 
            position={plusMenuPosition} 
            onInsert={handleInsert} 
          />
        </div>

        {/* Heading Menu */}
        <div className="heading-menu">
          <HeadingMenu 
            show={showHeadingMenu} 
            position={plusMenuPosition} 
            onInsert={handleInsert} 
          />
        </div>
      </div>

      {/* Enhanced Custom Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
          to {
            opacity: 0;
            transform: translateX(-50%) translateY(10px);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
          font-style: italic;
        }

        [contenteditable]:focus {
          outline: none;
        }

        [contenteditable] h1,
        [contenteditable] h2,
        [contenteditable] h3 {
          margin: 2rem 0 1rem 0;
          font-weight: 700;
          color: #111827;
          line-height: 1.2;
        }

        [contenteditable] h1 {
          font-size: 2.5rem;
        }
        [contenteditable] h2 {
          font-size: 2rem;
        }
        [contenteditable] h3 {
          font-size: 1.5rem;
        }

        [contenteditable] p {
          margin: 1.5rem 0;
          line-height: 1.75;
        }

        [contenteditable] blockquote {
          border-left: 4px solid #3b82f6;
          padding-left: 1.5rem;
          margin: 2rem 0;
          font-style: italic;
          color: #4b5563;
          background-color: #f8fafc;
          padding: 1.5rem;
          border-radius: 0 0.5rem 0.5rem 0;
        }

        [contenteditable] code {
          background-color: #f1f5f9;
          padding: 0.25rem 0.5rem;
          border-radius: 0.375rem;
          font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
          font-size: 0.875em;
          color: #dc2626;
          border: 1px solid #e2e8f0;
        }

        [contenteditable] pre {
          background-color: #1e293b;
          color: #f1f5f9;
          padding: 1.5rem;
          border-radius: 0.75rem;
          overflow-x: auto;
          margin: 2rem 0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        [contenteditable] pre code {
          background: none;
          padding: 0;
          color: inherit;
          border: none;
          font-size: 0.9em;
        }

        [contenteditable] ul,
        [contenteditable] ol {
          margin: 1.5rem 0;
          padding-left: 2rem;
        }

        [contenteditable] ul li,
        [contenteditable] ol li {
          margin: 0.75rem 0;
          line-height: 1.7;
        }

        [contenteditable] hr {
          margin: 3rem 0;
          border: none;
          border-top: 1px solid #e5e7eb;
        }

        .image-figure {
          position: relative;
          margin: 2rem 0;
          text-align: center;
        }

        .image-figure img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s ease;
        }

        .image-figure:hover img {
          transform: scale(1.01);
        }

        .image-caption {
          display: block;
          margin-top: 0.75rem;
          font-size: 0.875rem;
          color: #6b7280;
          font-style: italic;
          text-align: center;
          outline: none;
          border: 1px solid transparent;
          padding: 0.5rem;
          border-radius: 0.375rem;
          transition: border-color 0.15s ease;
        }

        .image-caption:focus {
          border-color: #3b82f6;
          background-color: #f8fafc;
        }

        .image-caption:empty:before {
          content: attr(placeholder);
          color: #9ca3af;
        }

        .image-delete-btn {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          background: rgba(239, 68, 68, 0.9);
          backdrop-filter: blur(4px);
          border: none;
          border-radius: 50%;
          width: 2rem;
          height: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          opacity: 0;
          color: white;
        }

        .image-figure:hover .image-delete-btn {
          opacity: 1;
        }

        .image-delete-btn:hover {
          background: rgba(220, 38, 38, 0.95);
          transform: scale(1.1);
        }

        .code-block-container,
        .quote-container,
        .divider-container {
          position: relative;
          margin: 2rem 0;
        }

        .block-delete-btn {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          background: rgba(239, 68, 68, 0.9);
          backdrop-filter: blur(4px);
          border: none;
          border-radius: 50%;
          width: 1.5rem;
          height: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          opacity: 0;
          color: white;
          font-size: 0.875rem;
          line-height: 1;
        }

        .code-block-container:hover .block-delete-btn,
        .quote-container:hover .block-delete-btn,
        .divider-container:hover .block-delete-btn {
          opacity: 1;
        }

        .block-delete-btn:hover {
          background: rgba(220, 38, 38, 0.95);
          transform: scale(1.1);
        }

        .code-block-container:hover,
        .quote-container:hover,
        .divider-container:hover {
          background: rgba(59, 130, 246, 0.02);
          border-radius: 0.5rem;
          padding: 0.5rem;
          margin: 1.5rem -0.5rem;
        }

        /* Link styling */
        [contenteditable] a {
          color: #3b82f6;
          text-decoration: underline;
          text-decoration-color: rgba(59, 130, 246, 0.3);
          text-underline-offset: 2px;
          transition: all 0.15s ease;
        }

        [contenteditable] a:hover {
          color: #1d4ed8;
          text-decoration-color: rgba(29, 78, 216, 0.6);
        }

        /* Improved focus states */
        .relative:hover .absolute {
          opacity: 1;
        }

        /* Better selection and cursor management */
        [contenteditable] p:empty:first-child:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
          font-style: italic;
        }
        
        /* Better handling for headings and paragraphs */
        [contenteditable] h1:empty:before,
        [contenteditable] h2:empty:before,
        [contenteditable] h3:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
          font-style: normal;
        }
        
        /* Improved delete button visibility */
        .image-figure,
        .code-block-container,
        .quote-container,
        .divider-container {
          position: relative;
        }
        
        .image-figure:focus-within,
        .code-block-container:focus-within,
        .quote-container:focus-within,
        .divider-container:focus-within {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
          border-radius: 0.5rem;
        }
        
        .image-delete-btn,
        .block-delete-btn {
          z-index: 10;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }
        
        /* Better text selection feedback */
        [contenteditable]::selection {
          background: rgba(59, 130, 246, 0.2);
        }
        
        /* Remove formatting button styles */
        .format-normal-btn {
          background: rgba(99, 102, 241, 0.1);
          color: #6366f1;
        }
        
        .format-normal-btn:hover {
          background: rgba(99, 102, 241, 0.2);
        }
      `}</style>
    </div>
  );
}

