import { useContext, useState } from "react";
import styles from "./MapModal.module.css";
import LocationContext from "../InteractiveLocations/InteractiveLocations.context";

const locations = [
	{
		id: "manhattan",
		name: "Manhattan Clinic",
		addressLine1: "185 Canal Street, #306",
		addressLine2: "Manhatten, NY 10013",
		phone: "(212) 219-7786",
		mapLink: "https://maps.app.goo.gl/zJDVbfUzwkqNAUfHA",
	},
	{
		id: "brooklyn",
		name: "Brooklyn Clinic",
		addressLine1: "749 61st St #303",
		addressLine2: "Brooklyn, NY 11220",
		phone: "(718) 238-3391",
		mapLink: "https://maps.app.goo.gl/2jTkdru2v2eVxgBw9",
	},
];

const MapModal = () => {
	const { activeLocation, setActiveLocation } = useContext(LocationContext);

	const handleAccordionClick = (id: string) => {
		if (activeLocation == id) {
			setActiveLocation(null);
		} else {
			setActiveLocation(id);
		}
	};

	// Structured Data for local SEO
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "MedicalOrganization",
		name: "BJR Ophthalmology",
		location: locations.map((loc) => ({
			"@type": "MedicalBusiness",
			name: `BJR Ophthalmology - ${loc.name}`,
			address: {
				"@type": "PostalAddress",
				streetAddress: loc.addressLine1,
				addressLocality:
					loc.id === "manhattan" ? "Manhattan" : "Brooklyn",
				addressRegion: "NY",
				postalCode: loc.addressLine2.match(/\d{5}/)?.[0],
			},
			telephone: loc.phone,
		})),
	};

	return (
		<div className={styles.container}>
			<div className={styles.modal}>
				<div className={styles.header}>
					<h2 className={styles.title}>Our Locations</h2>
					<p className={styles.description}>
						We provide the same high standard of medical and
						surgical eye care at both our Manhattan and Brooklyn
						locations.
					</p>
				</div>

				<div className={styles.locationsList}>
					{locations.map((loc) => (
						<article
							key={loc.id}
							className={`${styles.item} ${activeLocation === loc.id ? styles.active : ""}`}
						>
							<h3 className={styles.header}>
								<button
									className={`${styles.trigger}  ${activeLocation === loc.id ? styles.active : ""}`}
									onClick={() => handleAccordionClick(loc.id)}
									aria-expanded={activeLocation === loc.id}
									aria-controls={`details-${loc.id}`}
								>
									{loc.name}
									<span
										className={styles.arrow}
										aria-hidden="true"
									>
										↓
									</span>
								</button>
							</h3>
							<div
								id={`details-${loc.id}`}
								className={styles.content}
								aria-hidden={activeLocation !== loc.id}
							>
								<div className={styles.inner}>
									<address className={styles.address}>
										{loc.addressLine1}
										<br />
										{loc.addressLine2}
									</address>
									<p className={styles.phone}>
										<a
											href={`tel:${loc.phone.replace(/\D/g, "")}`}
										>
											{loc.phone}
										</a>
									</p>
									<a
										href={loc.mapLink}
										target="_blank"
										rel="noopener noreferrer"
										className={styles.viewButton}
										title={`Get directions to our ${loc.name}`}
									>
										<span>Get Directions</span>
										<svg
											width="14"
											height="14"
											viewBox="0 0 12 12"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M6 11L10.6464 6.35355C10.8417 6.15829 10.8417 5.84171 10.6464 5.64645L6 1"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
											/>
											<path
												d="M1 6H10"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
											/>
										</svg>
									</a>
								</div>
							</div>
						</article>
					))}
				</div>

				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
			</div>
		</div>
	);
};

export default MapModal;
