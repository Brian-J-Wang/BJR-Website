import styles from "./testimonialsCarousels.module.css";
import slideStyles from "./slide.module.css";
import "embla-carousel-react";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { WebLink, Chevron } from "@assets/react";
import { slides } from "./testimonials";

const TestimonialCarousel: React.FC = () => {
	const [ref, api] = useEmblaCarousel({
		loop: true,
		align: "center",
	});
	const [selectedIndex, setSelectedIndex] = useState<number>(0);

	const onSelect = useCallback(() => {
		if (!api) return;
		setSelectedIndex(api.selectedScrollSnap());
	}, [api]);

	useEffect(() => {
		if (!api) return;
		onSelect();
		api.on("select", onSelect);
		api.on("reInit", onSelect);
	}, [api, onSelect]);

	return (
		<>
			<div className={styles.embla__viewport} ref={ref}>
				<div className={styles.embla__container}>
					{slides.map((slide) => (
						<div key={slide.link} className={styles.embla__slide}>
							<div className={slideStyles.container}>
								<div className={slideStyles.slideContent}>
									<p>{slide.text.trim()}</p>
								</div>
								<div className={slideStyles.slideFooter}>
									<span>{slide.name}</span>
									<a
										href={slide.link}
										target="_blank"
										rel="noopener noreferrer"
										className={slideStyles.reviewLink}
										aria-label="View original review"
									>
										<WebLink />
									</a>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
			<div className={styles.navigation}>
				<button
					className={styles.arrow}
					onClick={() => api?.scrollPrev()}
					aria-label="Previous slide"
				>
					<Chevron direction="left" contrast />
				</button>

				<div className={styles.dotContainer}>
					{api?.scrollSnapList().map((_, index) => (
						<button
							key={index}
							className={`${styles.dot} ${index === selectedIndex ? styles.dotActive : ""}`}
							onClick={() => api?.scrollTo(index)}
							aria-label={`Go to slide ${index + 1}`}
						/>
					))}
				</div>

				<button
					className={styles.arrow}
					onClick={() => api?.scrollNext()}
					aria-label="Next slide"
				>
					<Chevron direction="right" contrast />
				</button>
			</div>
		</>
	);
};

export default TestimonialCarousel;
