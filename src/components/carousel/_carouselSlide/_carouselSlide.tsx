import Styles from "./_carouselSlide.module.css";

import React, { forwardRef, useContext, useEffect, useImperativeHandle, useRef, type Ref, type RefObject } from "react";
import { useState, type PropsWithChildren } from "react";
import { CarouselContext } from "../_carouselContext/carouselContext";

export type CarouselSlideHandle = {
    animation: Animation;
    setAnimation: (effect: KeyframeEffect) => void;
    toggleVisibility: (visible?: boolean) => void;
    currentOffset: number;
    slideIndex: number;
};

type CarouselSlideProps = PropsWithChildren & {
    className?: string;
    _slideIndex?: number;
    ref?: Ref<HTMLDivElement>;
};

const CarouselSlide: React.FC<CarouselSlideProps> = (props) => {
    return (
        <div className={`${props.className}`} ref={props.ref}>
            {props.children}
        </div>
    );
};

export default CarouselSlide;
