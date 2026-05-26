import React, {
    Children,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
    type ReactElement,
    type ReactNode,
} from "react";
import { CarouselContext } from "./_carouselContext/carouselContext";
import CarouselSlide from "./_carouselSlide/_carouselSlide";
import { CarouselAnimation, CarouselAnimationController, CarouselSlideElement } from "./carousel.classes";
import styles from "./carousel.module.css";
import useSlideController from "./hooks/useSlideController";

type CarouselProps = {
    slideAnimation: CarouselAnimation;
    className?: string;
    before?: ReactNode | (() => ReactNode);
    after?: ReactNode | (() => ReactNode);
    children: ReactElement<typeof CarouselSlide> | ReactElement<typeof CarouselSlide>[];
};

const Carousel: React.FC<CarouselProps> = ({ slideAnimation, ...props }) => {
    const slides = useRef<HTMLDivElement[]>([]);
    const slideController = useSlideController();

    //calculate and set initial animation state
    useEffect(() => {
        slideController.slides.current = slideAnimation.buildCarouselSlides(slides.current);
    }, []);

    //should remove the offset, state
    return (
        <CarouselContext.Provider
            value={{
                offset: slideController.offset,
                setOffset: slideController.setOffset,
                slideCount: Children.count(props.children),
            }}
        >
            {typeof props.before === "function" ? props.before() : props.before}
            <div className={`${styles.content} ${props.className}`}>
                {Children.map(props.children, (child, index) => {
                    if (React.isValidElement(child)) {
                        let grabController =
                            index == slideController.offset ? slideController.getGrabController() : null;

                        return React.cloneElement(child, {
                            key: index,
                            //@ts-ignore
                            _slideIndex: index,
                            ref: (el: HTMLDivElement) => {
                                slides.current[index] = el;
                            },
                            onPointerUp: grabController?.release,
                            onPointerMove: grabController?.dragTo,
                            carouselSlideElement: slideController.slides.current[index],
                        });
                    } else {
                        return null;
                    }
                })}
            </div>
            {typeof props.after === "function" ? props.after() : props.after}
        </CarouselContext.Provider>
    );
};

export default Carousel;
