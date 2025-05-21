// src/components/EditableContent.js
"use client";

export default function EditableContent({
  isEditing,
  value,
  onChange,
  type = "input",
  className = "",
  renderDisplay = null,
}) {
  // If not in edit mode, render either the custom display or default display
  if (!isEditing) {
    if (renderDisplay) {
      return renderDisplay(value);
    }

    return <div className={className}>{value}</div>;
  }

  // While editing, render the appropriate input type
  const inputProps = {
    value,
    onChange: (e) => onChange(e.target.value),
    className: `p-2 border rounded w-full ${className}`,
  };

  // Return different input types based on the 'type' prop
  switch (type) {
    case "textarea":
      return <textarea {...inputProps} rows={4} />;
    case "input":
    default:
      return <input type="text" {...inputProps} />;
  }
}
