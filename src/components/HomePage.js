// src/components/HomePage.js
"use client";

import Link from "next/link";
import { useContent } from "../context/ContentProvider";
import EditableContent from "./EditableContent";
import AdminControls from "./AdminControls";
import { useState } from "react";

export default function HomePage() {
  const { content, isEditing, updateContent } = useContent();
  const [count, setCount] = useState(0);

  // Function to increment the counter
  const incrementCounter = () => {
    setCount((prevCount) => prevCount + 1);
  };
  // Function to decrement the counter
  const decrementCounter = () => {
    setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
  };
  // Function to reset the counter
  const resetCounter = () => {
    setCount(0);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Hero Section */}
      <header className="my-12 text-center">
        <EditableContent
          isEditing={isEditing}
          value={content.hero.title}
          onChange={(value) => updateContent("hero.title", value)}
          className={
            isEditing ? "text-3xl font-bold mb-2" : "text-4xl font-bold"
          }
        />

        <EditableContent
          isEditing={isEditing}
          value={content.hero.subtitle}
          onChange={(value) => updateContent("hero.subtitle", value)}
          className={isEditing ? "text-xl mb-2" : "text-xl text-gray-600 mt-2"}
        />
      </header>

      {/* Button Section */}
      <section className="my-12">
        <h2 className="text-2xl font-bold mb-6">Buttons</h2>
        <div className="flex items-center justify-center">{count}</div>
        <button className="btn" onClick={incrementCounter}></button>
        <button
          className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl btn-success btn-outline"
          onClick={decrementCounter}
        >
          <EditableContent
            isEditing={isEditing}
            value={content.counter.button2}
            onChange={(value) => updateContent("counter.button2", value)}
          />
        </button>
      </section>

      {/* About Section */}
      <section className="my-12">
        <EditableContent
          isEditing={isEditing}
          value={content.about.title}
          onChange={(value) => updateContent("about.title", value)}
          className={
            isEditing ? "text-2xl font-bold mb-2" : "text-2xl font-bold mb-4"
          }
        />

        <EditableContent
          isEditing={isEditing}
          value={content.about.content}
          onChange={(value) => updateContent("about.content", value)}
          type="textarea"
          className="text-gray-700"
        />
      </section>

      {/* Features Section */}
      <section className="my-12">
        <h2 className="text-2xl font-bold mb-6">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {content.features.map((feature, index) => (
            <div key={feature.id} className="border p-4 rounded shadow">
              <EditableContent
                isEditing={isEditing}
                value={feature.title}
                onChange={(value) =>
                  updateContent(["features", index, "title"], value)
                }
                className={
                  isEditing
                    ? "text-xl font-bold mb-2"
                    : "text-xl font-bold mb-2"
                }
              />

              <EditableContent
                isEditing={isEditing}
                value={feature.description}
                onChange={(value) =>
                  updateContent(["features", index, "description"], value)
                }
                type="textarea"
                className="text-gray-700"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Admin Controls */}
      <AdminControls />
    </div>
  );
}
