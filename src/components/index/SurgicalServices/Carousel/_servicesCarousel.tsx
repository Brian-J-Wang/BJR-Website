import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import styles from "./servicesCarousel.module.css";

const ServicesCarousel: React.FC<{}> = () => {
	const [emblaRef, emblaApi] = useEmblaCarousel({
		loop: true,
		align: "center",
		skipSnaps: false,
	});
	const [selectedIndex, setSelectedIndex] = useState(0);

	const scrollPrev = useCallback(
		() => emblaApi && emblaApi.scrollPrev(),
		[emblaApi],
	);
	const scrollNext = useCallback(
		() => emblaApi && emblaApi.scrollNext(),
		[emblaApi],
	);
	const scrollTo = useCallback(
		(index: number) => emblaApi && emblaApi.scrollTo(index),
		[emblaApi],
	);

	const onSelect = useCallback(() => {
		if (!emblaApi) return;
		setSelectedIndex(emblaApi.selectedScrollSnap());
	}, [emblaApi]);

	useEffect(() => {
		if (!emblaApi) return;
		onSelect();
		emblaApi.on("select", onSelect);
		emblaApi.on("reInit", onSelect);
	}, [emblaApi, onSelect]);

	return (
		<div className={styles.carouselSection}>
			<div className={styles.embla} ref={emblaRef}>
				<div className={styles.emblaContainer}>
					{services.map((service, index) => (
						<div
							className={`${styles.emblaSlide} ${index === selectedIndex ? styles.activeSlide : ""}`}
							key={`slide-${index}`}
						>
							<div className={styles.card}>
								<img
									src={service.image}
									alt={service.title}
									className={styles.backgroundImage}
								/>
								<div className={styles.glassOverlay}>
									<div className={styles.content}>
										<span className={styles.kicker}>
											{service.kicker}
										</span>
										<h3 className={styles.title}>
											{service.title}
										</h3>
										<p className={styles.description}>
											{service.description}
										</p>
										<a
											href={service.link}
											className={styles.cta}
										>
											<span>Explore Procedure</span>
											<svg
												width="18"
												height="18"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
											>
												<path d="M5 12h14m-7-7l7 7-7 7" />
											</svg>
										</a>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			<div className={styles.controls}>
				<button
					className={styles.navButton}
					onClick={scrollPrev}
					aria-label="Previous service"
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15 18l-6-6 6-6"
						/>
					</svg>
				</button>

				<div className={styles.dots}>
					{services.map((_, index) => (
						<button
							key={`dot-${index}`}
							className={`${styles.dot} ${index === selectedIndex ? styles.activeDot : ""}`}
							onClick={() => scrollTo(index)}
							aria-label={`Go to slide ${index + 1}`}
						/>
					))}
				</div>

				<button
					className={styles.navButton}
					onClick={scrollNext}
					aria-label="Next service"
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M9 18l6-6-6-6"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
};

export default ServicesCarousel;
