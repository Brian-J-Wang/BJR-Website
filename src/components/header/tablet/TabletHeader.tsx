import Logo from "../../logo/logo";
import styles from "../header.module.css";
import tabletStyles from "./TabletHeader.module.css";

type TabletHeaderProps = {};

const TabletHeader: React.FC<TabletHeaderProps> = (props) => {
    return (
        <header className={styles.header}>
            <div className={tabletStyles.content}>
                <nav className={tabletStyles.navbar}>
                    <ul className={tabletStyles.navList}>
                        <li>Home</li>
                        <li>About</li>
                        <li>
                            <Logo
                                containerStyle={tabletStyles.logoContainer}
                                logoStyle={tabletStyles.logo}
                                titleStyle={tabletStyles.title}
                                subtitleStyle={tabletStyles.subtitle}
                            />
                        </li>
                        <li>Services</li>
                        <li>Contact</li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default TabletHeader;
