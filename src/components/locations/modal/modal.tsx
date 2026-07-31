import React, { useEffect, useState } from "react";
import type { LocationData } from "../map/map.types";
import styles from "./modal.module.css";
import shared from "@styles/shared.module.css";
import clsx from "clsx";
import pointer from "./pointer.svg?url";
import { Chevron } from "@assets/react";

type MapModalProps = {
	locationData: LocationData | null;
};

const MapModal: React.FC<MapModalProps> = ({ locationData }) => {
	const [location, setLocation] = useState<LocationData | null>(locationData);

	useEffect(() => {
		if (locationData != null) {
			setLocation(locationData);
		}
	}, [locationData]);

	return (
		<div
			itemScope
			itemType="https://schema.org/MedicalClinic"
			className={clsx(styles.textBox, locationData != null && styles.textBox_active)}
		>
			{location && (
				<>
					<h3 className={clsx(shared.fontSerif__h3, styles.header)}>{location.name}</h3>
					<div className={styles.mtaLine}>
						{location.mtaLines.map((line) => {
							return (
								<img
									src={`icons/mta-subway-icons/${line}.svg`}
									alt={`symbol for the new york city ${line} subway line`}
									className={styles.mtaLine__symbol}
								/>
							);
						})}
					</div>
					<div className={styles.locationInfo}>
						<div
							itemProp="address"
							itemScope
							itemType="https://schema.org/PostalAddress"
							className={styles.locationAddress}
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
					<a
						href={location.googleMapsLink}
						className={styles.directionsButton}
						data-variant="button"
					>
						<span>Get Directions</span>
						<Chevron
							className={styles.directionsButton__chevron}
							direction="right"
							contrast
						/>
					</a>
				</>
			)}
		</div>
	);
};

export default MapModal;
