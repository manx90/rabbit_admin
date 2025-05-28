import { useId } from "react"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import React from "react"

export default function Description({onChange}) {
  const id = useId()
  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id}>Description</Label>
      <Textarea id={id} placeholder="Enter Description" onChange={onChange}/>
    </div>
  )
}
