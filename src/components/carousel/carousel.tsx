import React, { Children, useEffect, useRef, useState, type ReactElement, type ReactNode } from "react";
import { CarouselContext } from "./_carouselContext/carouselContext";
import CarouselSlide from "./_carouselSlide/_carouselSlide";
import { CarouselAnimation, CarouselAnimationController } from "./carousel.classes";
import styles from "./carousel.module.css";

type CarouselProps = {
    slideAnimation: CarouselAnimation;
    className?: string;
    before?: ReactNode | (() => ReactNode);
    after?: ReactNode | (() => ReactNode);
    children: ReactElement<typeof CarouselSlide> | ReactElement<typeof CarouselSlide>[];
};

const Carousel: React.FC<CarouselProps> = ({ slideAnimation, ...props }) => {
    const [offset, _setOffset] = useState<number>(0);
    const slides = useRef<HTMLDivElement[]>([]);
    const controller = useRef<CarouselAnimationController>(null);

    //calculate and set initial animation state
    useEffect(() => {
        controller.current = slideAnimation.build(slides.current);
        controller.current.onOffsetChange = _setOffset;
    }, []);

    const setOffset = (value: number | ((prev: number) => number)) => {
        controller.current?.setOffset(value);
    };

    return (
        <CarouselContext.Provider
            value={{
                offset,
                setOffset,
            }}
        >
            <div>{typeof props.before === "function" ? props.before() : props.before}</div>
            <div className={`${styles.content} ${props.className}`}>
                {Children.map(props.children, (child, index) => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child, {
                            key: index,
                            //@ts-ignore
                            _slideIndex: index,
                            ref: (el: HTMLDivElement) => {
                                slides.current[index] = el;
                            },
                        });
                    } else {
                        return null;
                    }
                })}
            </div>
            <div>{typeof props.after === "function" ? props.after() : props.after}</div>
        </CarouselContext.Provider>
    );
};

export default Carousel;
