import { createContext, type Dispatch, type SetStateAction } from "react";

type LocationContextProps = {
    activeLocation: string | null;
    setActiveLocation: Dispatch<SetStateAction<string | null>>;
};

const LocationContext = createContext<LocationContextProps>({
    activeLocation: null,
    setActiveLocation: () => {},
});

export default LocationContext;
