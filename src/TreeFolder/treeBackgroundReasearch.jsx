import React, { useState } from "react";

const BackgroundResearchDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeContent, setActiveContent] = useState("content1");

  const renderContent = () => {
    switch (activeContent) {
      case "content1":
        return (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Tree Types</h2>
            <p className="mb-4">
              In Ireland, spruce, oak, and birch trees are prominent species
              with important roles in the ecosystem and forestry.
            </p>
          </div>
        );
      case "content2":
        return (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Soil Types</h2>
            <p className="mb-4">Render content for soil types here.</p>
          </div>
        );
      case "content3":
        return (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Water Availability</h2>
            <p className="mb-4">Render content for Water here.</p>
          </div>
        );
      case "content4":
        return (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Sunlight Exposure</h2>
            <p className="mb-4">Render content for Sunlight here.</p>
          </div>
        );
      case "content5":
        return (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Temperature</h2>
            <p className="mb-4">Render content for Tempature here.</p>
          </div>
        );
      case "content6":
        return (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Nutrient Levels</h2>
            <p className="mb-4">Render content for Nutrient Levels here.</p>
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
                Tree Types
              </button>
              <button
                onClick={() => setActiveContent("content2")}
                className="block w-full text-left p-2 hover:bg-gray-100 rounded"
              >
                Soil Types
              </button>
              <button
                onClick={() => setActiveContent("content3")}
                className="block w-full text-left p-2 hover:bg-gray-100 rounded"
              >
                Water Availability
              </button>
              <button
                onClick={() => setActiveContent("content4")}
                className="block w-full text-left p-2 hover:bg-gray-100 rounded"
              >
                Sunlight Exposure
              </button>
              <button
                onClick={() => setActiveContent("content5")}
                className="block w-full text-left p-2 hover:bg-gray-100 rounded"
              >
                Temperature
              </button>
              <button
                onClick={() => setActiveContent("content6")}
                className="block w-full text-left p-2 hover:bg-gray-100 rounded"
              >
                Nutrient Levels
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

export default BackgroundResearchDropdown;
