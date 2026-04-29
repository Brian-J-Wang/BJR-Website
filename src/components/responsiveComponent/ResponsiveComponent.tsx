import { useEffect, useState } from "react";

type ResponsiveComponentProps = {
	tabletThreshold: number;
	desktopThreshold: number;
	mobile?: React.ReactNode;
	tablet?: React.ReactNode;
	desktop?: React.ReactNode;
};

const ResponsiveComponent: React.FC<ResponsiveComponentProps> = ({
	mobile,
	tablet,
	desktop,
	tabletThreshold = 768,
	desktopThreshold = 1281,
}: ResponsiveComponentProps) => {
	const [component, setComponent] = useState(() => calculateComponent());
	useEffect(() => {
		const handleResize = () => {
			setComponent(calculateComponent());
		};
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	function calculateComponent() {
		if (window.matchMedia(`(min-width: ${desktopThreshold}px)`).matches) {
			return desktop;
		} else if (
			window.matchMedia(`(min-width: ${tabletThreshold}px)`).matches
		) {
			return tablet;
		} else {
			return mobile;
		}
	}

	return component;
};

export default ResponsiveComponent;
