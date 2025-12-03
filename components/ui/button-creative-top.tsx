'use client';
import React from 'react';

interface ButtonCreativeTopProps {
  onClick?: () => void;
}

function ButtonCreativeTop({ onClick }: ButtonCreativeTopProps) {
  return (
    <div
      onClick={onClick}
      className="group relative cursor-pointer p-2 w-32 border border-slate-300 bg-white rounded-full overflow-hidden text-slate-900 text-center font-semibold"
    >
      <span className="translate-y-0 group-hover:-translate-y-12 group-hover:opacity-0 transition-all duration-300 inline-block">
        Our Work
      </span>
      <div className="flex gap-2 text-white bg-slate-800 z-10 items-center absolute left-0 top-0 h-full w-full justify-center translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 rounded-full group-hover:rounded-none">
        <span>Our Work</span>
      </div>
    </div>
  );
}

export default ButtonCreativeTop;
