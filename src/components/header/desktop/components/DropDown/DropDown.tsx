import React, { useState, useEffect } from "react";
import type {
	CustomDropDownNavLink,
	DropDownNavLink,
	NavLink,
	SimpleNavLink,
} from "../../../content/headerContent";

type DropDownProps = {
	navLink: NavLink | null;
};

const DropDown: React.FC<DropDownProps> = ({ navLink }) => {
	const [lastActive, setLastActive] = useState<NavLink | null>(navLink);

	useEffect(() => {
		if (navLink != null) {
			setLastActive(navLink);
		}
	}, [navLink]);

	if (navLink == null) {
		if (lastActive == null) {
			return null;
		}

		switch (lastActive.type) {
			case "simple":
				return null;
			case "dropdown":
				return <SimpleDropDown navLink={lastActive} />;
			case "customDropdown":
				return <CustomDropDown navLink={lastActive} />;
			default:
				return null;
		}
	}

	switch (navLink.type) {
		case "simple":
			return null;
		case "dropdown":
			return <SimpleDropDown navLink={navLink} />;
		case "customDropdown":
			return <CustomDropDown navLink={navLink} />;
		default:
			return null;
	}
};

/* Sub Components */

type SimpleDropDownProps = {
	navLink: DropDownNavLink;
};

const SimpleDropDown: React.FC<SimpleDropDownProps> = (props) => {
	return <div></div>;
};

type CustomDropDownProps = {
	navLink: CustomDropDownNavLink;
};

const CustomDropDown: React.FC<CustomDropDownProps> = (props) => {
	return props.navLink.dropdownContent;
};
export default DropDown;
