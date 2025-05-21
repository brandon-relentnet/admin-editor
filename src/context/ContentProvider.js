// src/context/ContentProvider.js
"use client";

import { createContext, useContext, useState, useEffect } from "react";

// Create the context
const ContentContext = createContext();

export function ContentProvider({ children, initialContent }) {
  const [content, setContent] = useState(initialContent);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Check if user is authenticated on component mount
  useEffect(() => {
    const token = localStorage.getItem("admin-token");
    if (token) {
      setIsAdmin(true);
    }
  }, []);

  // Update a specific path in the content object
  const updateContent = (path, value) => {
    if (!isEditing) return;

    setContent((prevContent) => {
      // Clone the current content
      const newContent = JSON.parse(JSON.stringify(prevContent));

      // Handle simple path like "hero.title"
      if (typeof path === "string") {
        const keys = path.split(".");
        let current = newContent;

        // Traverse to the second-to-last key
        for (let i = 0; i < keys.length - 1; i++) {
          current = current[keys[i]];
        }

        // Set the value on the last key
        current[keys[keys.length - 1]] = value;
      }
      // Handle array items like features[1].title
      else if (Array.isArray(path)) {
        const [section, index, field] = path;
        if (Array.isArray(newContent[section])) {
          newContent[section][index][field] = value;
        }
      }

      return newContent;
    });
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  // Log out admin
  const logout = () => {
    localStorage.removeItem("admin-token");
    setIsAdmin(false);
    setIsEditing(false);
  };

  // Save content changes
  const saveChanges = async () => {
    try {
      const response = await fetch("/api/update-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          token: localStorage.getItem("admin-token"),
        }),
      });

      if (response.ok) {
        alert("Content updated successfully!");
      } else {
        alert("Failed to update content");
      }
    } catch (error) {
      console.error("Error saving content:", error);
      alert("Error saving content");
    }
  };

  // The value to be provided to consuming components
  const contextValue = {
    content,
    isAdmin,
    isEditing,
    updateContent,
    toggleEditMode,
    saveChanges,
    logout,
  };

  return (
    <ContentContext.Provider value={contextValue}>
      {children}
    </ContentContext.Provider>
  );
}

// Custom hook to use the content context
export function useContent() {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return context;
}
