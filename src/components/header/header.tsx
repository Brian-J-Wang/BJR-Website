import { useMediaQuery } from "react-responsive";
import MobileHeader from "./mobileHeader/mobileHeader";
import DesktopHeader from "./desktop/DesktopHeader";

const Header = () => {
	const isMobile = useMediaQuery({ maxWidth: 768 });

	if (isMobile) {
		return <MobileHeader />;
	} else {
		return <DesktopHeader />;
	}
};

export default Header;
