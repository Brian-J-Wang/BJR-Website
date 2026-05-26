import "./Map.css";
import maplibregl, { type LngLatLike, type StyleSpecification } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useContext, useEffect, useRef } from "react";
import LocationContext from "../InteractiveLocations/InteractiveLocations.context";
import style from "../../../../public/styles.json";

const defaultCoords: LngLatLike = [-74, 40.675];
const manhattenCoords: LngLatLike = [-73.99777155378611, 40.71717392006884];
const brooklynCoords: LngLatLike = [-74.01103712439007, 40.63572271316401];

const LocationMap = () => {
    const { activeLocation, setActiveLocation } = useContext(LocationContext);
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<maplibregl.Map | null>(null);

    useEffect(() => {
        if (!mapContainer.current || !map.current) return;

        if (activeLocation == null) {
            map.current.flyTo({
                center: defaultCoords,
                zoom: 12,
                essential: true,
            });
        } else if (activeLocation == "manhattan") {
            map.current.flyTo({
                center: manhattenCoords,
                zoom: 17,
                essential: true,
            });
        } else if (activeLocation == "brooklyn") {
            map.current.flyTo({
                center: brooklynCoords,
                zoom: 17,
                essential: true,
            });
        }

        console.log(activeLocation);
    }, [activeLocation]);

    useEffect(() => {
        if (!mapContainer.current || map.current) return;

        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: style as StyleSpecification,
            center: defaultCoords,
            zoom: 12,
            maxZoom: 24,
            scrollZoom: false,
            dragPan: false,
            dragRotate: false,
        });

        map.current.setPadding({ top: 0, bottom: 0, left: 0, right: 500 });

        // Manhattan Office
        const manhattanMarker = new maplibregl.Marker({ color: "red" }).setLngLat(manhattenCoords).addTo(map.current);

        manhattanMarker.getElement().addEventListener("click", () => {
            setActiveLocation("manhattan");
        });

        // Brooklyn Office
        const brooklynMarker = new maplibregl.Marker({ color: "red" }).setLngLat(brooklynCoords).addTo(map.current);

        brooklynMarker.getElement().addEventListener("click", () => {
            setActiveLocation("brooklyn");
        });

        const handleMapClick = (evt: PointerEvent) => {
            const target = evt.target as HTMLElement;
            if (target.tagName == "path") {
                return;
            } else {
                setActiveLocation(null);
            }
        };

        mapContainer.current.addEventListener("click", handleMapClick);

        return () => {
            map.current?.remove();
            map.current = null;

            mapContainer.current?.removeEventListener("click", handleMapClick);
        };
    }, []);
    return <div ref={mapContainer} id="map" className="map"></div>;
};

export default LocationMap;
