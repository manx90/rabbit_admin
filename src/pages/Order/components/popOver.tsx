import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import React from "react"
import { Column, ButtonOne } from "../../Category/constant/tw-styled-components"
import { Order as OrderApi } from "../../../api/orderApi"
export function PopoverDemo({ id, status, refetch }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">{status === "pending" ? "قيد الانتظار" : status === "readied" ? "جاهز" : status === "cancelled" ? "ملغي" : "تم التحصيل"}</Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit outline-none border-none">
        <Column>
          <ButtonOne className="bg-slate-600 hover:bg-slate-800 text-white" onClick={() => {
            OrderApi.readied(id).then(() => {
              refetch()
            })
          }}>جاهز</ButtonOne>
          <ButtonOne className="bg-slate-600 hover:bg-slate-800 text-white" onClick={() => {
            OrderApi.cancelled(id).then(() => {
              refetch()
            })
          }}>ملغي</ButtonOne>
          <ButtonOne className="bg-slate-600 hover:bg-slate-800 text-white" onClick={() => {
            OrderApi.shipped(id).then(() => {
              refetch()
            })
          }}>تم التحصيل</ButtonOne>
        </Column>
      </PopoverContent>
    </Popover>
  )
}
