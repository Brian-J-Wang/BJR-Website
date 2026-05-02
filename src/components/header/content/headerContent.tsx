import React, { type ReactNode } from "react";
import TeamDropDown from "./TeamDropDown/TeamDropDown";
import Services from "./Services/Services";

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
		type: "customDropdown",
		href: "/team",
		displayName: "Our Team",
		dropdownContent: <TeamDropDown />,
	},
	{
		type: "customDropdown",
		href: "/services",
		displayName: "Our Services",
		dropdownContent: <Services className="py-12" />,
	},
	{
		type: "dropdown",
		href: "",
		displayName: "Locations",
		dropdownContent: [],
	},
	{
		type: "dropdown",
		href: "/resources",
		displayName: "Resources",
		dropdownContent: [],
	},
];
