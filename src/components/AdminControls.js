// src/components/AdminControls.js
"use client";

import { useContent } from "../context/ContentProvider";

export default function AdminControls() {
  const { isAdmin, isEditing, toggleEditMode, saveChanges, logout } =
    useContent();

  // If not an admin, don't render anything
  if (!isAdmin) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex gap-2">
      <button
        onClick={toggleEditMode}
        className={`px-4 py-2 rounded text-white ${
          isEditing ? "bg-gray-600" : "bg-blue-600"
        }`}
      >
        {isEditing ? "Exit Editor" : "Edit Content"}
      </button>

      {isEditing && (
        <button
          onClick={saveChanges}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Save Changes
        </button>
      )}

      <button
        onClick={logout}
        className="px-4 py-2 bg-red-600 text-white rounded"
      >
        Logout
      </button>
    </div>
  );
}
