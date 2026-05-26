import React, { type ReactNode } from "react";
import TeamDropDown from "./TeamDropDown/TeamDropDown";
import Services from "./Services/Services";
import Locations from "./Locations/Locations";

type BaseNavLink = {
	href: string;
	displayName: string;
};

export type SimpleNavLink = BaseNavLink & {
	type: "simple";
};

export type DropDownNavLink = BaseNavLink & {
	type: "dropdown";
	dropdownContent: NavLinkContent[];
};

export type NavLinkContent = {
	displayName: string;
	blurb: string;
	href: string;
};

export type CustomDropDownNavLink = BaseNavLink & {
	type: "customDropdown";
	dropdownContent: ReactNode;
};

export type NavLink = SimpleNavLink | DropDownNavLink | CustomDropDownNavLink;

export const navLinks: NavLink[] = [
	{
		type: "simple",
		href: "/",
		displayName: "Home",
	},
	{
		type: "simple",
		href: "/team",
		displayName: "Our Team",
	},
	{
		type: "customDropdown",
		href: "/services",
		displayName: "Our Services",
		dropdownContent: <Services />,
	},
	{
		type: "customDropdown",
		href: "",
		displayName: "Locations",
		dropdownContent: <Locations />,
	},
	{
		type: "dropdown",
		href: "/resources",
		displayName: "Resources",
		dropdownContent: [],
	},
];
