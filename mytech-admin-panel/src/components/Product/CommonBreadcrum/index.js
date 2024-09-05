import Image from "next/image";
import React from "react";

const CommonBreadcrum = ({
  title,
  breadcrumb,
  iconBreadCrum,
  firstButtonText,
  firstButtonIcon,
  secondButtonText,
  secondButtonIcon,
  iconFirstButton,
  handleExportData,
  handleSecondButton
}) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-col gap-2 left-side">
        <h1 className="text-3xl font-bold">{title}</h1>
        <nav className="flex items-center breadcrumb">
          {breadcrumb.map((item, index) => (
            <span key={index} className="flex items-center">
              {index < breadcrumb.length - 1 ? (
                <>
                  <a
                    href={item.href}
                    className="text-cyan-600 text-nowrap hover:text-cyan-500"
                  >
                    {item.label}
                  </a>
                  <Image
                    src={iconBreadCrum}
                    alt="arrow"
                    width={5}
                    height={8}
                    className="mx-2 pt-[3px]"
                  />
                </>
              ) : (
                <span className="text-gray-500 text-nowrap">{item.label}</span>
              )}
            </span>
          ))}
        </nav>
      </div>
      <div className="flex justify-end h-10 mt-4 ">
        <button
          onClick={handleExportData}
          className="flex items-center gap-2 px-4 mr-2 rounded-md semi-bold bold text-m text-cyan-600 bg-cyan-50"
        >
          <Image
            src={firstButtonIcon}
            alt="download icon"
            width={16}
            height={16}
          />
          {firstButtonText}
        </button>
        <button className="flex items-center gap-2 px-4 py-2 text-white rounded-md bg-cyan-600" onClick={handleSecondButton}>
          <Image
            src={secondButtonIcon}
            alt="download icon"
            width={16}
            height={16}
          />
          {secondButtonText}
        </button>
      </div>
    </div>
  );
};

export default CommonBreadcrum;
