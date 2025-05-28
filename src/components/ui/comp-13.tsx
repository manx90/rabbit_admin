import { useId } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

export default function InputPrice({
  onChange,
  label,
  name,
  placeholder,
  type,
  className,
  cnLabel,
}) {
  const id = useId();
  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id} className={cnLabel}>
        {label}
      </Label>
      <div className="relative">
        <Input
          id={id}
          name={name}
          className={className}
          // placeholder={placeholder}
          type={type}
          onChange={onChange}
        />
        <span className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm peer-disabled:opacity-50 ">
          $
        </span>
        <span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50 pr-8">
          Shekel
        </span>
      </div>
    </div>
  );
}
