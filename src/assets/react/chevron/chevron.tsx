import clsx from "clsx";
import styles from "./chevron.module.css";

type ChevronProps = {
	className?: string;
	direction: "up" | "down" | "right" | "left";
	contrast?: boolean;
};

/**
 * A Chevron icon component.
 *
 * **CSS Custom Properties:**
 * - `--stroke` — colors the chevron stroke, defaults to `var(--color-neutral-50)`
 */
const Chevron: React.FC<ChevronProps> = (props) => {
	return (
		<svg
			width="19"
			height="16"
			viewBox="0 0 19 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={clsx(props.className, styles.chevron)}
			data-direction={props.direction}
			data-contrast={props.contrast ?? false}
		>
			<path d="M1.41431 12L9.41431 4L17.4143 12" stroke-width="3" />
		</svg>
	);
};

export default Chevron;
