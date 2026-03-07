import styles from "./servicesCarousel.module.css";

import { Carousel, CarouselSlide } from "../../components/carousel";
import { useContext, useEffect } from "react";
import { CarouselContext } from "../../components/carousel/_carouselContext/carouselContext";
import { CarouselAnimation } from "../../components/carousel/carousel.classes";

// const keyframe = new CarouselAnimationController(
//     {
//         fill: "both",
//         duration: 200,
//     },
//     {
//         animationStepOffset: 3,
//     },
// );
// keyframe.addKeyframe([
//     {
//         opacity: "0%",
//         transform: "translateX(28%) scale(75%)",
//         offset: 0,
//     },
//     {
//         opacity: "0%",
//         transform: "translateX(28%) scale(75%)",
//         offset: 0.75,
//     },
//     {
//         opacity: "100%",
//         transform: "translateX(24%) scale(80%)",
//         offset: 1,
//     },
// ]);
// keyframe.addKeyframe([
//     {
//         zIndex: 10,
//         transform: "translateX(24%) scale(80%)",
//         offset: 0,
//     },
//     {
//         zIndex: 10,
//         transform: "translateX(24%) scale(80%)",
//         offset: 0.75,
//     },
//     {
//         zIndex: 20,
//         transform: "translateX(15%) scale(90%, 90%)",
//         offset: 1,
//     },
// ]);
// keyframe.addKeyframe([
//     {
//         zIndex: 22,
//         transform: "translateX(15%) scale(90%, 90%)",
//         offset: 0.0,
//     },
//     {
//         zIndex: 28,
//         transform: "translateX(15%) scale(90%, 90%)",
//         offset: 0.75,
//     },
//     {
//         zIndex: 30,
//         transform: "translateX(0%) scale(100%, 100%)",
//         offset: 1,
//     },
// ]);
// keyframe.addKeyframe([
//     {
//         zIndex: 30,
//         animationTimingFunction: "ease-in-out",
//         offset: 0,
//     },
//     {
//         transform: "translateX(-70%) perspective(2000px) rotateY(30deg)",
//         offset: 0.6,
//     },
//     {
//         zIndex: 22,
//         transform: "translateX(-62%) scale(90%, 90%) perspective(2000px) rotateY(50deg)",
//         offset: 0.8,
//     },
//     {
//         zIndex: 22,
//         transform: "translateX(-28%) scale(82.5%, 82.5%) perspective(2000px) rotateY(50deg)",
//         boxShadow: "0px 0px 2px rgba(var(--color-tertiary), 0.5)",
//         offset: 1.0,
//     },
// ]);
// keyframe.addKeyframe([
//     {
//         zIndex: 20,
//         transform: "translateX(-28%) scale(82.5%, 82.5%) perspective(2000px) rotateY(50deg)",
//     },
//     {
//         zIndex: 10,
//         transform: "translateX(-28%) perspective(2000px) rotateY(32deg) scale(85%, 85%)",
//     },
// ]);
// keyframe.addKeyframe([
//     {
//         transform: "translateX(-28%) perspective(2000px) rotateY(32deg) scale(85%, 85%)",
//         opacity: "100%",
//     },
//     {
//         transform: "translateX(-42%) perspective(2000px) rotateY(32deg) scale(70%, 70%)",
//         opacity: "0%",
//     },
// ]);

const slideAnimation = new CarouselAnimation({
    primaryKeyframeOffset: 4,
});
slideAnimation.addKeyframe("stage-right", {
    zIndex: 1,
    opacity: "0%",
    transform: "translateX(24%) scale(75%)",
});
slideAnimation.addKeyframe("enter-right", {
    zIndex: 10,
    opacity: "80%",
    transform: "translateX(22%) scale(80%)",
});
slideAnimation.addKeyframe("pre-center", {
    zIndex: 20,
    opacity: "90%",
    transform: "translateX(14%) scale(90%)",
});
slideAnimation.addKeyframe("center", {
    zIndex: 30,
    transform: "translateX(0%) scale(100%, 100%)",
});
slideAnimation.addKeyframe("leave-center", {
    zIndex: 22,
    opacity: "90%",
    transform: "translateX(-16%) perspective(2400px) translateZ(-320px) rotateY(32deg)",
});
slideAnimation.addKeyframe("shift-left", {
    zIndex: 10,
    opacity: "80%",
    transform: "translateX(-24%) perspective(2400px) translateZ(-480px) rotateY(32deg) ",
});
slideAnimation.addKeyframe("exit-left", {
    zIndex: 1,
    transform: "translateX(-32%) scale(70%, 70%) perspective(2400px) rotateY(32deg)",
    opacity: "0%",
});

const ServicesCarousel: React.FC<{}> = () => {
    return (
        <Carousel
            after={() => {
                return <AfterElement />;
            }}
            className={styles.carousel}
            slideAnimation={slideAnimation}
        >
            <CarouselSlide className={styles.slide}>
                <h3>Lasik</h3>
                <p>We offer lasik consultation and surgery using state of the art lasik machines.</p>
            </CarouselSlide>
            <CarouselSlide className={styles.slide}>Slide 2</CarouselSlide>
            <CarouselSlide className={styles.slide}>Slide 3</CarouselSlide>
            <CarouselSlide className={styles.slide}>Slide 4</CarouselSlide>
            <CarouselSlide className={styles.slide}>Slide 5</CarouselSlide>
            <CarouselSlide className={styles.slide}>Slide 6</CarouselSlide>
            <CarouselSlide className={styles.slide}>Slide 7</CarouselSlide>
        </Carousel>
    );
};

const AfterElement = () => {
    const carouselContext = useContext(CarouselContext);
    return (
        <div>
            <button
                onClick={() => {
                    carouselContext.setOffset((prev: number) => {
                        return prev - 1;
                    });
                }}
            >
                -1
            </button>
            <button
                onClick={() => {
                    carouselContext.setOffset((prev: number) => {
                        return prev + 1;
                    });
                }}
            >
                +1
            </button>
        </div>
    );
};

export default ServicesCarousel;
