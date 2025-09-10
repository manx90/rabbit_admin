import React from "react";
import { Drawer } from "antd";

const DrawerComp = ({
	title,
	placement = "right",
	height,
	width,
	open,
	onClose,
	extra,
	children,
}) => {
	return (
		<Drawer
			className="border rounded-2xl"
			title={title}
			placement={placement}
			height={height}
			width={width}
			open={open}
			onClose={onClose}
			extra={extra}
		>
			{children}
		</Drawer>
	);
};

export default DrawerComp;
