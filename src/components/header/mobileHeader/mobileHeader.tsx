import Logo from "@components/logo/logo";
import styles from "./mobileHeader.module.css";
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import HamburgerMenu from "@assets/react/hamburgerMenu/hamburger";
import { navLinks, type NavLink } from "../content/headerContent";
import clsx from "clsx";

const MobileHeader = () => {
	const [navLink, setNavLink] = useState<ReactNode | null>(null);
	const [drawerActive, setDrawerActive] = useState<boolean>(false);
	const contentRef = useRef<HTMLDivElement>(null);
	const headerRef = useRef<HTMLDivElement>(null);

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

	useEffect(() => {
		if (navLink == null) {
			return;
		}

		const onMouseDown = (evt: MouseEvent) => {
			if (headerRef.current && !headerRef.current.contains(evt.target as Node)) {
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

	const toggleDrawer = () => {
		setDrawerActive(!drawerActive);
	};

	const openLink = (link: NavLink) => () => {
		if (link.type == "simple") {
			window.location.href = link.href;
			setDrawerActive(false);
		} else if (link.type == "dropdown") {
		}
	};

	return (
		<header className={styles.header} role="banner" ref={headerRef}>
			<div className={styles.banner} ref={contentRef}>
				<Logo
					containerStyle={styles.container}
					logoStyle={styles.logo}
					titleStyle={styles.logoTitle}
					subtitleStyle={styles.logoSubtitle}
				/>
				<HamburgerMenu onClick={toggleDrawer} />
			</div>
			<div className={clsx(styles.ribbon, drawerActive && styles.ribbon_active)}>
				{navLink ? (
					navLink
				) : (
					<ul className={styles.linkList}>
						{navLinks.map((link) => (
							<li key={link.href} className={styles.link} onClick={openLink(link)}>
								<a className={styles.anchor}>{link.displayName}</a>
							</li>
						))}
					</ul>
				)}
			</div>
		</header>
	);
};

export default MobileHeader;
