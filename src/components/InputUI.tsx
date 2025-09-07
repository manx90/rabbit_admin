import React, { useId } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type InputUIProps = {
  disable?: boolean;
  labelInput?: string;
  placeHolderInput?: string;
  type?: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputUI = React.forwardRef<HTMLInputElement, InputUIProps>(
  (
    {
      disable,
      labelInput = "Email",
      placeHolderInput = "email",
      type = "email",
      className,
      ...rest
    },
    ref,
  ) => {
    const id = useId();
    return (
      <div className="*:not-first:mt-1 w-full">
        <Label htmlFor={id}>{labelInput}</Label>
        <Input
          disabled={disable}
          className={className}
          id={id}
          placeholder={placeHolderInput}
          type={type}
          ref={ref}
          {...rest}
        />
      </div>
    );
  },
);

export default InputUI;
