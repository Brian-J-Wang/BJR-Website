import styles from "./NavBar.module.css";
import type { NavLink } from "../../../content/headerContent";
import NavItem from "../NavItem/NavItem";

type NavBarProps = {
	navLinks: NavLink[];
};

const NavBar: React.FC<NavBarProps> = ({ navLinks }) => {
	return (
		<nav className={styles.navbar}>
			<ul>
				{navLinks.map((navlink) => {
					return <NavItem navlink={navlink}></NavItem>;
				})}
			</ul>
		</nav>
	);
};

export default NavBar;
