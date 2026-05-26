import "./embla.css";
import styles from "./slide.module.css";
import type { Ref } from "react";
import { CarouselSlide } from "../../carousel";

type SlideProps = {
	name: string;
	text: string;
	link: string;
	_slideIndex?: number;
	ref?: Ref<HTMLDivElement>;
};

const Slide: React.FC<SlideProps> = ({ name, text, link }) => {
	return (
		<div className={`${styles.slide}`}>
			<div className={styles.slideContent}>
				<p>"{text.trim()}"</p>
			</div>
			<div className={styles.slideFooter}>
				<span>{name}</span>
				<a
					href={link}
					target="_blank"
					rel="noopener noreferrer"
					className={styles.reviewLink}
					aria-label="View original review"
				>
					<svg
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
						<polyline points="15 3 21 3 21 9" />
						<line x1="10" y1="14" x2="21" y2="3" />
					</svg>
				</a>
			</div>
		</div>
	);
};

export default Slide;
