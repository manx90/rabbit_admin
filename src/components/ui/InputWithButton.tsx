// import { useId } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React from "react"

export default function InputWithButton({
	type,
	id,
	className,
	placeholder,
	onChange,
	required,
	value,
	button,
	label,
	cnButton,
  onClick,
  cnLabel,
}) {
	// const id = useId()
	return (
		<div className="*:not-first:mt-2">
			<Label htmlFor={id} className={cnLabel}>{label}</Label>
      <div className="flex gap-2 md:flex-row flex-col">
        <Input id={id} className={className} placeholder={placeholder} type={type} onChange={onChange} required={required} value={value} />
        <Button variant="outline" className={cnButton} onClick={onClick}>{button}</Button>
      </div>
    </div>
  )
}
