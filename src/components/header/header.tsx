import Logo from "../logo/logo";
import styles from "./header.module.css";

const Header: React.FC<{}> = () => {
    return (
        <header>
            <div className={styles.headerTop}>
                <div className={styles.headerLeft}>
                    <img src="/favicon.svg" className={styles.headerLogo} />
                    <div>
                        <h1 className={styles.title}>BingJing Roberts</h1>
                        <small className={styles.subtitle}>Ophthalmology</small>
                    </div>
                </div>
                <Logo
                    containerStyle={""}
                    logoStyle={""}
                    titleStyle={""}
                    subtitleStyle={""}
                />
                <nav>
                    <a href="/">Home</a>
                    <a href="/locations">Our Locations</a>
                    <a href="/team">Our team</a>
                    <a href="/eye-surgury">Eye Surgeries</a>
                    <a href="/eye-exam">Eye Exams</a>
                    <a href="/resources">Resources</a>
                </nav>
            </div>
            <div className={styles.headerRibbon}>
                <div className={styles.langSelect}>English | 中文</div>
                <div className={styles.infoRibbon}>
                    <span>
                        <span className={styles.fontBold}>Manhatten </span>|
                        (212) 219-7786
                    </span>
                    <span>
                        <span className={styles.fontBold}>Brooklyn </span>|
                        (718) 492-3500
                    </span>
                </div>
            </div>
        </header>
    );
};

export default Header;
