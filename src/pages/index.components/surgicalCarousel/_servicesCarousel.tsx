import styles from "./servicesCarousel.module.css";
import slideStyles from "./slide.module.css";
import { Carousel, CarouselSlide } from "../../../components/carousel";
import { useContext, useEffect } from "react";
import { CarouselContext } from "../../../components/carousel/_carouselContext/carouselContext";
import { CarouselAnimation } from "../../../components/carousel/carousel.classes";
import Slide from "./Slide";

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
                <Slide>
                    <h3 className={slideStyles["slide-header"]}>Lasik</h3>
                    <p>
                        LASIK is a common refractive surgery that permanently reshapes the cornea using a laser to
                        correct nearsightedness, farsightedness, and astigmatism. The process takes about 10 to 15
                        minutes per eye, with most patients returning to normal activities within a day or two.
                    </p>
                </Slide>
                <Slide>
                    <h3 className={slideStyles["slide-header"]}>Cataract Surgery</h3>
                    <p>
                        We offer a range of cataract surgeries for patients based on their cataract density as well as
                        according to their medical history.
                    </p>
                </Slide>
                <Slide>
                    <h3 className={slideStyles["slide-header"]}>Toric IOL</h3>
                    <p>
                        Patients with servere astigmatism, a condition in which the cornea has an irregular football
                        like shape causing light to focus unevenly, can qualify for Toric IOLs. This process improves
                        vision distance and can eliminate the need for glasses after surgery.
                    </p>
                </Slide>
                <Slide>Slide 4</Slide>
                <Slide>Slide 5</Slide>
                <Slide>Slide 6</Slide>
                <Slide>Slide 7</Slide>
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
