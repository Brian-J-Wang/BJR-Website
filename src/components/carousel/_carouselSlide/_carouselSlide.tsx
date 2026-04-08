import styles from "./_carouselSlide.module.css";
import React, { type Ref } from "react";
import { type PropsWithChildren } from "react";

type CarouselSlideProps = PropsWithChildren & {
    className?: string;
    _slideIndex?: number;
    ref?: Ref<HTMLDivElement>;
};

const CarouselSlide: React.FC<CarouselSlideProps> = (props) => {
    return (
        <div className={`${styles.content} ${props.className}`} ref={props.ref}>
            {props.children}
        </div>
    );
};

export default CarouselSlide;
