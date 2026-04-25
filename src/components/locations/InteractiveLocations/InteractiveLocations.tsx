import styles from "./InteractiveLocations.module.css";
import LocationContext from "./InteractiveLocations.context";
import Map from "../Map/Map";
import MapModal from "../MapModal/MapModal";
import { useState } from "react";

const InteractiveLocations = () => {
    const [activeLocation, setActiveLocation] = useState<string | null>(null);

    return (
        <div className={styles.mapContainer}>
            <LocationContext.Provider value={{ activeLocation, setActiveLocation }}>
                <Map />
                <MapModal />
            </LocationContext.Provider>
        </div>
    );
};

export default InteractiveLocations;
