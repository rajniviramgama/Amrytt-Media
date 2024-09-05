import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

import "react-quill/dist/quill.snow.css";

export const TextEditor = ({ name, value, onChange }) => {
  const [editorValue, setEditorValue] = useState(value || "");

  useEffect(() => {
    setEditorValue(value || "");
  }, [value]);

  const handleChange = (content, delta, source, editor) => {
    const length = editor.getLength();
    if (length === 1) {
      onChange(name, "");
      return;
    }
    setEditorValue(content);
    onChange(name, content);
  };

  return (
    <ReactQuill
      value={editorValue}
      style={{ width: "100%", height: 150, boxShadow: "unset", border: "none" }}
      onChange={handleChange}
      modules={{
        toolbar: [
          [{ header: [1, 2, 3, 4, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"],
          ["clean"],
          [{ size: ["small", false, "large", "huge"] }],
          [{ font: [] }],
          ["align", "direction"],
          ["script", "sub", "super"],
          ["indent", "outdent"],
          ["code-block"],
          ["formula"],
          ["blockquote", "code-block"],
          [{ color: [] }, { background: [] }],
          ["image", "video"],
          ["emoji"],
          ["fullscreen"],
        ],
      }}
    />
  );
};
