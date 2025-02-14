import React, { useState } from "react";

const PhysicsBackgroundResearchDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeContent, setActiveContent] = useState("content1");

  const renderContent = () => {
    switch (activeContent) {
      case "content1":
        return (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Air Resistance</h2>
            <p className="mb-4">Air Resistance content here.</p>
          </div>
        );
      case "content2":
        return (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Height Of Drop</h2>
            <p className="mb-4">Render content for Height Of Drop here.</p>
          </div>
        );
      case "content3":
        return (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Material Of Object</h2>
            <p className="mb-4">Render content for Material Of Object here.</p>
          </div>
        );
      case "content4":
        return (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Mass Of Object</h2>
            <p className="mb-4">Render content for Mass Of Object here.</p>
          </div>
        );
      case "content5":
        return (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Shape Of Object</h2>
            <p className="mb-4">Render content for Shape Of Object here.</p>
          </div>
        );
      case "content6":
        return (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Timing Method</h2>
            <p className="mb-4">Render content for Timing Method here.</p>
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <div className="w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-blue-500 text-white p-2 rounded flex items-center justify-between"
      >
        <span>View Background Research</span>
        <span>{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <div className="border rounded mt-2 shadow-lg bg-white">
          <div className="flex">
            {/* Sidebar */}
            <div className="w-1/4 border-r p-4">
              <button
                onClick={() => setActiveContent("content1")}
                className="block w-full text-left p-2 hover:bg-gray-100 rounded"
              >
                Air Resistance
              </button>
              <button
                onClick={() => setActiveContent("content2")}
                className="block w-full text-left p-2 hover:bg-gray-100 rounded"
              >
                Height Of Drop
              </button>
              <button
                onClick={() => setActiveContent("content3")}
                className="block w-full text-left p-2 hover:bg-gray-100 rounded"
              >
                Material of Object
              </button>
              <button
                onClick={() => setActiveContent("content4")}
                className="block w-full text-left p-2 hover:bg-gray-100 rounded"
              >
                Mass of Object
              </button>
              <button
                onClick={() => setActiveContent("content5")}
                className="block w-full text-left p-2 hover:bg-gray-100 rounded"
              >
                Shape of Object
              </button>
              <button
                onClick={() => setActiveContent("content6")}
                className="block w-full text-left p-2 hover:bg-gray-100 rounded"
              >
                Timing Method
              </button>
            </div>

            {/* Content */}
            <div className="w-3/4">{renderContent()}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhysicsBackgroundResearchDropdown;
