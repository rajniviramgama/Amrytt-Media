
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./customDateRangePicker.css";
import PriceRangeSlider from "../Filter";

const CalendarAndFiltersModal = () => {
  const [isOpenFilterModal, setIsOpenFilterModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [direction, setDirection] = useState("horizontal");
  const pickerRef = useRef(null);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const handleDateChange = (ranges) => {
    setDateRange([ranges.selection]);
  };

  const handleToggleFilter = () => {
    if (isOpenFilterModal) {
       setIsOpenFilterModal(false);
    } else {
      setIsOpenFilterModal(true);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };

    const addClickListener = () => window.addEventListener("mousedown", handleClickOutside);
    const removeClickListener = () => window.removeEventListener("mousedown", handleClickOutside);

    addClickListener();

    return () => removeClickListener();
  }, [pickerRef, setShowModal]);
  
  useEffect(() => {
    const updateDirection = () => {
      if (window.innerWidth <= 425) {
        setDirection("vertical");
      } else {
        setDirection("horizontal");
      }
    };

    updateDirection();

    window.addEventListener("resize", updateDirection);

    return () => {
      window.removeEventListener("resize", updateDirection);
    };
  }, []);

  return (
    <div className="relative flex space-x-4">
      <button
        className="flex items-center justify-center px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
        onClick={toggleModal}
      >
        <Image
          src={"svg/calendar-icon.svg"}
          alt="calendar"
          width={16}
          height={16}
        />
        <span className="ml-2">Select Date</span>
      </button>

      {showModal && (
        <div
          ref={pickerRef}
          className="absolute top-20 lg:right-96 z-20 flex items-center justify-center w-full h-[464px] bg-black bg-opacity-50"
        >
          <div className="p-6 bg-white rounded-lg shadow-md">
            <DateRangePicker
              ranges={dateRange}
              onChange={handleDateChange}
              rangeColors={["#2086BF"]}
              months={2}
              direction={direction}
              editableDateInputs={true}
              showSelectionPreview={true}
              showDateDisplay={true}
              className="custom-date-range-picker"
            />
            <button
              className="flex flex-col justify-end px-4 py-2 mt-4 bg-gray-100 rounded-md hover:bg-gray-200"
              onClick={toggleModal}
            >
              Close Modal
            </button>
          </div>
        </div>
      )}

      <button
        className="flex items-center justify-center px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
        onClick={handleToggleFilter}
      >
        <Image src={"svg/filter.svg"} alt="filter" width={16} height={16} />
        <span className="ml-2">Filters</span>
      </button>

      {isOpenFilterModal && (
        <div className="absolute right-0 z-10 p-5 bg-white rounded-md shadow-md top-12">
          <PriceRangeSlider onClose={() => setIsOpenFilterModal(false)} />
        </div>
      )}
    </div>
  );
};

export default CalendarAndFiltersModal;
