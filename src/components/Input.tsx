import React, { ChangeEvent } from 'react';

interface InputProps {
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    className?: string;
}

const Input: React.FC<InputProps> = ({ value, onChange, placeholder, className = '' }) => {
    return (
        <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`
        grow max-w-md max-h-[3rem] px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg
        shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
        transition duration-300 ease-in-out hover:shadow-lg
        placeholder-gray-400 text-gray-700 ${className}
        `}
        />
    );
};

export default Input;
