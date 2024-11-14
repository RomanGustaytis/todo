import React, { ReactNode } from 'react';

interface ButtonProps {
    onClick: () => void;
    children: ReactNode;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className = '' }) => {
    return (
        <button
            onClick={onClick}
            className={`whitespace-nowrap px-6 py-3 font-semibold rounded-lg border border-solid border-grey hover:bg-slate-300 transform transition duration-300 ease-in-out ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
