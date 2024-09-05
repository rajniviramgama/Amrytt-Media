import { usePathname } from "next/navigation";
import CalendarIcon from "../svg/calendarIcon";
import ChatIcon from "../svg/chat";
import ContactIcon from "../svg/contact";
import DashboardIcon from "../svg/dashboard-icon";
import EcommerceIcon from "../svg/e-commerce";
import FileManagerIcon from "../svg/filemanager";
import ProjectIcon from "../svg/project";

const { default: SidebarItem } = require("./sidebarItems");

const SidebarMenuItems = ({ color = "#000" }) => {
    const sidebarItems = [
      {
        label: "Dashboard",
        route: "/",
        icon: DashboardIcon,
      },
      {
        label: "E-Commerce",
        icon: EcommerceIcon,
        submenu: [
          { label: "Products", route: "/product" },
          { label: "Categories", route: "/categories" },
          { label: "Orders", route: "/orders" },
          { label: "Customers", route: "/customers" },
        ],
      },
      {
        label: "Projects",
        route: "",
        icon: ProjectIcon,
      },
      {
        label: "Contact",
        icon: ContactIcon,
        submenu: [
          { label: "Contact Us", route: "",  },
          { label: "History", route: "",  },
        ],
      },
      {
        label: "File Manager",
        route: "",
        icon: FileManagerIcon,
      },
      {
        label: "Chat",
        route: "",
        icon: ChatIcon,
      },
      {
        label: "Calendar",
        route: "",
        icon: CalendarIcon,
      },
    ];
  
    return (
      <ul className={`space-y-4  `}>
        {sidebarItems.map((item, index) => (
          <SidebarItem key={index} item={item} color={color} />
        ))}
      </ul>
    );
  };
  

  export default SidebarMenuItems