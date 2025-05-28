import React from "react";

interface SelectButtonProps {
  className?: string;
  cnOption?: string;
  cnLabel?: string;
  label?: string;
  value?: string | number;
  placeholder?: string;
  options?: Array<any>;
  onChange?: (e: { target: { value: string } }) => void;
  required?: boolean;
}

export default function SelectButton({
  className,
  cnOption,
  cnLabel,
  label,
  placeholder = "Select an option",
  options = [],
  onChange,
  required = false
}: SelectButtonProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className={cnLabel}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        className={`${className} px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200`}
        onChange={onChange}
        required={required}
      >
        <option value="">{placeholder}</option>
        {options?.map((item: any) => (
          <option
            key={item.id}
            value={item.id}
            className={cnOption}
          >
            {item.category || item.name}
          </option>
        ))}
      </select>
    </div>
  );
}
