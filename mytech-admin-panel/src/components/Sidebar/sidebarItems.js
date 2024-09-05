import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const Icon = ({ icon: IconComponent, color }) => {
  return <IconComponent color={color} />;
};

const SidebarItem = ({ item, color }) => {
  const [isHover, setIsHover] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState({});
  const navigate = useRouter();

  const pathname = usePathname(); 
  console.log('pathname: ', pathname);

  const toggleSubmenu = (label) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const handleRouteChange = (route) => {
    navigate.push(route);
  };

  return (
    <li
      className="relative group "
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div
        className={`flex items-center justify-between p-4 ${pathname===item?.route && "bg-cyan-50"} cursor-pointer hover:bg-cyan-50 `}
        onClick={() =>
          item.submenu
            ? toggleSubmenu(item?.label)
            : handleRouteChange(item.route)
        }
      >
        <div className="flex items-center gap-[8px] px-[27px]">
          <div className="text-center">
            {item.icon && (
              <Icon icon={item.icon} color={isHover ? "#2086BF" : ""} />
            )}
          </div>

          <span className={`${isHover ? "text-cyan-600" : " text-black-900"}`}>
            {item.label}
          </span>
        </div>
        {item.submenu && (
          <svg
            className={`w-4 h-4 transform transition-transform ${
              openSubmenus[item.label] ? "rotate-180" : ""
            }`}
            fill="#000"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
      </div>
      {item.submenu && openSubmenus[item.label] && (
        <ul className="pl-6 space-y-2 ">
          {item.submenu.map((subItem, subIndex) => (
            <SidebarItem key={subIndex} item={subItem} color={color} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default SidebarItem;
