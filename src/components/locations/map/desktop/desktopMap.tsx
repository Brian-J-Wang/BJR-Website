import styles from "./desktopMap.module.css";

import maplibregl, { type LngLatLike, type StyleSpecification } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef, useState } from "react";
import mapStyle from "../styles.json";
import { createRoot } from "react-dom/client";
import { brooklynLocation, manhattanLocation } from "../officeLocations";
import MapMarker from "../../marker/marker";
import markerStyles from "../../marker/marker.module.css";
import shared from "@styles/shared.module.css";
import clsx from "clsx";
import MapModal from "@components/locations/modal/modal";

const defaultCoords: LngLatLike = [-74, 40.675];
const manhattanCoords: LngLatLike = [-73.99777155378611, 40.71717392006884];
const brooklynCoords: LngLatLike = [-74.01103712439007, 40.63572271316401];

type ValidLocations = "manhattan" | "brooklyn" | null;

const Map = () => {
	const [activeLocation, setActiveLocation] = useState<ValidLocations>(null);
	const mapContainer = useRef<HTMLDivElement>(null);
	const map = useRef<maplibregl.Map | null>(null);

	useEffect(() => {
		if (!mapContainer.current || map.current) return;

		map.current = new maplibregl.Map({
			container: mapContainer.current,
			style: mapStyle as StyleSpecification,
			center: defaultCoords,
			zoom: 11.25,
			maxZoom: 24,
			scrollZoom: false,
			dragPan: false,
			dragRotate: false,
			doubleClickZoom: false,
			keyboard: false,
		});

		// Manhattan Office
		const manhattanMarkerContainer = document.createElement("div");
		createRoot(manhattanMarkerContainer).render(<MapMarker name="Manhattan Office" />);
		const manhattanMarker = new maplibregl.Marker({
			element: manhattanMarkerContainer,
		})
			.setLngLat(manhattanCoords)
			.addTo(map.current);

		// Brooklyn Office
		const brooklyMarkerContainer = document.createElement("div");
		createRoot(brooklyMarkerContainer).render(<MapMarker name="Brooklyn Office" />);
		const brooklynMarker = new maplibregl.Marker({
			element: brooklyMarkerContainer,
		})
			.setLngLat(brooklynCoords)
			.addTo(map.current);

		map.current.on("load", () => {
			map.current?.flyTo({
				zoom: 11.5,
				duration: 1000,
			});
		});

		return () => {
			map.current?.remove();
			map.current = null;
		};
	}, []);

	return (
		<div className={styles.mapWrapper}>
			<div className={styles.mapFrame}>
				<div ref={mapContainer} id="map" className={styles.map}></div>
			</div>
			<div className={styles.sideBar}>
				<div className={styles.sideBar__intro}>
					<h2 className={clsx(styles.modalHeader, shared.fontSerif__h2)}>
						Our Locations
					</h2>
					<p>
						Our offices in Manhattan and Brooklyn are conveniently located with easy
						access to public transportation.
					</p>
					<p>
						Whichever location you visit, you can expect the same exceptional quality of
						care.
					</p>
				</div>
				<div className={styles.sideBar__locationWrapper}>
					<MapModal className={styles.location} location={brooklynLocation} />
					<hr className={styles.sideBar__divider} />
					<MapModal className={styles.location} location={manhattanLocation} />
				</div>
			</div>
		</div>
	);
};

export default Map;
