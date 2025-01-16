import React, { useState, useEffect, useRef } from "react";
import {
  saveToLocalStorage,
  getFromLocalStorage,
} from "../utils/localStorageHelper";
import { countries } from "../data";

const InputSelector: React.FC = () => {
  const savedSelectedItems = getFromLocalStorage("selectedItems") || [];
  const [selectedItems, setSelectedItems] =
    useState<string[]>(savedSelectedItems);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    saveToLocalStorage("selectedItems", selectedItems);
  }, [selectedItems]);

  const filteredCountries = countries
    .filter((country) =>
      country.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((country) => !selectedItems.includes(country));

  const clearSelectedItems = () => {
    setSelectedItems([]);
    localStorage.removeItem("selectedItems");
  };

  const handleAddItem = (country: string) => {
    if (country && !selectedItems.includes(country)) {
      setSelectedItems((prevItems) => [...prevItems, country]);
      setSearchTerm(""); // Clear search after adding
      setDropdownVisible(false); // Close dropdown
    }
  };

  return (
    <div className="mt-10 w-screen p-5 flex items-center justify-center">
      <div>
        <h1 className="text-2xl font-bold mb-4 text-center">
          Country Selector
        </h1>

        <div className="mb-4 flex items-center flex-col">
          <input
            ref={inputRef}
            type="text"
            className="w-[300px] p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search for a country..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setDropdownVisible(true)} // Show dropdown on focus
          />
          <button
            onClick={() => setSearchTerm("")}
            className="absolute top-10 right-8 text-gray-500"
          >
            ✕
          </button>
          {selectedItems.length > 0 && (
            <div className="flex items-center w-[300px] gap-4 flex-wrap">
              {selectedItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center border rounded bg-gray-100 gap-4 p-2"
                >
                  <span>{item}</span>
                  <button
                    className="text-black"
                    onClick={() => {
                      const updatedItems = selectedItems.filter(
                        (i) => i !== item
                      );
                      setSelectedItems(updatedItems);
                    }}
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {dropdownVisible && searchTerm && (
          <div
            ref={dropdownRef}
            className="border p-2 rounded mb-4 max-h-48 overflow-y-auto"
          >
            {filteredCountries.map((country, index) => (
              <div
                key={index}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleAddItem(country)} // Add country when clicked
              >
                {country}
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-center">
          <button
            onClick={clearSelectedItems}
            className="w-full p-2 bg-gray-500 text-white rounded hover:bg-gray-700"
          >
            Delete all selected
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputSelector;
