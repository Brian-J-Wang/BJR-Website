import styles from "./slide.module.css";
import type { Ref } from "react";
import { CarouselSlide } from "../../../components/carousel";

type SlideProps = {
    name: string;
    text: string;
    link: string;
    _slideIndex?: number;
    ref?: Ref<HTMLDivElement>;
};

const Slide: React.FC<SlideProps> = ({ name, text, ...props }) => {
    return (
        <CarouselSlide {...props} className={styles.slide}>
            <div className={styles.slideIcon}>
                <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M11 25.5C11 23 13 21 15.5 21C18 21 20 23 20 25.5C20 28 18 30 15.5 30C12 30 11 28 11 25.5ZM25 25.5C25 23 27 21 29.5 21C32 21 34 23 34 25.5C34 28 32 30 29.5 30C26 30 25 28 25 25.5Z"
                        fill="rgb(var(--color-primary))"
                    />
                    <path
                        d="M20 25.5C20 20 18 14 11 14V17C15 17 17 21 17 25.5H20ZM34 25.5C34 20 32 14 25 14V17C29 17 31 21 31 25.5H34Z"
                        fill="rgb(var(--color-primary))"
                    />
                </svg>
            </div>
            <div className={styles.slideContent}>
                <p>"{text.trim()}"</p>
            </div>
            <div className={styles.slideFooter}>
                <span>{name}</span>
            </div>
        </CarouselSlide>
    );
};

export default Slide;
