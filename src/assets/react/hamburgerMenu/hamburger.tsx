import type { ReactElement, SVGProps } from "react";
import styles from "./hamburger.module.css";

type HamburgerMenuProps = SVGProps<SVGSVGElement> & {};

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ className, ...props }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			className={styles.svg}
			{...props}
		>
			<path d="M3 6h18" />
			<path d="M3 12h18" />
			<path d="M3 18h18" />
		</svg>
	);
};

export default HamburgerMenu;
