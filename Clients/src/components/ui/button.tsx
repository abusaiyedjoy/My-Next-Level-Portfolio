import React from "react";

interface ButtonProps {
  title: string;
  onClick?: () => void;
}

const Button = ({ title, onClick }: ButtonProps) => {
  return (
    <button onClick={onClick} className="relative inline-flex h-11 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-[#334CEC] focus:ring-offset-2 focus:ring-offset-gray-50">
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#334CEC_0%,#1e2aa0_50%,#334CEC_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-[#081049]  px-8 py-1 font-medium text-white backdrop-blur-3xl">
        {title}
      </span>
    </button>
  );
};

export default Button;
