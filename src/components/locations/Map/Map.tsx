import styles from "./map.module.css";
import "./maplibre.css";

import maplibregl, { type LngLatLike, type StyleSpecification } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef, useState } from "react";
import mapStyle from "./styles.json";
import Modal from "../modal/modal";
import { createRoot } from "react-dom/client";
import { brooklynLocation, manhattanLocation } from "./officeLocations";
import MapMarker from "../marker/marker";
import markerStyles from "../marker/marker.module.css";
import shared from "@styles/shared.module.css";
import clsx from "clsx";

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
			zoom: 11.85,
			maxZoom: 24,
			scrollZoom: false,
			dragPan: false,
			dragRotate: false,
			doubleClickZoom: false,
			keyboard: false,
		});

		map.current.setPadding({
			right: 392,
		});

		// Manhattan Office
		const manhattanMarkerContainer = document.createElement("div");
		createRoot(manhattanMarkerContainer).render(<MapMarker name="Manhattan Office" />);
		const manhattanMarker = new maplibregl.Marker({
			element: manhattanMarkerContainer,
		})
			.setLngLat(manhattanCoords)
			.addTo(map.current);

		manhattanMarker.on("click", () => {
			map.current?.flyTo({
				center: manhattanCoords,
				zoom: 14,
				duration: 1000,
			});

			manhattanMarker.getElement().classList.add(markerStyles.wrapper_active);

			setActiveLocation("manhattan");
		});

		// Brooklyn Office
		const brooklyMarkerContainer = document.createElement("div");
		createRoot(brooklyMarkerContainer).render(<MapMarker name="Brooklyn Office" />);
		const brooklynMarker = new maplibregl.Marker({
			element: brooklyMarkerContainer,
		})
			.setLngLat(brooklynCoords)
			.addTo(map.current);

		brooklynMarker.on("click", () => {
			map.current?.flyTo({
				center: brooklynCoords,
				zoom: 14,
				duration: 1000,
			});

			brooklynMarker.getElement().classList.add(markerStyles.wrapper_active);

			setActiveLocation("brooklyn");
		});

		map.current.on("load", () => {
			map.current?.flyTo({
				zoom: 12.15,
				duration: 1000,
			});
		});

		map.current.on("click", (evt) => {
			//@ts-ignore
			if (evt.originalEvent.target?.closest(".maplibregl-marker")) return;

			setActiveLocation(null);
			const markers = document.querySelectorAll(".maplibregl-marker");
			markers.forEach((marker) => {
				marker.classList.remove(markerStyles.wrapper_active);
			});

			map.current?.flyTo({
				center: defaultCoords,
				zoom: 12.15,
				duration: 1000,
				padding: {
					right: 392,
				},
			});
		});

		return () => {
			map.current?.remove();
			map.current = null;
		};
	}, []);

	return (
		<div className={styles.mapContainer}>
			<div ref={mapContainer} id="map" className={styles.map}></div>
			<div className={styles.modalContainer}>
				<div className={styles.modal}>
					<h2 className={clsx(styles.modalHeader, shared.fontSerif__h2)}>
						Our Locations
					</h2>
					<p className="m-0">
						No matter which office you go to, you can expect the same quality of care.
					</p>
				</div>
				{activeLocation === "manhattan" && <Modal location={manhattanLocation} />}
				{activeLocation === "brooklyn" && <Modal location={brooklynLocation} />}
			</div>
		</div>
	);
};

export default Map;
