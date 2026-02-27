import { useEffect, useRef, useState, type RefObject } from "react";
import Logo from "../logo/logo";
import styles from "./header.module.css";
import { navLinks, type NavLinkContent } from "./headerContent";

type HeaderProps = {
    includeBuffer: boolean;
};

type DropdownState =
    | { type: null }
    | { type: "navigation"; content: NavLinkContent[] };

const Header: React.FC<HeaderProps> = (props) => {
    const [dropdownState, setDropdownState] = useState<DropdownState>(null);
    const contentRef = useRef<HTMLDivElement>(
        null,
    ) as RefObject<HTMLDivElement>;

    //darkens the background color so that the
    useEffect(() => {
        const visibilityThresholdElement =
            document.querySelector("#thresholdElement");

        const visibilityThreshold = (() => {
            if (visibilityThresholdElement) {
                const { bottom } =
                    visibilityThresholdElement.getBoundingClientRect();
                return (
                    bottom -
                    contentRef.current.getBoundingClientRect().height -
                    40
                );
            } else {
                return 120;
            }
        })();

        const onScroll = () => {
            if (window.scrollY > visibilityThreshold) {
                contentRef.current.classList.add(styles.scrolled);
            } else {
                contentRef.current.classList.remove(styles.scrolled);
            }
        };

        window.addEventListener("scroll", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    return (
        <header className={styles.header}>
            <div>
                <div className={styles.content} ref={contentRef}>
                    <Logo
                        containerStyle={""}
                        logoStyle={styles.logo}
                        titleStyle={styles.title}
                        subtitleStyle={styles.subtitle}
                    />
                    <nav className={styles.navbar}>
                        <ul>
                            {navLinks.map((navlink) => {
                                if (navlink.type == "simple") {
                                    return (
                                        <li>
                                            <a href={navlink.href}>
                                                {navlink.displayName}
                                            </a>
                                        </li>
                                    );
                                }

                                if (navlink.type == "dropdown") {
                                    return (
                                        <li>
                                            <a
                                                onClick={(evt) => {
                                                    evt.preventDefault();
                                                }}
                                            >
                                                {navlink.displayName}
                                            </a>
                                            <img
                                                className={styles.cheveron}
                                                src="/public/cheveron.svg"
                                                alt="dropdown arrow"
                                            />
                                        </li>
                                    );
                                }
                            })}
                        </ul>
                    </nav>
                </div>
                <div className={styles.ribbon}>
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
