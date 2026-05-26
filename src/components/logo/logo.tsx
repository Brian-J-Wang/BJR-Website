import clsx from "clsx";
import styles from "./logo.module.css";

type LogoProps = {
	containerStyle?: string;
	logoStyle?: string;
	titleStyle?: string;
	subtitleStyle?: string;
};

const Logo: React.FC<LogoProps> = (props) => {
	return (
		<a
			href="/"
			className={clsx(styles.container, props.containerStyle)}
			aria-label="BJR Ophthalmology Home"
			itemScope
			itemType="https://schema.org/MedicalBusiness"
		>
			<img
				src="/favicon.svg"
				className={clsx(styles.logo, props.logoStyle)}
				alt="Bingjing Roberts Ophthalmology Logo"
				itemProp="logo"
			/>
			<div className={styles.textContainer}>
				<div
					className={clsx(styles.title, props.titleStyle)}
					itemProp="name"
				>
					BINGJING ROBERTS
				</div>
				<span className={clsx(styles.subtitle, props.subtitleStyle)}>
					OPHTHALMOLOGY
				</span>
			</div>
		</a>
	);
};

export default Logo;
