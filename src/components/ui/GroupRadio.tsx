import { useId } from "react";
import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function GroupRadio({
  className,
  cnLabel,
  cnRadio,
  options,
  onChange,
}) {
  const id = useId();
  return (
    <RadioGroup
      className={` [--primary:var(--color-indigo-500)] [--ring:var(--color-indigo-300)] in-[.dark]:[--primary:var(--color-indigo-500)] in-[.dark]:[--ring:var(--color-indigo-900)] ${className}`}
      onValueChange={onChange}
    >
      {options.map((option: { value: string; label: string }, index: React.Key) => (
        <div className="flex items-center gap-2" key={index}>
          <RadioGroupItem
            value={option.value}
            id={`${id}-${index}`}
            className={cnRadio}
          />
          <Label htmlFor={`${id}-${index}`} className={cnLabel}>
            {option.label}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}
