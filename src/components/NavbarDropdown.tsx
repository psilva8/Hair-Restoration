'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { City } from '@/utils/data-utils';

interface NavbarDropdownProps {
  title: string;
  items: City[];
}

export default function NavbarDropdown({ title, items }: NavbarDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close dropdown when pressing escape key
  useEffect(() => {
    function handleEscKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  // Handle keyboard navigation inside dropdown
  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    const menuItems = dropdownRef.current?.querySelectorAll('a');
    if (!menuItems) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const nextIndex = (index + 1) % menuItems.length;
      (menuItems[nextIndex] as HTMLElement).focus();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      const prevIndex = (index - 1 + menuItems.length) % menuItems.length;
      (menuItems[prevIndex] as HTMLElement).focus();
    }
  };

  return (
    <li ref={dropdownRef} className="relative">
      <button 
        className="text-gray-800 hover:text-blue-600 font-medium flex items-center cursor-pointer bg-transparent border-0 p-0"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {title}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-4 w-4 ml-1 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute left-0 top-full mt-1 w-60 z-30">
          <div className="bg-white rounded-md shadow-lg overflow-hidden py-2 max-h-96 overflow-y-auto border border-gray-200">
            {items.map((item, index) => (
              <Link 
                key={index} 
                href={`/${item.urlSlug}`} 
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 focus:bg-blue-50 focus:outline-none"
                onClick={() => setIsOpen(false)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                tabIndex={0}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </li>
  );
} 