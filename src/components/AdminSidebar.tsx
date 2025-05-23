
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Users, 
  Dumbbell, 
  Calendar, 
  CreditCard, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  LayoutDashboard,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';

type SidebarItemProps = {
  icon: React.ElementType;
  label: string;
  to: string;
  isActive: boolean;
  isCollapsed: boolean;
};

const SidebarItem = ({ icon: Icon, label, to, isActive, isCollapsed }: SidebarItemProps) => (
  <Link 
    to={to}
    className={cn(
      "flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200",
      isCollapsed ? "justify-center" : "",
      isActive 
        ? "bg-fdgym-red text-white" 
        : "text-fdgym-light-gray hover:bg-fdgym-dark-gray hover:text-white"
    )}
  >
    <Icon className={cn("h-5 w-5", isActive ? "text-white" : "text-fdgym-red")} />
    {!isCollapsed && <span>{label}</span>}
  </Link>
);

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", to: "/admin" },
    { icon: Users, label: "Users", to: "/admin/users" },
    { icon: Dumbbell, label: "Workouts", to: "/admin/workouts" },
    { icon: Calendar, label: "Attendance", to: "/admin/attendance" },
    { icon: CreditCard, label: "Subscriptions", to: "/admin/subscriptions" },
    { icon: Settings, label: "Settings", to: "/admin/settings" },
  ];

  // Function to check if a path is active
  const isPathActive = (path: string) => {
    if (path === "/admin" && location.pathname === "/admin") {
      return true;
    }
    return location.pathname.startsWith(path) && path !== "/admin";
  };

  return (
    <div className={cn(
      "h-screen bg-gradient-to-b from-black to-fdgym-dark-gray border-r border-fdgym-dark-gray transition-all duration-300 flex flex-col",
      collapsed ? "w-[70px]" : "w-[240px]"
    )}>
      <div className={cn(
        "h-16 flex items-center px-4 sticky top-0",
        collapsed ? "justify-center" : "justify-between"
      )}>
        {!collapsed && (
          <Link to="/admin" className="flex items-center gap-2">
            <Dumbbell className="h-6 w-6 text-fdgym-red" />
            <span className="font-orbitron text-lg font-bold text-white">Admin</span>
          </Link>
        )}
        <button 
          onClick={toggleSidebar}
          className="p-1 rounded-lg hover:bg-fdgym-dark-gray text-fdgym-light-gray"
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>
      
      <div className="flex-grow p-3 space-y-2 pt-6">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            to={item.to}
            isActive={isPathActive(item.to)}
            isCollapsed={collapsed}
          />
        ))}
      </div>
      
      <div className="p-3 border-t border-fdgym-dark-gray">
        <Link to="/" className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-fdgym-light-gray hover:bg-fdgym-dark-gray hover:text-white",
          collapsed ? "justify-center" : ""
        )}>
          <LogOut className="h-5 w-5 text-fdgym-red" />
          {!collapsed && <span>Back to Site</span>}
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;
