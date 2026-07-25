import React from "react";
import type { LocationData } from "../map/map.types";
import styles from "./modal.module.css";
import shared from "@styles/shared.module.css";
import clsx from "clsx";
import pointer from "./pointer.svg?url";

type MapModalProps = {
	location: LocationData | null;
};

const MapModal: React.FC<MapModalProps> = ({ location }) => {
	return (
		<div itemScope itemType="https://schema.org/MedicalClinic" className={styles.textBox}>
			{location && (
				<>
					<h3 className={clsx(shared.fontSerif__h3, styles.header)}>{location.name}</h3>
					<div className={styles.footer__locationInfo}>
						<div
							itemProp="address"
							itemScope
							itemType="https://schema.org/PostalAddress"
							className={styles.footer__locationAddress}
						>
							<span itemProp="streetAddress">{location.streetAddress}</span> <br />
							<span itemProp="addressLocality">{location.city}</span>,{" "}
							<span itemProp="addressRegion">{location.state}</span>{" "}
							<span itemProp="postalCode">{location.zip}</span>
						</div>
						<a
							href={`tel:${location.phoneNum}`}
							itemProp="telephone"
							className={styles.footer__phone}
						>
							{location.phone}
						</a>
					</div>
				</>
			)}
		</div>
	);
};

export default MapModal;
