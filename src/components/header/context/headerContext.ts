import {
	createContext,
	useContext,
	type Dispatch,
	type SetStateAction,
} from "react";
import type { NavLink } from "../content/headerContent";

interface HeaderContextType {
	navLink: NavLink | null;
	setNavLink: Dispatch<SetStateAction<NavLink | null>>;
}

export const HeaderContext = createContext<HeaderContextType | undefined>(
	undefined,
);

export const useHeaderContext = () => {
	const context = useContext(HeaderContext);
	if (!context) {
		throw new Error(
			"useHeaderContext must be used within a HeaderProvider",
		);
	}
	return context;
};
