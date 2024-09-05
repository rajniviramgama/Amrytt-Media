import React, { useState, useRef, useEffect } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const PriceRangeSlider = ({ onClose }) => {
  const [range, setRange] = useState([200, 8000]);
  const [sortDirection, setSortDirection] = useState('low-to-high');
  const modalRef = useRef(null);

  const handleRangeChange = (newRange) => {
    setRange(newRange);
  };

  const handleClearAll = () => {
    setRange([200, 8000]);
    setSortDirection('low-to-high');
  };

  const handleSortDirectionChange = (event) => {
    setSortDirection(event.target.value);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };
  useEffect(() => {
    const handleMouseDown = (event) => handleClickOutside(event);
    window.addEventListener("mousedown", handleMouseDown);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  return (
    <div
      ref={modalRef}
      className="flex flex-col max-w-sm p-6 mx-auto space-y-4 bg-white rounded-md "
    >
      <div className="flex items-center justify-between">
        <label className="text-gray-600">Select Price Range</label>
        <button
          className="text-sm text-gray-500 hover:text-gray-700"
          onClick={handleClearAll}
        >
          Clear all
        </button>
      </div>
      <Slider
        range
        min={200}
        max={8000}
        value={range}
        onChange={handleRangeChange}
        trackStyle={[{ backgroundColor: 'blue', height: 4 }]}
        handleStyle={[
          { borderColor: 'white', backgroundColor: 'blue', height: 16, width: 16 },
          { borderColor: 'white',backgroundColor: 'blue',  height: 16, width: 16 },
        ]}
        railStyle={{ backgroundColor: 'gray', height: 4 }}
      />
      <div className="flex space-x-4">
        <input
          type="number"
          className="px-2 py-1 border rounded-md"
          value={range[0]}
          onChange={(e) => handleRangeChange([Number(e.target.value), range[1]])}
        />
        <input
          type="number"
          className="px-2 py-1 border rounded-md"
          value={range[1]}
          onChange={(e) => handleRangeChange([range[0], Number(e.target.value)])}
        />
      </div>
      <div className="flex flex-col space-y-4">
        <label className="flex gap-2 text-gray-600">
          <input
            type="checkbox"
            value="low-to-high"
            checked={sortDirection === 'low-to-high'}
            onChange={handleSortDirectionChange}
          />
          Low to high
        </label>
        <label className="flex gap-2 text-gray-600">
          <input
            type="checkbox"
            value="high-to-low"
            checked={sortDirection === 'high-to-low'}
            onChange={handleSortDirectionChange}
          />
          High to low
        </label>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
