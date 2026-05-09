import clsx from "clsx";
import styles from "./Locations.module.css";
import React from "react";

type LocationsProps = {};

const Locations: React.FC<LocationsProps> = () => {
	return (
		<div className={styles.location}>
			<ul className={styles.location__list}>
				<li
					className={clsx(
						styles.location__listItem,
						"underlineOnHover",
					)}
				>
					<img
						src="public/BrooklynStaticMapImage.png"
						alt="Brooklyn Office Map"
						className={styles.location__image}
					/>
					<div className="ml-4">
						<h3 className={styles.location__name}>Brooklyn</h3>
					</div>
				</li>
				<li
					className={clsx(
						styles.location__listItem,
						"underlineOnHover",
					)}
				>
					<img
						src="public/ManhattanStaticMapImage.png"
						alt="Manhattan Office Map"
						className={styles.location__image}
					/>
					<div className="ml-4">
						<h3 className={styles.location__name}>Manhattan</h3>
					</div>
				</li>
			</ul>
		</div>
	);
};

export default Locations;
