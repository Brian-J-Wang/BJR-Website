import styles from "./logo.module.css";

type LogoProps = {
	containerStyle?: string;
	logoStyle?: string;
	titleStyle?: string;
	subtitleStyle?: string;
};

const Logo: React.FC<LogoProps> = (props) => {
	const containerStyle = `${styles.container} ${props.containerStyle} `;
	const logoStyle = `${styles.logo} ${props.logoStyle}`;
	const titleStyle = `${styles.title} ${props.titleStyle}`;
	const subtitleStyle = `${styles.subtitle} ${props.subtitleStyle}`;
	return (
		<a
			href="/"
			className={containerStyle}
			aria-label="BJR Ophthalmology Home"
			itemScope
			itemType="https://schema.org/MedicalBusiness"
		>
			<img
				src="/favicon.svg"
				className={logoStyle}
				alt="Bingjing Roberts Ophthalmology Logo"
				itemProp="logo"
			/>
			<div className={styles.textContainer}>
				<div className={titleStyle} itemProp="name">
					BINGJING ROBERTS
				</div>
				<span className={subtitleStyle}>OPHTHALMOLOGY</span>
			</div>
		</a>
	);
};

export default Logo;
