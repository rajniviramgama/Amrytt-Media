const DashboardIcon = ({ height, width, color }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={color || "none"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_96_55147)">
        <path
          d="M8.25 3H6C4.34315 3 3 4.34315 3 6V8.25C3 9.90685 4.34315 11.25 6 11.25H8.25C9.90685 11.25 11.25 9.90685 11.25 8.25V6C11.25 4.34315 9.90685 3 8.25 3Z"
          fill={color || "#858D9D"}
        />
        <path
          d="M18 3H15.75C14.0931 3 12.75 4.34315 12.75 6V8.25C12.75 9.90686 14.0931 11.25 15.75 11.25H18C19.6568 11.25 21 9.90686 21 8.25V6C21 4.34315 19.6568 3 18 3Z"
          fill={color || "#858D9D"}
        />
        <path
          d="M8.25 12.75H6C4.34315 12.75 3 14.0931 3 15.75V18C3 19.6569 4.34315 21 6 21H8.25C9.90685 21 11.25 19.6569 11.25 18V15.75C11.25 14.0931 9.90685 12.75 8.25 12.75Z"
          fill={color || "#858D9D"}
        />
        <path
          d="M18 12.75H15.75C14.0931 12.75 12.75 14.0931 12.75 15.75V18C12.75 19.6569 14.0931 21 15.75 21H18C19.6568 21 21 19.6569 21 18V15.75C21 14.0931 19.6568 12.75 18 12.75Z"
          fill={color || "#858D9D"}
        />
      </g>
      <defs>
        <clipPath id="clip0_96_55147">
          <rect
            width="18"
            height="18"
            fill="white"
            transform="translate(3 3)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
export default DashboardIcon;
