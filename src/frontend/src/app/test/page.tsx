"use client";

import React, { useState } from "react";

const BookComponent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isFlipping, setIsFlipping] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    characterClass: "",
    backgroundStory: "",
  });

  // Define total page count (including cover)
  const totalPages = 4; // Adjust this if you add more pages

  // Flip Page
  const nextPage = () => {
    if (currentPage < totalPages - 1 && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage((prev) => prev + 2); // Flip two pages at a time
        setIsFlipping(false);
      }, 700); // Matches animation duration
    }
  };

  const prevPage = () => {
    if (currentPage > 0 && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage((prev) => prev - 2); // Flip two pages at a time
        setIsFlipping(false);
      }, 700); // Matches animation duration
    }
  };

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-[720px] h-[511px] shadow-2xl perspective-1200">
        <div
          className={`absolute inset-0 flex transition-transform duration-700 ease-in-out transform ${
            isFlipping ? "rotate-y-180" : ""
          }`}
          style={{
            transformStyle: "preserve-3d", // Required for 3D effects
          }}
        >
          {/* Cover Page */}
          <div
            className={`absolute w-1/2 h-full transition-transform duration-700 ease-in-out transform origin-left ${
              currentPage >= 2 ? "rotate-y-180" : "rotate-y-0"
            }`}
            style={{
              transform:
                currentPage >= 2 ? "rotateY(-180deg)" : "rotateY(0deg)",
              zIndex: currentPage < 2 ? 10 : 1,
            }}
          >
            <img
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/193203/1111.jpg"
              alt="Book Cover"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Left Page (flipping) */}
          <div
            className={`absolute w-1/2 h-full left-0 bg-white p-8 transition-transform duration-700 ease-in-out transform origin-left ${
              isFlipping ? "rotate-y-180" : "rotate-y-0"
            }`}
            style={{
              transform: isFlipping ? "rotateY(-180deg)" : "rotateY(0deg)",
              zIndex: isFlipping ? 15 : 5,
            }}
          >
            {currentPage === 0 && (
              <div>
                <h2 className="text-2xl font-bold text-center mb-4">
                  Enter Your Character Name
                </h2>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Character Name"
                  className="w-full p-2 border rounded"
                />
              </div>
            )}

            {currentPage === 2 && (
              <div>
                <h2 className="text-2xl font-bold text-center mb-4">
                  Choose Your Class
                </h2>
                <input
                  type="text"
                  name="characterClass"
                  value={formData.characterClass}
                  onChange={handleChange}
                  placeholder="Warrior, Mage, Rogue..."
                  className="w-full p-2 border rounded"
                />
              </div>
            )}
          </div>

          {/* Right Page (always visible) */}
          <div className="absolute w-1/2 h-full right-0 bg-white p-8">
            {currentPage === 0 && (
              <div>
                <h2 className="text-2xl font-bold text-center mb-4">
                  Enter Your Email
                </h2>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full p-2 border rounded"
                />
              </div>
            )}

            {currentPage === 2 && (
              <div>
                <h2 className="text-2xl font-bold text-center mb-4">
                  Background Story
                </h2>
                <textarea
                  name="backgroundStory"
                  value={formData.backgroundStory}
                  onChange={handleChange}
                  placeholder="Write a short backstory..."
                  className="w-full p-2 border rounded h-32"
                />
              </div>
            )}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
          {currentPage > 0 && (
            <button
              onClick={prevPage}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Back
            </button>
          )}
          {currentPage < totalPages - 1 && (
            <button
              onClick={nextPage}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookComponent;
