"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ClientHome({ initialContent }) {
  const [content, setContent] = useState(initialContent);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Check if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem("admin-token");
    if (token) {
      setIsAdmin(true);
    }
  }, []);

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

  // Handle field change
  const handleChange = (section, field, value) => {
    if (section === "features") {
      // Handle array of objects
      setContent((prev) => ({
        ...prev,
        features: prev.features.map((feature) =>
          feature.id === field ? { ...feature, ...value } : feature
        ),
      }));
    } else {
      // Handle nested objects
      setContent((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      }));
    }
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

  // Render admin controls
  const renderAdminControls = () => {
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
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link href="/admin" className="text-blue-500 text-lg mb-4">
        Admin
      </Link>
      {/* Hero Section */}
      <header className="my-12 text-center">
        {isEditing ? (
          <div className="bg-yellow-50 p-4 rounded border border-yellow-200 mb-4">
            <input
              type="text"
              value={content.hero.title}
              onChange={(e) => handleChange("hero", "title", e.target.value)}
              className="text-3xl font-bold mb-2 p-2 border rounded w-full"
            />
            <input
              type="text"
              value={content.hero.subtitle}
              onChange={(e) => handleChange("hero", "subtitle", e.target.value)}
              className="text-xl text-gray-600 p-2 border rounded w-full"
            />
          </div>
        ) : (
          <>
            <h1 className="text-4xl font-bold">{content.hero.title}</h1>
            <p className="text-xl text-gray-600 mt-2">
              {content.hero.subtitle}
            </p>
          </>
        )}
      </header>

      {/* About Section */}
      <section className="my-12">
        {isEditing ? (
          <div className="bg-yellow-50 p-4 rounded border border-yellow-200 mb-4">
            <input
              type="text"
              value={content.about.title}
              onChange={(e) => handleChange("about", "title", e.target.value)}
              className="text-2xl font-bold mb-2 p-2 border rounded w-full"
            />
            <textarea
              value={content.about.content}
              onChange={(e) => handleChange("about", "content", e.target.value)}
              className="p-2 border rounded w-full h-32"
            />
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">{content.about.title}</h2>
            <p className="text-gray-700">{content.about.content}</p>
          </>
        )}
      </section>

      {/* Features Section */}
      <section className="my-12">
        <h2 className="text-2xl font-bold mb-6">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {content.features.map((feature) => (
            <div key={feature.id} className="border p-4 rounded shadow">
              {isEditing ? (
                <div className="bg-yellow-50 p-4 rounded">
                  <input
                    type="text"
                    value={feature.title}
                    onChange={(e) =>
                      handleChange("features", feature.id, {
                        ...feature,
                        title: e.target.value,
                      })
                    }
                    className="text-xl font-bold mb-2 p-2 border rounded w-full"
                  />
                  <textarea
                    value={feature.description}
                    onChange={(e) =>
                      handleChange("features", feature.id, {
                        ...feature,
                        description: e.target.value,
                      })
                    }
                    className="p-2 border rounded w-full h-24"
                  />
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-700">{feature.description}</p>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      {renderAdminControls()}
    </div>
  );
}
