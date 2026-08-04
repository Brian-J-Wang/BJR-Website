import Logo from "@components/logo/logo";
import styles from "./mobileHeader.module.css";
import { useLayoutEffect, useRef, useState } from "react";
import HamburgerMenu from "@assets/react/hamburgerMenu/hamburger";
import { navLinks, type NavLink } from "../content/headerContent";

const MobileHeader = () => {
	const [drawerActive, setDrawerActive] = useState<boolean>(false);
	const contentRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		const visibilityThresholdElement = document.querySelector("#thresholdElement");

		if (!visibilityThresholdElement) {
			if (!contentRef.current) {
				return;
			}

			contentRef.current.style.backgroundColor = `rgba(39, 48, 62, 1)`;
		}

		let visibilityThreshold = visibilityThresholdElement?.scrollHeight ?? 0;

		const onScroll = () => {
			if (contentRef.current == null) {
				return;
			}

			const addOpacity = ((window.scrollY + 160) / visibilityThreshold) * 0.35;
			contentRef.current.style.backgroundColor = `rgba(39, 48, 62, ${0.65 + addOpacity})`;
		};

		const resizeObserver = visibilityThresholdElement
			? new ResizeObserver(() => {
					visibilityThreshold = visibilityThresholdElement.scrollHeight;
					onScroll();
				})
			: null;

		resizeObserver?.observe(visibilityThresholdElement!);
		onScroll();

		window.addEventListener("scroll", onScroll);
		return () => {
			window.removeEventListener("scroll", onScroll);
			resizeObserver?.disconnect();
		};
	}, []);

	const openDrawer = () => {};

	const openLink = (link: NavLink) => () => {};

	return (
		<header className={styles.header} role="banner">
			<div className={styles.banner} ref={contentRef}>
				<Logo
					containerStyle={styles.container}
					logoStyle={styles.logo}
					titleStyle={styles.logoTitle}
					subtitleStyle={styles.logoSubtitle}
				/>
				<HamburgerMenu onClick={openDrawer} />
			</div>
			<div className={styles.ribbon}>
				<ul className={styles.linkList}>
					{navLinks.map((link) => (
						<li className={styles.link} onClick={openLink(link)}>
							<a className={styles.anchor}>{link.displayName}</a>
						</li>
					))}
				</ul>
			</div>
		</header>
	);
};

export default MobileHeader;
