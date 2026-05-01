import styles from "./NavItem.module.css";
import type {
	NavLink,
	SimpleNavLink,
	DropDownNavLink,
	CustomDropDownNavLink,
} from "../../../content/headerContent";
import { useHeaderContext } from "../../../context/headerContext";

type NavItemProps = {
	navlink: NavLink;
};

const NavItem: React.FC<NavItemProps> = ({ navlink }) => {
	switch (navlink.type) {
		case "simple":
			return <SimpleNavItem navlink={navlink} />;
		case "dropdown":
			return <DropdownNavItem navlink={navlink} />;
		case "customDropdown":
			return <CustomDropdownNavItem navItem={navlink} />;
		default:
			return null;
	}
};

/* --- Sub-Components --- */

const SimpleNavItem: React.FC<{ navlink: SimpleNavLink }> = ({ navlink }) => {
	return (
		<li key={navlink.displayName}>
			<a href={navlink.href}>{navlink.displayName}</a>
		</li>
	);
};

const DropdownNavItem: React.FC<{ navlink: DropDownNavLink }> = ({
	navlink,
}) => {
	const context = useHeaderContext();

	return (
		<li key={navlink.displayName}>
			<a
				onClick={(evt) => {
					evt.preventDefault();
					context.setNavLink(navlink);
				}}
			>
				{navlink.displayName}
			</a>
			<img
				className={`${styles.cheveron} ${context.navLink == navlink && styles.cheveron_active}`}
				src="/public/cheveron.svg"
				alt="dropdown arrow"
			/>
		</li>
	);
};

const CustomDropdownNavItem: React.FC<{ navItem: CustomDropDownNavLink }> = ({
	navItem,
}) => {
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
		<li key={navItem.displayName}>
			<a onClick={handleClick}>{navItem.displayName}</a>
			<img
				className={`${styles.cheveron} ${navLink == navItem && styles.cheveron_active}`}
				src="/public/cheveron.svg"
				alt="dropdown arrow"
			/>
		</li>
	);
};

export default NavItem;
