import React from 'react';
import { PanelsTopLeft } from 'lucide-react';

export default function SidebarToggle({ open, setOpen, className = '' }) {
    return (
        <div className="p-1 rounded-md hover:bg-gray-100 transition-colors duration-200">
            <PanelsTopLeft
                fill="white"
                stroke='black'
                className={`cursor-pointer w-[24px] h-[24px] transition-transform duration-300 ease-in-out ${open ? 'rotate-180' : ''} ${className}`}
                onClick={() => setOpen(!open)}
            />
        </div>
    );
}
