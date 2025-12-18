import React from 'react';
import { twMerge } from 'tailwind-merge';

export const Input = React.forwardRef(({ className, type, ...props }, ref) => {
    return (
        <input
            type={type}
            className={twMerge(
                "flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-base md:text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-blue-800",
                className
            )}
            ref={ref}
            {...props}
        />
    );
});
