"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import SidebarMenuItems from "./sidebarMenuItems";
import Header from "../Header";

const Sidebar = ({ children }) => {
  const sidebarRef = useRef(null);
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("mousedown", handleClickOutside);
    } else {
      window.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);
  
  return (
    <div className="block md:flex h-[60px] md:min-h-screen w-full">
      <div
        ref={sidebarRef}
        className={`fixed shadow-md inset-y-0 md:w-[264px] left-0 w-64 bg-white text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-200 ease-in-out z-20`}
      >
        <div className="py-[24px]">
          <Image
            src={"/logo.svg"}
            width={100}
            height={100}
            className="w-auto h-auto px-[20px]"
            alt="logo"
          />

          <div className="flex flex-col mt-[16px] h-full bg-white text-white">
            <SidebarMenuItems />
          </div>
        </div>
      </div>

      <div className="flex justify-between ">
        <div className="flex items-center justify-between w-12 p-4 text-gray-400 md:hidden">
          <button
            onClick={toggleSidebar}
            className="text-2xl focus:outline-none"
          >
            {isOpen ? (
              <svg
                className="w-6 h-6"
                fill="#858D9D"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http:www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="#858D9D"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http:www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
        <div className="flex md:hidden">
          <Header />
        </div>
      </div>
      <div className="flex flex-col flex-1 w-full md:ml-64">
        <div className="sticky top-0 z-30 hidden md:flex ">
          <Header />
        </div>
        <div className="flex-1 overflow-auto ">{children}</div>
      </div>
    </div>
  );
};

export default Sidebar;
