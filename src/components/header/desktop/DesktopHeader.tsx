import styles from "./DesktopHeader.module.css";
import { useEffect, useRef, useState, type RefObject } from "react";
import Logo from "../../logo/logo";
import { navLinks, type NavLink } from "../content/headerContent";
import NavBar from "./components/NavBar/NavBar";
import { HeaderContext } from "../context/headerContext";
import DropDown from "./components/DropDown/DropDown";

const DesktopHeader: React.FC = (props) => {
	const [navLink, setNavLink] = useState<NavLink | null>(null);
	const contentRef = useRef<HTMLDivElement>(
		null,
	) as RefObject<HTMLDivElement>;
	const headerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const visibilityThresholdElement =
			document.querySelector("#thresholdElement");
		const visibilityThreshold = visibilityThresholdElement?.scrollHeight!;

		//Initial Opacity
		const addOpacity =
			((window.scrollY + 160) / visibilityThreshold) * 0.35;
		contentRef.current.style.backgroundColor = `rgba(45, 96, 148, ${0.65 + addOpacity})`;

		const onScroll = () => {
			const addOpacity =
				((window.scrollY + 160) / visibilityThreshold) * 0.35;
			contentRef.current.style.backgroundColor = `rgba(45, 96, 148, ${0.65 + addOpacity})`;
		};

		window.addEventListener("scroll", onScroll);
		return () => {
			window.removeEventListener("scroll", onScroll);
		};
	}, []);

	useEffect(() => {
		if (navLink == null) {
			return;
		}

		const onMouseDown = (evt: MouseEvent) => {
			if (
				headerRef.current &&
				!headerRef.current.contains(evt.target as Node)
			) {
				setNavLink(null);
			}
		};

		const onScroll = () => {
			setNavLink(null);
		};

		window.addEventListener("mousedown", onMouseDown);
		window.addEventListener("scroll", onScroll);
		return () => {
			window.removeEventListener("mousedown", onMouseDown);
			window.removeEventListener("scroll", onScroll);
		};
	}, [navLink]);

	return (
		<HeaderContext.Provider value={{ navLink, setNavLink }}>
			<header className={styles.header} ref={headerRef}>
				<div className={styles.content} ref={contentRef}>
					<Logo
						containerStyle={""}
						logoStyle={styles.logo}
						titleStyle={styles.title}
						subtitleStyle={styles.subtitle}
					/>
					<NavBar navLinks={navLinks} />
				</div>
				<div className={`${styles.drawer} `}>
					<div
						className={`${styles.drawerInner} ${navLink ? styles.drawerInnerActive : ""}`}
					>
						<DropDown navLink={navLink}></DropDown>
					</div>
					<div className={styles.bottomBar}>
						<div className={styles.langSelect}>English | 中文</div>
						<div className={styles.infoRibbon}>
							<span>
								<span className={styles.fontBold}>
									Manhattan{" "}
								</span>
								| (212) 219-7786
							</span>
							<span>
								<span className={styles.fontBold}>
									Brooklyn{" "}
								</span>
								| (718) 492-3500
							</span>
						</div>
					</div>
				</div>
			</header>
		</HeaderContext.Provider>
	);
};

export default DesktopHeader;
