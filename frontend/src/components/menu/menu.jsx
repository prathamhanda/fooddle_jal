import React from "react";
import { Menu, X } from "lucide-react";

export default function Ham({ isOpen, onClick }) {
  return (
    <div className="flex items-center space-x-4 z-[10000] relative">
      <button
        onClick={onClick}
        aria-expanded={isOpen}
        aria-label="Toggle menu"
        aria-controls="mobile-menu"
        className="text-indigo-700 hover:text-indigo-900 p-3 rounded-xl hover:bg-indigo-200/40 duration-300 group border border-indigo-300/50 hover:border-indigo-400/70"
      >
        {isOpen ? (
          <X size={26} className="transform transition-all duration-300" />
        ) : (
          <>
            <Menu
              size={24}
              className="sm:hidden transform group-hover:scale-110 transition-all duration-300"
            />
            <Menu
              size={26}
              className="hidden sm:block transform group-hover:scale-110 transition-all duration-300"
            />
          </>
        )}
      </button>
    </div>
  );
}
