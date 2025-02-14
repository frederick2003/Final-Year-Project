import React, { useState } from "react";

const ChickBackgroundResearchDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeContent, setActiveContent] = useState("content1");

  const renderContent = () => {
    switch (activeContent) {
      case "content1":
        return (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Type of music</h2>
            <p className="mb-4">Type of Music content here.</p>
          </div>
        );
      case "content2":
        return (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Volume of music</h2>
            <p className="mb-4">Render content for Music here.</p>
          </div>
        );
      case "content3":
        return (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">
              Duration of music Exposure
            </h2>
            <p className="mb-4">Render content for Exposure here.</p>
          </div>
        );
      case "content4":
        return (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Breed of Chicken</h2>
            <p className="mb-4">Render content for breed here.</p>
          </div>
        );
      case "content5":
        return (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Age</h2>
            <p className="mb-4">Render content for Age here.</p>
          </div>
        );
      case "content6":
        return (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Diet and Nutrition</h2>
            <p className="mb-4">Render content for Diet and Nutrient here.</p>
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
                Type Of Music
              </button>
              <button
                onClick={() => setActiveContent("content2")}
                className="block w-full text-left p-2 hover:bg-gray-100 rounded"
              >
                Volume Level
              </button>
              <button
                onClick={() => setActiveContent("content3")}
                className="block w-full text-left p-2 hover:bg-gray-100 rounded"
              >
                Duration Of Music Exposure
              </button>
              <button
                onClick={() => setActiveContent("content4")}
                className="block w-full text-left p-2 hover:bg-gray-100 rounded"
              >
                Breed Of Chicken
              </button>
              <button
                onClick={() => setActiveContent("content5")}
                className="block w-full text-left p-2 hover:bg-gray-100 rounded"
              >
                Age
              </button>
              <button
                onClick={() => setActiveContent("content6")}
                className="block w-full text-left p-2 hover:bg-gray-100 rounded"
              >
                Diet And Nutrition
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

export default ChickBackgroundResearchDropdown;
