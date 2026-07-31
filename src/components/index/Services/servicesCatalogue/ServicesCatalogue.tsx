import { useState, useEffect } from "react";
import styles from "./ServicesCatalogue.module.css";
import shared from "@styles/shared.module.css";
import clsx from "clsx";
import { useMediaQuery } from "react-responsive";

interface ServiceItem {
	title: string;
	kicker: string;
	description: string;
	link: string;
	image: string;
}

interface ServiceGroup {
	group: string;
	items: ServiceItem[];
}

export default function Tabs({ allServices }: { allServices: ServiceGroup[] }) {
	const [activeTab, setActiveTab] = useState(() => {
		if (allServices.length > 0 && allServices[0].items.length > 0) {
			return `${allServices[0].group.replace(/\s+/g, "-").toLowerCase()}-0`;
		}
		return "";
	});

	const [isMounted, setIsMounted] = useState(false);
	const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return <div className={styles.tabs} style={{ minHeight: "500px" }}></div>;
	}

	if (isMobile) {
		return (
			<div className={styles.accordion}>
				{allServices.map((group) => (
					<div className={styles.tabs__group} key={group.group}>
						<h3 className={clsx(styles.tabs__groupTitle, shared.fontSerif__h3)}>
							{group.group}
						</h3>
						<div className={styles.tabs__list}>
							{group.items.map((element, itemIndex) => {
								const id = `${group.group.replace(/\s+/g, "-").toLowerCase()}-${itemIndex}`;
								const isActive = activeTab === id;
								return (
									<div key={id} className={styles.accordion__item}>
										<button
											className={styles.tab__button}
											aria-expanded={isActive ? "true" : "false"}
											onClick={() => setActiveTab(isActive ? "" : id)}
										>
											<span>{element.title}</span>
											<img
												src="/cheveron.svg"
												alt="chevron"
												className={clsx(
													"w-2.5 h-2.5 transition-transform",
													!isActive && "rotate-180",
												)}
											/>
										</button>
										<div
											className={styles.tab__panel}
											hidden={!isActive}
											style={{ marginTop: "16px", marginBottom: "24px" }}
										>
											<div className={styles.card}>
												<div className={styles.card__image_wrapper}>
													<img
														src={element.image}
														alt={`Image of ${element.title}`}
														className={styles.card__image}
													/>
													<div className={styles.card__image_overlay} />
													<div className={styles.card__header_overlay}>
														<h3 className={styles.card__title}>
															{element.title}
														</h3>
														<small className={styles.card__kicker}>
															{element.kicker}
														</small>
													</div>
												</div>

												<div className={styles.card__content}>
													<p className={styles.card__description}>
														{element.description}
													</p>
													<a
														href={element.link}
														className={styles.card__button}
													>
														Learn More
														<img
															src="/cheveron.svg"
															alt="chevron"
															className="w-3 h-3 rotate-90"
														/>
													</a>
												</div>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				))}
			</div>
		);
	}

	return (
		<div className={styles.tabs}>
			<div className={styles.tabs__sidebar}>
				{allServices.map((group, groupIndex) => (
					<div className={styles.tabs__group} key={group.group}>
						<h3 className={clsx(styles.tabs__groupTitle, shared.fontSerif__h3)}>
							{group.group}
						</h3>
						<div className={styles.tabs__list} role="tablist">
							{group.items.map((element, itemIndex) => {
								const id = `${group.group.replace(/\s+/g, "-").toLowerCase()}-${itemIndex}`;
								const isActive = activeTab === id;
								return (
									<button
										key={id}
										className={styles.tab__button}
										role="tab"
										aria-selected={isActive ? "true" : "false"}
										aria-controls={`panel-${id}`}
										id={`tab-${id}`}
										onClick={() => setActiveTab(id)}
									>
										<span>{element.title}</span>
										<img
											src="/cheveron.svg"
											alt="cheveron pointing right"
											className="w-2.5 h-2.5 rotate-90"
										/>
									</button>
								);
							})}
						</div>
					</div>
				))}
			</div>

			<div className={styles.tabs__content}>
				{allServices.map((group) =>
					group.items.map((element, itemIndex) => {
						const id = `${group.group.replace(/\s+/g, "-").toLowerCase()}-${itemIndex}`;
						const isActive = activeTab === id;
						return (
							<div
								key={id}
								className={styles.tab__panel}
								id={`panel-${id}`}
								role="tabpanel"
								aria-labelledby={`tab-${id}`}
								hidden={!isActive}
							>
								<div className={styles.card}>
									<div className={styles.card__image_wrapper}>
										<img
											src={element.image}
											alt={`Image of ${element.title}`}
											className={styles.card__image}
										/>
										<div className={styles.card__image_overlay} />
										<div className={styles.card__header_overlay}>
											<h3 className={styles.card__title}>{element.title}</h3>
											<small className={styles.card__kicker}>
												{element.kicker}
											</small>
										</div>
									</div>

									<div className={styles.card__content}>
										<p className={styles.card__description}>
											{element.description}
										</p>
										<a href={element.link} className={styles.card__button}>
											Learn More
											<img
												src="/cheveron.svg"
												alt="cheveron pointing right"
												className="w-3 h-3 rotate-90"
											/>
										</a>
									</div>
								</div>
							</div>
						);
					}),
				)}
			</div>
		</div>
	);
}
