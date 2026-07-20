import styles from "./NavItem.module.css";
import clsx from "clsx";
import type {
	NavLink,
	SimpleNavLink,
	DropDownNavLink,
	CustomDropDownNavLink,
} from "../../../content/headerContent";
import { useHeaderContext } from "../../../context/headerContext";

type NavItemProps = {
	navlink: NavLink;
	className: string;
};

const NavItem: React.FC<NavItemProps> = ({ navlink, className }) => {
	switch (navlink.type) {
		case "simple":
			return <SimpleNavItem navlink={navlink} />;
		case "dropdown":
			return <DropdownNavItem navlink={navlink} className={className} />;
		case "customDropdown":
			return (
				<CustomDropdownNavItem
					navItem={navlink}
					className={className}
				/>
			);
		default:
			return null;
	}
};

/* --- Sub-Components --- */

const SimpleNavItem: React.FC<{
	navlink: SimpleNavLink;
	className?: string;
}> = ({ navlink, className }) => {
	const context = useHeaderContext();

	return (
		<li
			key={navlink.displayName}
			className={clsx(styles.dropdown, {
				[styles.dropdown_active]:
					navlink?.displayName ==
					(context.navLink?.displayName ?? ""),
			})}
		>
			<a href={navlink.href}>{navlink.displayName}</a>
		</li>
	);
};

const DropdownNavItem: React.FC<{
	navlink: DropDownNavLink;
	className?: string;
}> = ({ navlink, className }) => {
	const context = useHeaderContext();

	return (
		<li
			key={navlink.displayName}
			className={clsx(styles.dropdown, {
				[styles.dropdown_active]:
					navlink?.displayName ==
					(context.navLink?.displayName ?? ""),
			})}
		>
			<a
				onClick={(evt) => {
					evt.preventDefault();
					context.setNavLink(navlink);
				}}
			>
				{navlink.displayName}
			</a>
			<img
				className={clsx(styles.cheveron, {
					[styles.cheveron_active]: context.navLink === navlink,
				})}
				src="cheveron.svg"
				alt="dropdown arrow"
			/>
		</li>
	);
};

const CustomDropdownNavItem: React.FC<{
	navItem: CustomDropDownNavLink;
	className?: string;
}> = ({ navItem, className }) => {
	const { navLink, setNavLink } = useHeaderContext();

	const handleClick = (evt: React.MouseEvent<HTMLAnchorElement>) => {
		evt.preventDefault();

		if (navLink === null) {
			setNavLink(navItem);
			//set the active nav link to null if the current active nav link is the same as this one
		} else if (navLink.displayName == navItem.displayName) {
			setNavLink(null);
		} else {
			setNavLink(navItem);
		}
	};

	return (
		<li
			key={navItem.displayName}
			className={clsx(styles.dropdown, {
				[styles.dropdown_active]:
					navLink?.displayName == navItem.displayName,
			})}
		>
			<a onClick={handleClick}>{navItem.displayName}</a>
			<img
				className={clsx(styles.cheveron, {
					[styles.cheveron_active]: navLink === navItem,
				})}
				src="cheveron.svg"
				alt="dropdown arrow"
			/>
		</li>
	);
};

export default NavItem;
