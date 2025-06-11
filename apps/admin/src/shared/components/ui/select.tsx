import React from 'react';

// Select 컴포넌트
interface SelectProps<T extends string = string> extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children?: React.ReactNode;
  value?: T;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onValueChange?: (value: T) => void;
  className?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps<string>>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          className={`block w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 pr-8 text-gray-900 focus:border-blue-500 focus:outline-none ${className}`}
          {...props}
        >
          {children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>
    );
  }
);

// SelectTrigger 컴포넌트
export const SelectTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

// SelectValue 컴포넌트
export const SelectValue: React.FC<{ children?: React.ReactNode; placeholder?: string }> = ({ 
  children,
  placeholder
}) => {
  return (
    <span className="block truncate">
      {children || placeholder || "Select an option"}
    </span>
  );
};

// SelectContent 컴포넌트
export const SelectContent: React.FC<{ children?: React.ReactNode; className?: string }> = ({ 
  children,
  className = ""
}) => {
  return (
    <div className={`mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-300 bg-white py-1 shadow-lg ${className}`}>
      {children}
    </div>
  );
};

// SelectGroup 컴포넌트
export const SelectGroup: React.FC<{ children?: React.ReactNode; className?: string }> = ({ 
  children,
  className = ""
}) => {
  return (
    <div className={`px-2 py-1 ${className}`}>
      {children}
    </div>
  );
};

// SelectItem 컴포넌트
export interface SelectItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  value: string;
}

export const SelectItem = React.forwardRef<HTMLLIElement, SelectItemProps>(
  ({ className = '', children, value, ...props }, ref) => {
    return (
      <li
        ref={ref}
        className={`relative cursor-pointer select-none py-2 px-3 text-gray-900 hover:bg-blue-50 ${className}`}
        data-value={value}
        {...props}
      >
        {children}
      </li>
    );
  }
);

Select.displayName = 'Select';
SelectTrigger.displayName = 'SelectTrigger';
SelectContent.displayName = 'SelectContent';
SelectGroup.displayName = 'SelectGroup';
SelectItem.displayName = 'SelectItem';
