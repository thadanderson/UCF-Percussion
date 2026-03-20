"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { useState } from "react";

function ToolbarButton({
  onClick,
  active,
  title,
  children,
}: {
  onClick: () => void;
  active: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`px-2 py-1 rounded text-sm font-medium transition-colors ${
        active
          ? "bg-ucf-gold text-ucf-black"
          : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
      }`}
    >
      {children}
    </button>
  );
}

export default function RichTextEditor({
  name,
  defaultValue,
}: {
  name: string;
  defaultValue?: string | null;
}) {
  const [html, setHtml] = useState(defaultValue ?? "");
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: "text-blue-600 underline" },
      }),
    ],
    content: defaultValue ?? "",
    onUpdate: ({ editor }) => {
      setHtml(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[150px] p-3 focus:outline-none text-gray-900 leading-relaxed",
      },
    },
  });

  const applyLink = () => {
    if (!linkUrl) {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      const href = linkUrl.startsWith("http") ? linkUrl : `https://${linkUrl}`;
      editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
    }
    setShowLinkInput(false);
    setLinkUrl("");
  };

  if (!editor) return null;

  return (
    <div className="border border-gray-300 rounded overflow-hidden">
      <input type="hidden" name={name} value={html} />

      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 border-b border-gray-200 bg-gray-50">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          title="Bold"
        >
          <strong>B</strong>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          title="Italic"
        >
          <em>I</em>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          title="Bullet list"
        >
          List
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
          title="Numbered list"
        >
          1. 2.
        </ToolbarButton>
        <ToolbarButton
          onClick={() => {
            setLinkUrl(editor.isActive("link") ? (editor.getAttributes("link").href ?? "") : "");
            setShowLinkInput((v) => !v);
          }}
          active={editor.isActive("link")}
          title="Add link"
        >
          Link
        </ToolbarButton>
        {editor.isActive("link") && (
          <ToolbarButton
            onClick={() => { editor.chain().focus().unsetLink().run(); setShowLinkInput(false); }}
            active={false}
            title="Remove link"
          >
            Unlink
          </ToolbarButton>
        )}
      </div>
      {showLinkInput && (
        <div className="flex items-center gap-2 px-2 py-2 border-b border-gray-200 bg-gray-50">
          <input
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); applyLink(); } if (e.key === "Escape") setShowLinkInput(false); }}
            placeholder="https://example.com"
            className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm text-gray-900"
            autoFocus
          />
          <button type="button" onClick={applyLink} className="px-3 py-1 bg-ucf-gold text-ucf-black rounded text-sm font-medium">Apply</button>
          <button type="button" onClick={() => setShowLinkInput(false)} className="px-2 py-1 text-gray-500 hover:text-gray-700 text-sm">Cancel</button>
        </div>
      )}
      {/* Editor area */}
      <div className="bg-white">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
