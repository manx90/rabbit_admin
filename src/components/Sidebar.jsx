import React from "react";
import { LayoutDashboard } from "lucide-react";
import { Shirt } from "lucide-react";
import { Package } from "lucide-react";
import { Megaphone } from "lucide-react";
import { Link } from "react-router-dom";
import SidebarToggle from "./SidebarToggle";

export default function Sidebar({ open, setOpen }) {
  return (
    <div
      id="sidebar"
      className={`fixed flex w-100 top-0 left-0 items-center overflow-hidden flex-col h-screen bg-black shadow-xl z-[100] 
				transform transition-transform duration-300 ease-linear ${open ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="flex w-full px-4 md:px-[60px] justify-between items-center">
        <img
          src="logo-white.png"
          alt="logo"
          className="w-[100%] mx-auto my-[20px] "
        />
        <div className="justify-center my-[20px]">
          <SidebarToggle
            open={open}
            setOpen={setOpen}
            className="text-white hover:text-blue-400"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full px-4 md:px-10 border-b-2 border-[#363030] pb-[20px]">
        <Link
          to="/dashboard"
          className={
            window.location.pathname === "/dashboard" ||
            window.location.pathname === "/"
              ? "Sidebar-Button bg-[#363030]"
              : "Sidebar-Button"
          }
          onClick={() => setOpen(false)}
        >
          <span className="flex gap-4 cursor-pointer">
            <LayoutDashboard /> Dashboard
          </span>
        </Link>
        <Link
          to="/product"
          className={
            window.location.pathname === "/product"
              ? "Sidebar-Button bg-[#363030]"
              : "Sidebar-Button"
          }
          onClick={() => setOpen(false)}
        >
          <span className="flex gap-4 cursor-pointer">
            <Shirt /> Product
          </span>
        </Link>
        <Link
          to="/order"
          className={
            window.location.pathname === "/order"
              ? "Sidebar-Button bg-[#363030]"
              : "Sidebar-Button"
          }
          onClick={() => setOpen(false)}
        >
          <span className="flex gap-4 cursor-pointer">
            <Package /> Order
          </span>
        </Link>
        <Link
          to="/advertisements"
          className={
            window.location.pathname === "/advertisements"
              ? "Sidebar-Button bg-[#363030]"
              : "Sidebar-Button"
          }
          onClick={() => setOpen(false)}
        >
          <span className="flex gap-4 cursor-pointer">
            <Megaphone />
            Advertising
          </span>
        </Link>
      </div>
    </div>
  );
}
