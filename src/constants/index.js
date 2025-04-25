  
import { Calendar, Calendar1, CalendarIcon, FileIcon, Home, PlusIcon, Settings2Icon, SquarePen, User } from "lucide-react";

export default {
  NAVLINKS: [
    {
      name: "Overview",
      Path: "/dashboard",
      icon: Home,
    },
    {
      name: "Appointments",
      Path: "/dashboard/appointments",
      icon: CalendarIcon,
    },
    {
      name: "Create Blogs",
      Path: "/dashboard/Create-blog",
      icon: PlusIcon,
    },
    {
      name: "Doc Blogs",
      Path: "/dashboard/blogs",
      icon: FileIcon,
    },
    // {
    //   name: "Update Blog",
    //   Path: "/dashboard/update-blog", // Path now matches the route without ID parameter
    //   icon: SquarePen,
    // },
    {
      name: "Profile",
      Path: "/dashboard/profile", // Fixed capitalization to match route
      icon: User,
    },
    {
      name: "Settings",
      Path: "/dashboard/settings",
      icon: Settings2Icon,
    },
  ],
};