import styles from "./slide.module.css";

import { CarouselSlide } from "../../../components/carousel";
import type { Ref } from "react";

type SlideProps = {
    children: React.ReactNode;
    link?: string;
    _slideIndex?: number;
    ref?: Ref<HTMLDivElement>;
};

const Slide = ({ children, link, ...rest }: SlideProps) => {
    return (
        <CarouselSlide {...rest} className={styles.slide}>
            <div className={styles.imageContainer}>
                <img
                    src="https://placehold.co/960x480/1e293b/94a3b8?text=Service"
                    alt="Placeholder graphic for medical service"
                    className={styles.image}
                />
                <div className={styles.imageOverlay}></div>
            </div>
            <div className={styles.contentContainer}>
                {children}
                <div className={styles.buttonContainer}>
                    <a href={link ?? "#"} className={styles.button}>
                        Learn More
                        <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M6 11L10.6464 6.35355C10.8417 6.15829 10.8417 5.84171 10.6464 5.64645L6 1"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                            />
                            <path d="M1 6H10" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                        </svg>
                    </a>
                </div>
            </div>
        </CarouselSlide>
    );
};

export default Slide;
