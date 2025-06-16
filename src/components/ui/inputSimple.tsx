import { useId } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

export default function InputSimple({
  className,
  cnLabel,
  placeholder,
  type,
  onChange,
  label,
  value,
}: {
  className?: string;
  cnLabel?: string;
  placeholder?: string;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  value?: string;
}) {
  const id = useId();
  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id} className={cnLabel}>
        {label}
      </Label>
      <Input
        id={id}
        className={className}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}
