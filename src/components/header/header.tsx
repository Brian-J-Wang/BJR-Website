import styles from "./header.module.css";
import MobileHeader from "./mobileHeader/mobileHeader";
import DesktopHeader from "./desktop/DesktopHeader";

const Header = () => {
	return (
		<>
			<div className={styles.mobile}>
				<MobileHeader />
			</div>
			<div className={styles.desktop}>
				<DesktopHeader />
			</div>
		</>
	);
};

export default Header;
