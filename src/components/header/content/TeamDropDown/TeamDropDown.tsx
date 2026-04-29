import React from "react";
import styles from "./TeamDropDown.module.css";

const TeamDropDown: React.FC = () => {
	return (
		<div className={styles.container}>
			<p className={styles.blurb}>
				Providing world-class eye care with a personal touch. <br />
				Our team of specialists is dedicated to your vision and overall
				health.
			</p>
			<div className={styles.buttonGrid}>
				<a href="/team#dr-roberts" className={styles.teamButton}>
					<span className={styles.buttonTitle}>Dr. Roberts</span>
					<span className={styles.buttonSubtitle}>
						Meet our founder
					</span>
				</a>
				<a href="/team#doctors" className={styles.teamButton}>
					<span className={styles.buttonTitle}>Our Doctors</span>
					<span className={styles.buttonSubtitle}>
						Expert specialists
					</span>
				</a>
				<a href="/team#staff" className={styles.teamButton}>
					<span className={styles.buttonTitle}>Our Staff</span>
					<span className={styles.buttonSubtitle}>
						Dedicated care team
					</span>
				</a>
			</div>
		</div>
	);
};

export default TeamDropDown;
