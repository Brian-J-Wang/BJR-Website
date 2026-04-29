import React, { type ReactNode } from "react";
import TeamDropDown from "./TeamDropDown/TeamDropDown";

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
		type: "dropdown",
		href: "/eye-surgery",
		displayName: "Eye Surgeries",
		dropdownContent: [],
	},
	{
		type: "dropdown",
		href: "/eye-exams",
		displayName: "Eye Exams",
		dropdownContent: [],
	},
	{
		type: "dropdown",
		href: "/resources",
		displayName: "Resources",
		dropdownContent: [],
	},
];
