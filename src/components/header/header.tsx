import { useEffect, useRef, type RefObject } from "react";
import Logo from "../logo/logo";
import styles from "./header.module.css";

type HeaderProps = {
    includeBuffer: boolean;
};

const Header: React.FC<HeaderProps> = (props) => {
    const navBarRef = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>;

    useEffect(() => {
        const visibilityThresholdElement =
            document.querySelector("#thresholdElement");

        const visibilityThreshold = (() => {
            if (visibilityThresholdElement) {
                const { bottom } =
                    visibilityThresholdElement.getBoundingClientRect();
                return (
                    bottom -
                    navBarRef.current.getBoundingClientRect().height -
                    40
                );
            } else {
                return 120;
            }
        })();

        const onScroll = () => {
            if (window.scrollY > visibilityThreshold) {
                navBarRef.current.classList.add(styles.scrolled);
            } else {
                navBarRef.current.classList.remove(styles.scrolled);
            }
        };

        window.addEventListener("scroll", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    return (
        <header className={styles.header}>
            <div className={styles.content}>
                <div className={styles.navbar} ref={navBarRef}>
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
            </div>
            <div
                className={styles.headerBuffer}
                hidden={props.includeBuffer == false}
            ></div>
        </header>
    );
};

export default Header;
