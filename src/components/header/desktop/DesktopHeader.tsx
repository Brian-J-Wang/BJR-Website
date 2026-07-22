import styles from "./DesktopHeader.module.css";
import clsx from "clsx";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Logo from "../../logo/logo";
import { navLinks, type NavLink } from "../content/headerContent";
import { HeaderContext } from "../context/headerContext";
import DropDown from "./components/DropDown/DropDown";
import NavItem from "./components/NavItem/NavItem";

const DesktopHeader: React.FC = (props) => {
	const [navLink, setNavLink] = useState<NavLink | null>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const headerRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		const visibilityThresholdElement =
			document.querySelector("#thresholdElement");

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

			const addOpacity =
				((window.scrollY + 160) / visibilityThreshold) * 0.35;
			contentRef.current.style.backgroundColor = `rgba(39, 48, 62, ${0.65 + addOpacity})`;
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
			<header
				className={styles.desktopHeader}
				ref={headerRef}
				role="banner"
			>
				<div className={styles.desktopHeader__content} ref={contentRef}>
					<Logo
						containerStyle={""}
						logoStyle={styles.desktopHeader__logo}
						titleStyle={styles.desktopHeader__logoTitle}
						subtitleStyle={styles.desktopHeader__logoSubtitle}
					/>
					<nav
						className={styles.desktopHeader__navbar}
						aria-label="Main Navigation"
					>
						<ul className={styles.desktopHeader__navList}>
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
				<div className={styles.desktopHeader__drawer}>
					<div
						className={clsx(styles.desktopHeader__drawerInner, {
							[styles.desktopHeader__drawerInner_active]: navLink,
						})}
					>
						<DropDown navLink={navLink} />
					</div>
					<div className={styles.desktopHeader__bottomBar}>
						<nav
							className={styles.desktopHeader__langSelect}
							aria-label="Language Selector"
						>
							<a
								href="/en"
								className={clsx(
									styles.desktopHeader__langLink,
									{
										[styles.desktopHeader__langLink_active]: true, // Replace with actual active logic
									},
								)}
							>
								English
							</a>
							<span aria-hidden="true"> | </span>
							<a
								href="/zh"
								className={styles.desktopHeader__langLink}
							>
								中文
							</a>
						</nav>
						<address className="flex gap-6">
							<div
								className={styles.desktopHeader__location}
								itemScope
								itemType="https://schema.org/MedicalBusiness"
							>
								<span
									className={styles.desktopHeader__boldText}
									itemProp="name"
								>
									Manhattan
								</span>
								<a
									href="tel:2122197786"
									itemProp="telephone"
									className={styles.desktopHeader__phoneLink}
								>
									(212) 219-7786
								</a>
							</div>
							<div
								className={styles.desktopHeader__location}
								itemScope
								itemType="https://schema.org/MedicalBusiness"
							>
								<span
									className={styles.desktopHeader__boldText}
									itemProp="name"
								>
									Brooklyn
								</span>

								<a
									href="tel:7184923500"
									itemProp="telephone"
									className={styles.desktopHeader__phoneLink}
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
