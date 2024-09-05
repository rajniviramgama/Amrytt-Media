import React, { useState } from "react";

const CommonTabs = ({ data, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
    onTabChange(index);
  };

  return (
    <div className="flex flex-col items-center overflow-y-auto bg-white border border-gray-100 rounded-md scro md:flex-row max-w-max">
      <div className="flex items-center p-1 pl-10 mx-6 lg:px-2 pace-x-4 lg:mx-0">
        {data?.length > 0 &&
          data.map((tab, index) => (
            <button
              key={tab.id}
              className={` hover:text-cyan-600 text-nowrap  text-m  medium px-4 py-2 rounded-md ${
                index === activeTab
                  ? "text-cyan-600 bg-cyan-50"
                  : "text-gray-500"
              }`}
              onClick={() => handleTabClick(index)}
            >
              {tab.label}
            </button>
          ))}
      </div>
    </div>
  );
};

export default CommonTabs;
