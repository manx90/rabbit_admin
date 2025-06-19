import React from 'react'
import { TableOrderProvider } from '../Contexts/TableOrder.context'
import TableOrder from '../components/TableOrder'
export default function Order() {
  return (
    <div className="ContentPage relative">
      <TableOrderProvider>
			<TableOrder />
      </TableOrderProvider>
    </div>
  )
}
