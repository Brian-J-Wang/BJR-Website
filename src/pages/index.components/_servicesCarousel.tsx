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
    primaryKeyframeOffset: 2,
    wrap: "wrap",
});
slideAnimation
    .addKeyframe("stage-bottom", {
        opacity: "0%",
        transform: "translateX(45%) scale(80%)",
        zIndex: 1,
    })
    .addKeyframe("appear-bottom", {
        transform: "translateX(15%) scale(95%)",
        zIndex: 2,
    })
    .addKeyframe("enter-right", {
        zIndex: 3,
    })
    .addKeyframe("appear-top", {
        transform: "translateX(-15%) scale(95%)",
        zIndex: 2,
    })
    .addKeyframe("stage-top", {
        opacity: "0%",
        transform: "translateX(-45%) scale(80%)",
        zIndex: 1,
    });

const ServicesCarousel: React.FC<{}> = () => {
    return (
        <div className={styles.content}>
            <Carousel
                before={() => {
                    return (
                        <div className={styles["button-column"]}>
                            <button>Lasik</button>
                            <button>Cataracts</button>
                            <button>Toric IOL</button>
                            <AfterElement />
                        </div>
                    );
                }}
                className={styles.carousel}
                slideAnimation={slideAnimation}
            >
                <CarouselSlide className={styles.slide}>
                    <h3 className={styles["slide-header"]}>Lasik</h3>
                    <p>
                        LASIK is a common refractive surgery that permanently reshapes the cornea using a laser to
                        correct nearsightedness, farsightedness, and astigmatism. The process takes about 10 to 15
                        minutes per eye, with most patients returning to normal activities within a day or two.
                    </p>
                </CarouselSlide>
                <CarouselSlide className={styles.slide}>
                    <h3 className={styles["slide-header"]}>Cataract Surgery</h3>
                    <p>
                        We offer a range of cataract surgeries for patients based on their cataract density as well as
                        according to their medical history.
                    </p>
                </CarouselSlide>
                <CarouselSlide className={styles.slide}>
                    <h3 className={styles["slide-header"]}>Toric IOL</h3>
                    <p>
                        Patients with servere astigmatism, a condition in which the cornea has an irregular football
                        like shape causing light to focus unevenly, can qualify for Toric IOLs. This process improves
                        vision distance and can eliminate the need for glasses after surgery.
                    </p>
                </CarouselSlide>
                <CarouselSlide className={styles.slide}>Slide 4</CarouselSlide>
                <CarouselSlide className={styles.slide}>Slide 5</CarouselSlide>
                <CarouselSlide className={styles.slide}>Slide 6</CarouselSlide>
                <CarouselSlide className={styles.slide}>Slide 7</CarouselSlide>
            </Carousel>
        </div>
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
            <button
                onClick={() => {
                    carouselContext.setOffset((prev) => prev + 5);
                }}
            >
                +5
            </button>
            <button
                onClick={() => {
                    carouselContext.setOffset((prev) => prev - 5);
                }}
            >
                -5
            </button>
        </div>
    );
};

export default ServicesCarousel;
