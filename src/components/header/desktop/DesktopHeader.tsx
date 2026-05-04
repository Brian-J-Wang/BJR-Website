import styles from "./DesktopHeader.module.css";
import clsx from "clsx";
import { useEffect, useRef, useState, type RefObject } from "react";
import Logo from "../../logo/logo";
import { navLinks, type NavLink } from "../content/headerContent";
import { HeaderContext } from "../context/headerContext";
import DropDown from "./components/DropDown/DropDown";
import NavItem from "./components/NavItem/NavItem";

const DesktopHeader: React.FC = (props) => {
	const [navLink, setNavLink] = useState<NavLink | null>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const headerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const visibilityThresholdElement =
			document.querySelector("#thresholdElement");
		let visibilityThreshold = visibilityThresholdElement?.scrollHeight ?? 0;

		const onScroll = () => {
			if (contentRef.current == null) {
				return;
			}

			const addOpacity =
				((window.scrollY + 160) / visibilityThreshold) * 0.35;
			contentRef.current.style.backgroundColor = `rgba(45, 96, 148, ${0.65 + addOpacity})`;
		};

		const resizeObserver = visibilityThresholdElement
			? new ResizeObserver(() => {
					visibilityThreshold =
						visibilityThresholdElement.scrollHeight;
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
			<header className={styles.header} ref={headerRef} role="banner">
				<div className={styles.content} ref={contentRef}>
					<Logo
						containerStyle={""}
						logoStyle={styles.logo}
						titleStyle={styles.title}
						subtitleStyle={styles.subtitle}
					/>
					<nav className={styles.navbar} aria-label="Main Navigation">
						<ul>
							{navLinks.map((navItem) => {
								return (
									<NavItem
										key={navItem.displayName}
										navlink={navItem}
										className={clsx({
											[styles.navItem_active]:
												navItem.displayName ==
												navLink?.displayName,
										})}
									/>
								);
							})}
						</ul>
					</nav>
				</div>
				<div className={styles.drawer}>
					<div
						className={clsx(styles.drawerInner, {
							[styles.drawerInnerActive]: navLink,
						})}
					>
						<DropDown navLink={navLink}></DropDown>
					</div>
					<div className={styles.bottomBar}>
						<nav
							className={styles.langSelect}
							aria-label="Language Selector"
						>
							<a href="/en" className={styles.langLink}>
								English
							</a>
							<span aria-hidden="true"> | </span>
							<a href="/zh" className={styles.langLink}>
								中文
							</a>
						</nav>
						<address className="flex gap-6">
							<div
								className={styles.location}
								itemScope
								itemType="https://schema.org/MedicalBusiness"
							>
								<span
									className={styles.fontBold}
									itemProp="name"
								>
									Manhattan
								</span>
								<span
									aria-hidden="true"
									className="mx-1 opacity-40"
								>
									|
								</span>
								<a
									href="tel:2122197786"
									itemProp="telephone"
									className={styles.phoneLink}
								>
									(212) 219-7786
								</a>
							</div>
							<div
								className={styles.location}
								itemScope
								itemType="https://schema.org/MedicalBusiness"
							>
								<span
									className={styles.fontBold}
									itemProp="name"
								>
									Brooklyn
								</span>
								<span
									aria-hidden="true"
									className="mx-1 opacity-40"
								>
									|
								</span>
								<a
									href="tel:7184923500"
									itemProp="telephone"
									className={styles.phoneLink}
								>
									(718) 492-3500
								</a>
							</div>
						</address>
					</div>
				</div>
			</header>
		</HeaderContext.Provider>
	);
};

export default DesktopHeader;
