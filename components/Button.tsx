import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'black';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "py-3 px-6 rounded-md font-semibold transition-all duration-300 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-tonga-red text-white hover:bg-red-800 focus:ring-red-800",
    secondary: "bg-white text-tonga-red border-2 border-tonga-red hover:bg-red-50 focus:ring-red-200",
    outline: "bg-transparent border-2 border-tonga-red text-tonga-red hover:bg-tonga-red hover:text-white",
    black: "bg-black text-white hover:bg-gray-800 focus:ring-gray-800"
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthStyle} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};