"use client";
import Image from "next/image";
import React, { useState } from "react";

const Header = () => {
  const [bellNotifications, setBellNotifications] = useState(2);
  const [emailNotifications, setEmailNotifications] = useState(2);

  return (
    <>
      <div className="flex items-center justify-between w-full px-6 py-6 rounded-md">
        <div className="relative">
          <input
            type="text"
            className="pl-8 rounded-md bg-gray-default focus:border-blue-500 focus:outline-none"
            placeholder="Search"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0 1 14 0z"
              ></path>
            </svg>
          </div>
        </div>
        <div className="relative flex items-center gap-8 ">
          <div className="relative items-center hidden gap-8 md:flex ">
            <Image
              src="/svg/calendar.svg"
              alt="User avatar"
              width={24}
              height={24}
              className="hidden h-6 md:flex"
            />
            <div className="relative hidden md:flex">
              {bellNotifications > 0 && (
                <span className="text-white p-[2px] px-[8px] absolute top-[-10px] right-[-10px] text-xs bg-cyan-500 rounded-md">
                  {bellNotifications}
                </span>
              )}
              <Image
                src="/svg/bell.svg"
                alt="Bell icon"
                width={24}
                height={24}
                className="hidden h-6 md:flex"
              />
            </div>
            <div className="hidden md:relative md:flex">
              <Image
                src="/svg/email.svg"
                alt="Email icon"
                width={24}
                height={24}
                className="h-6 "
              />
              {emailNotifications > 0 && (
                <span className="text-white p-[2px] px-[8px] absolute top-[-10px] right-[-10px] text-xs bg-cyan-500 rounded-md">
                  {emailNotifications}
                </span>
              )}
            </div>

            <Image
              src="/svg/user.svg"
              alt="User avatar"
              width={32}
              height={32}
              className="hidden h-7 md:flex"
            />
          </div>
          <div className="relative flex items-center space-x-3">
            <div className="relative">
              <Image
                src="/svg/user.svg"
                alt="User avatar"
                width={32}
                height={32}
                className="h-[32px]"
              />
              <span className="absolute bottom-0 right-0 w-[10px] h-[10px] bg-green-500 border-2 border-white rounded-full"></span>
            </div>
            <div className="flex-col hidden md:flex text-nowrap">
              <div className="text-sm font-medium">Jenil Patel</div>
              <div className="px-2 py-1 text-xs rounded-md">Manager</div>
            </div>

            <div>
              <Image
                src="/svg/arrow-down.svg"
                alt="User avatar"
                width={100}
                height={100}
                className="w-8 h-8 rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
